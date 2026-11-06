import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

/** Logical grid of `hero-deco.svg` (path steps ≈ 30 viewBox units). */
const SVG_GRID_COLS = 11
const SVG_GRID_ROWS = 13
const SPREAD_MS = 480
const SRC = '/landing-figma/hero-deco.svg'

type Cell = { i: number; c: number; r: number; color: string; delay: number; size: number }

function shuffle<T>(items: T[]) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}

function pixelStep(width: number, height: number) {
  const px = Math.min(width / SVG_GRID_COLS, height / SVG_GRID_ROWS)
  return Math.max(4, px)
}

/** Rasterise the SVG at display size, then one square per native art cell. */
function sampleStar(img: HTMLImageElement, width: number, height: number): Cell[] {
  const pixel = pixelStep(width, height)
  const cols = SVG_GRID_COLS
  const rows = SVG_GRID_ROWS
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(width)
  canvas.height = Math.round(height)
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
  const w = canvas.width
  const h = canvas.height

  const found: Omit<Cell, 'delay' | 'i'>[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x0 = Math.floor((c * w) / cols)
      const x1 = Math.floor(((c + 1) * w) / cols)
      const y0 = Math.floor((r * h) / rows)
      const y1 = Math.floor(((r + 1) * h) / rows)
      let n = 0
      let sr = 0
      let sg = 0
      let sb = 0
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * w + x) * 4
          if (data[i + 3] < 64) continue
          n++
          sr += data[i]
          sg += data[i + 1]
          sb += data[i + 2]
        }
      }
      const area = Math.max(1, (x1 - x0) * (y1 - y0))
      if (n / area < 0.12) continue
      found.push({
        c,
        r,
        size: pixel,
        color: `rgb(${Math.round(sr / n)} ${Math.round(sg / n)} ${Math.round(sb / n)})`,
      })
    }
  }

  const delays = shuffle(
    found.map((_, i) => Math.round((i / Math.max(found.length - 1, 1)) * SPREAD_MS)),
  )
  return found.map((cell, i) => ({ ...cell, i, delay: delays[i] }))
}

const STAR_BOX = 'hero-star absolute max-sm:hidden'

export function HeroStar({ side }: { side: 'left' | 'right' }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [cells, setCells] = useState<Cell[] | null>(null)
  const [useVector, setUseVector] = useState(false)

  useLayoutEffect(() => {
    const img = imgRef.current
    const host = hostRef.current
    if (!img || !host) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setUseVector(true)
      return
    }

    const run = () => {
      const w = img.clientWidth
      const h = img.clientHeight
      if (w < 32 || h < 32 || !img.naturalWidth) return
      let next: Cell[] = []
      try {
        next = sampleStar(img, w, h)
      } catch {
        next = []
      }
      if (!next.length) {
        setUseVector(true)
        setCells(null)
        return
      }
      setUseVector(false)
      setCells(next)
    }

    if (img.complete) run()
    else img.addEventListener('load', run, { once: true })
    const ro = new ResizeObserver(run)
    ro.observe(host)
    return () => {
      img.removeEventListener('load', run)
      ro.disconnect()
    }
  }, [])

  const showPixels = cells && !useVector
  const pixelSize = cells?.[0]?.size

  return (
    <div
      ref={hostRef}
      className={`${STAR_BOX} hero-star--${side} ${side === 'left' ? 'left-0' : 'right-0'}`}
    >
      <img
        ref={imgRef}
        src={SRC}
        alt=""
        width={331}
        height={391}
        className={`hero-star-img block max-w-none ${useVector ? 'is-on' : 'is-measure'}`}
      />
      {showPixels && pixelSize ? (
        <span className="hero-star-pixels" style={{ '--pixel': `${pixelSize}px` } as CSSProperties} aria-hidden>
          {cells.map((cell) => (
            <span
              key={cell.i}
              style={
                {
                  '--c': cell.c,
                  '--r': cell.r,
                  '--d': `${cell.delay}ms`,
                  background: cell.color,
                } as CSSProperties
              }
            />
          ))}
        </span>
      ) : null}
    </div>
  )
}

/** Static star for About — same scale, no assemble. */
export function HeroStarStatic({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`${STAR_BOX} hero-star--${side} ${side === 'left' ? 'left-0' : 'right-0'}`}>
      <img src={SRC} alt="" width={331} height={391} className="hero-star-img is-on block max-w-none" aria-hidden />
    </div>
  )
}
