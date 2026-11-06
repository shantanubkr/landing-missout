import { useEffect, useRef } from 'react'

const CELL = 27
const PINKS = ['#f92c99', '#fb58af', '#fc84c5', '#feb0db']
const FADE = 800
const FRAME = 1000 / 12
/** Plus-shaped MissOut star, centred on the middle row of a 3-row strip. */
const PLUS: [number, number][] = [
  [0, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [0, 1],
]

type Trail = { cx: number; cy: number; t: number; color: string }
type Stamp = { id: number; cx: number; color: string }

/**
 * Footer playground: drag paints a fading trail, click plants a pixel star that stays
 * and twinkles at 12fps. Click an existing star to pop it.
 */
export function FooterPixels() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !host || !ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const trail = new Map<string, Trail>()
    const stamps: Stamp[] = []
    let width = 0
    let height = 0
    let cols = 0
    let colorAt = 0
    let stampId = 0
    let last: { cx: number; cy: number } | null = null
    let frame = 0
    let lastTick = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = host.clientWidth
      height = host.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.floor(width / CELL)
    }

    const cellAt = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      return {
        cx: Math.floor((clientX - rect.left) / CELL),
        cy: Math.floor((clientY - rect.top) / CELL),
      }
    }

    const inBounds = (cx: number, cy: number) => cx >= 0 && cy >= 0 && cx < cols && cy < 3

    const light = (cx: number, cy: number) => {
      if (!inBounds(cx, cy)) return
      const key = `${cx}:${cy}`
      const existing = trail.get(key)
      if (existing) {
        existing.t = performance.now()
        return
      }
      trail.set(key, { cx, cy, t: performance.now(), color: PINKS[colorAt++ % PINKS.length] })
    }

    const draw = (now: number) => {
      if (now - lastTick < FRAME) {
        frame = requestAnimationFrame(draw)
        return
      }
      lastTick = now
      ctx.clearRect(0, 0, width, height)

      for (const [key, c] of trail) {
        const age = (now - c.t) / FADE
        if (age >= 1) {
          trail.delete(key)
          continue
        }
        const t = 1 - age
        ctx.globalAlpha = t * t * (3 - 2 * t)
        ctx.fillStyle = c.color
        ctx.fillRect(c.cx * CELL, c.cy * CELL, CELL, CELL)
      }

      const twinkle = Math.floor(now / (FRAME * 4)) % 2 === 0 ? 1 : 0.55
      ctx.globalAlpha = twinkle
      for (const star of stamps) {
        for (const [dx, dy] of PLUS) {
          const x = star.cx + dx
          const y = 1 + dy
          if (!inBounds(x, y)) continue
          ctx.fillStyle = star.color
          ctx.fillRect(x * CELL, y * CELL, CELL, CELL)
        }
      }
      ctx.globalAlpha = 1
      frame = trail.size || stamps.length ? requestAnimationFrame(draw) : 0
    }

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const { cx, cy } = cellAt(e.clientX, e.clientY)
      if (last) {
        let x = last.cx
        let y = last.cy
        const x1 = cx
        const y1 = cy
        const dx = Math.abs(x1 - x)
        const dy = Math.abs(y1 - y)
        const sx = x < x1 ? 1 : -1
        const sy = y < y1 ? 1 : -1
        let err = dx - dy
        while (true) {
          light(x, y)
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
      } else {
        light(cx, cy)
      }
      last = { cx, cy }
      kick()
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      const { cx } = cellAt(e.clientX, e.clientY)
      const hit = stamps.findIndex((s) => s.cx === cx)
      if (hit >= 0) {
        stamps.splice(hit, 1)
      } else {
        if (stamps.length >= 24) stamps.shift()
        stamps.push({ id: stampId++, cx, color: PINKS[colorAt++ % PINKS.length] })
      }
      kick()
    }

    const onLeave = () => {
      last = null
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    host.addEventListener('pointermove', onMove, { passive: true })
    host.addEventListener('pointerdown', onDown)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      ro.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerdown', onDown)
      host.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 size-full" />
}
