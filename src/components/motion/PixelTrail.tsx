import { useEffect, useRef } from 'react'

type PixelTrailProps = {
  /** Cell size in CSS px, or derived from the canvas width. */
  cell: number | ((width: number) => number)
  colors: string[]
  /** ms for a lit cell to fade out */
  fade?: number
  /** Grid origin offset in CSS px, to line up with a CSS background grid. */
  offsetX?: number | ((width: number) => number)
  className?: string
}

type Lit = { cx: number; cy: number; t: number; color: string }

function walkLine(x0: number, y0: number, x1: number, y1: number, visit: (x: number, y: number) => void) {
  let x = x0
  let y = y0
  const dx = Math.abs(x1 - x0)
  const dy = Math.abs(y1 - y0)
  const sx = x0 < x1 ? 1 : -1
  const sy = y0 < y1 ? 1 : -1
  let err = dx - dy
  while (true) {
    visit(x, y)
    if (x === x1 && y === y1) break
    const e2 = 2 * err
    if (e2 > -dy) {
      err -= dy
      x += sx
    }
    if (e2 < dx) {
      err += dx
      y += sy
    }
  }
}

/**
 * Lights grid cells under the pointer and fades them out. Fills its positioned parent and
 * listens on that parent, so content above it still gets the events.
 */
export function PixelTrail({ cell, colors, fade = 1100, offsetX = 0, className = '' }: PixelTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !host || !ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lit = new Map<string, Lit>()
    let size = 0
    let shift = 0
    let width = 0
    let height = 0
    let frame = 0
    let last: { cx: number; cy: number } | null = null
    let colorAt = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = host.clientWidth
      height = host.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      size = typeof cell === 'function' ? cell(width) : cell
      shift = typeof offsetX === 'function' ? offsetX(width) : offsetX
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const [key, c] of lit) {
        const age = (now - c.t) / fade
        if (age >= 1) {
          lit.delete(key)
          continue
        }
        const t = 1 - age
        ctx.globalAlpha = t * t * (3 - 2 * t)
        ctx.fillStyle = c.color
        ctx.fillRect(c.cx * size + shift, c.cy * size, size, size)
      }
      ctx.globalAlpha = 1
      frame = lit.size ? requestAnimationFrame(draw) : 0
    }

    const light = (cx: number, cy: number) => {
      if (size <= 0) return
      if (cx < 0 || cy < 0 || cx * size + shift >= width || cy * size >= height) return
      const key = `${cx}:${cy}`
      const existing = lit.get(key)
      if (existing) {
        existing.t = performance.now()
        return
      }
      const color = colors[colorAt++ % colors.length]
      lit.set(key, { cx, cy, t: performance.now(), color })
    }

    const sample = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      if (size <= 0) return
      const cx = Math.floor((clientX - rect.left - shift) / size)
      const cy = Math.floor((clientY - rect.top) / size)
      if (last) walkLine(last.cx, last.cy, cx, cy, light)
      else light(cx, cy)
      last = { cx, cy }
    }

    const onMove = (e: PointerEvent) => {
      const coalesced = e.getCoalescedEvents?.()
      if (coalesced && coalesced.length > 0) {
        for (const ev of coalesced) sample(ev.clientX, ev.clientY)
      } else {
        sample(e.clientX, e.clientY)
      }
      if (!frame && lit.size) frame = requestAnimationFrame(draw)
    }
    const onLeave = () => {
      last = null
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    host.addEventListener('pointermove', onMove, { passive: true })
    host.addEventListener('pointerleave', onLeave)
    return () => {
      ro.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [cell, colors, fade, offsetX])

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 size-full ${className}`} />
}
