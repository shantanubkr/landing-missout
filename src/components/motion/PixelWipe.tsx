import { useMemo, useState, type CSSProperties, type ReactNode } from 'react'

const PINKS = ['#f92c99', '#fb58af', '#fc84c5', '#feb0db']
const SCREEN_COLS = 20
const SCREEN_ROWS = 12
const SCREEN_DELAY_MS = 160

const COLS = 20
const ROWS = 5

function makeCells(cols: number, rows: number) {
  return Array.from({ length: cols * rows }, (_, i) => ({
    i,
    c: i % cols,
    r: Math.floor(i / cols),
    color: PINKS[(i * 3 + Math.floor(i / cols)) % PINKS.length],
  }))
}

function shuffle<T>(items: T[]) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}

function makeScreenCells() {
  const n = SCREEN_COLS * SCREEN_ROWS
  const delays = shuffle(Array.from({ length: n }, (_, i) => Math.round((i / (n - 1)) * SCREEN_DELAY_MS)))
  return Array.from({ length: n }, (_, i) => ({
    i,
    color: PINKS[Math.floor(Math.random() * PINKS.length)],
    delay: delays[i],
  }))
}

const BUTTON_CELLS = makeCells(COLS, ROWS)

export function usePixelWipePlay() {
  const [runKey, setRunKey] = useState(0)
  const play = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setRunKey((n) => n + 1)
  }
  return { runKey, play }
}

export function PixelWipeGrid({ runKey = 0 }: { runKey?: number }) {
  return (
    <span className={`pixel-wipe-grid ${runKey ? 'is-run' : ''}`} aria-hidden>
      {BUTTON_CELLS.map(({ i, c, r, color }) => (
        <span key={i} style={{ '--c': c, '--r': r, background: color } as CSSProperties} />
      ))}
    </span>
  )
}

/** Mixed-pink pixels wipe across the whole control, then clear. */
export function PixelWipe({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`pixel-wipe ${className}`}>
      <PixelWipeGrid />
      <span className="relative">{children}</span>
    </span>
  )
}

/** Full-frame wipe. Remount with a new playKey to play once. */
export function PixelWipeScreen({ playKey }: { playKey: number }) {
  const cells = useMemo(() => (playKey ? makeScreenCells() : []), [playKey])
  if (!playKey) return null
  return (
    <span key={playKey} className="demo-pixel-wipe" aria-hidden>
      {cells.map(({ i, color, delay }) => (
        <span key={i} style={{ '--d': `${delay}ms`, background: color } as CSSProperties} />
      ))}
    </span>
  )
}
