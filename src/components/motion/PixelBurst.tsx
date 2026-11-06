import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

const PINKS = ['#f92c99', '#fb58af', '#fc84c5', '#feb0db']
const CELL = 6
const RAYS = 16
const DEPTH = 6
const LIFE_MS = 780

type Dot = { i: number; x: number; y: number; d: number; c: string; s: number }

function snap(n: number) {
  return Math.round(n / CELL) * CELL
}

function makeBurst() {
  const dots: Dot[] = []
  let i = 0
  for (let r = 0; r < RAYS; r++) {
    const angle = (r / RAYS) * Math.PI * 2 + ((r % 2) * 0.08)
    for (let step = 1; step <= DEPTH; step++) {
      const dist = step * CELL * 4
      dots.push({
        i: i++,
        x: snap(Math.cos(angle) * dist),
        y: snap(Math.sin(angle) * dist),
        d: (step - 1) * 24,
        c: PINKS[(r + step) % PINKS.length],
        s: step < 3 ? 8 : 6,
      })
    }
  }
  for (const [dx, dy] of [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ] as const) {
    dots.push({ i: i++, x: dx * CELL, y: dy * CELL, d: 0, c: '#f92c99', s: 8 })
  }
  return dots
}

function PixelBurst({ x, y }: { x: number; y: number }) {
  const dots = useMemo(makeBurst, [])
  return createPortal(
    <span className="pixel-burst" style={{ left: x, top: y }} aria-hidden>
      {dots.map((dot) => (
        <span
          key={dot.i}
          style={
            {
              '--x': `${dot.x}px`,
              '--y': `${dot.y}px`,
              '--d': `${dot.d}ms`,
              '--c': dot.c,
              '--s': `${dot.s}px`,
            } as CSSProperties
          }
        />
      ))}
    </span>,
    document.body,
  )
}

export function PixelBurstPress({ children }: { children: ReactNode }) {
  const [burst, setBurst] = useState<{ id: number; x: number; y: number } | null>(null)

  useEffect(() => {
    if (!burst) return
    const t = window.setTimeout(() => setBurst(null), LIFE_MS)
    return () => window.clearTimeout(t)
  }, [burst])

  const fire = (x: number, y: number) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setBurst({ id: Date.now(), x, y })
  }

  return (
    <span
      className="inline-flex"
      onPointerDown={(e) => fire(e.clientX, e.clientY)}
      onClick={(e) => {
        if (e.detail !== 0) return
        const r = e.currentTarget.getBoundingClientRect()
        fire(r.left + r.width / 2, r.top + r.height / 2)
      }}
    >
      {children}
      {burst ? <PixelBurst key={burst.id} x={burst.x} y={burst.y} /> : null}
    </span>
  )
}
