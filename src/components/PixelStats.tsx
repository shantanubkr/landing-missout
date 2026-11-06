import { useEffect, useRef } from 'react'

const CELL = 27
const COLORS = ['#f92c99', '#fb58af', '#fc84c5', '#feb0db', '#ffc6e6']
const RIPPLE_SPEED = 11 // grid cells per second
const RIPPLE_LIFE = 2.4 // seconds
const TRAIL_FADE = 900
const AMBIENT_RIPPLE_MIN = 1.4 // seconds between random ripples
const AMBIENT_RIPPLE_JITTER = 1.8
const TRAIL_CELLS_PER_SEC = 22
const TRAIL_HOLD_MS = 800
const WORD_INK_FADE = 3600
const WORD = 'missout'
const WORD_COLOR = '#f92c99'
const WORD_TRAIL_COLOR = '#c90e72'
const WORD_HEAD = '#000000'

type GlyphSet = { glyphs: Record<string, string[]>; w: number; h: number; gap: number }

/** 5×7 lowercase glyphs — body sits on x-height; only i / t use the top rows. */
const GLYPHS_TALL: GlyphSet = {
  w: 5,
  h: 7,
  gap: 1,
  glyphs: {
    m: ['.....', '.....', '##.##', '#.#.#', '#.#.#', '#.#.#', '.....'],
    i: ['..#..', '.....', '..#..', '..#..', '..#..', '..#..', '.....'],
    s: ['.....', '.....', '.###.', '#....', '.###.', '....#', '.###.'],
    o: ['.....', '.....', '.###.', '#...#', '#...#', '.###.', '.....'],
    u: ['.....', '.....', '#...#', '#...#', '#...#', '#...#', '.###.'],
    t: ['..#..', '.....', '.###.', '..#..', '..#..', '..#..', '..#..'],
  },
}

/** 4×5 lowercase (mini width so m reads clearly). */
const GLYPHS_MINI: GlyphSet = {
  w: 4,
  h: 5,
  gap: 0,
  glyphs: {
    m: ['....', '##.#', '#.##', '#.#.', '#.#.'],
    i: ['.#..', '....', '.#..', '.#..', '.#..'],
    s: ['....', '.###', '#...', '.##.', '.###'],
    o: ['....', '.##.', '#..#', '#..#', '.##.'],
    u: ['....', '#..#', '#..#', '#..#', '.##.'],
    t: ['.#..', '....', '###.', '.#..', '.#..'],
  },
}

/** 4×6 lowercase. */
const GLYPHS_COMPACT: GlyphSet = {
  w: 4,
  h: 6,
  gap: 1,
  glyphs: {
    m: ['....', '....', '##.#', '#.##', '#.#.', '#.#.'],
    i: ['.#..', '....', '.#..', '.#..', '.#..', '.#..'],
    s: ['....', '....', '.###', '#...', '.##.', '.###'],
    o: ['....', '....', '.##.', '#..#', '#..#', '.##.'],
    u: ['....', '....', '#..#', '#..#', '#..#', '.##.'],
    t: ['.#..', '....', '###.', '.#..', '.#..', '.#..'],
  },
}

function buildWordStencil(set: GlyphSet): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = []
  for (let li = 0; li < WORD.length; li++) {
    const rows = set.glyphs[WORD[li]]
    if (!rows) continue
    const ox = li * (set.w + set.gap)
    for (let y = 0; y < set.h; y++) {
      const row = rows[y] ?? ''
      for (let x = 0; x < set.w; x++) {
        if (row[x] === '#') out.push({ x: ox + x, y })
      }
    }
  }
  return out
}

function textSize(set: GlyphSet) {
  return {
    w: WORD.length * set.w + (WORD.length - 1) * set.gap,
    h: set.h,
  }
}

type Ripple = { cx: number; cy: number; born: number; color: string }
type Lit = { level: number; color: string; t: number }
type Walker = { x: number; y: number; vx: number; vy: number; color: string }

function PixelStrip() {
  return <div className="pixel-strip shrink-0" aria-hidden />
}

/**
 * Full-width pixel pool — click ripples, drag leaves a fading trail. No copy, no metrics.
 */
export function PixelStats() {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: true })
    if (!host || !canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let shift = 0
    let frame = 0
    let colorAt = 0
    let lastFrame = 0
    let nextAmbientAt = 0
    let visible = true

    const ripples: Ripple[] = []
    const lit = new Map<string, Lit>()
    const walkers: Walker[] = []
    let lastPointer: { cx: number; cy: number } | null = null

    let wordPath: { x: number; y: number }[] = []
    let trailProgress = 0
    let trailPhase: 'draw' | 'hold' = 'draw'
    let trailHoldUntil = 0
    let trailCursor = 0
    let lastTrailCell: { x: number; y: number } | null = null
    const wordInkAt: number[] = []

    const layoutWordPath = () => {
      wordPath = []
      if (cols < 12 || rows < 8) return

      const tall = textSize(GLYPHS_TALL)
      const compact = textSize(GLYPHS_COMPACT)
      const mini = textSize(GLYPHS_MINI)
      const set =
        cols >= tall.w + 4 && rows >= tall.h + 4
          ? GLYPHS_TALL
          : cols >= compact.w + 4 && rows >= compact.h + 4
            ? GLYPHS_COMPACT
            : cols >= mini.w + 2 && rows >= mini.h + 2
              ? GLYPHS_MINI
              : null
      if (!set) return

      const stencil = buildWordStencil(set)
      const { w: textW, h: textH } = textSize(set)
      const block = Math.min(
        2,
        Math.max(1, Math.floor((cols - 4) / textW), Math.floor((rows - 4) / textH)),
      )
      const drawW = textW * block
      const drawH = textH * block
      const ox = Math.floor((cols - drawW) / 2)
      const oy = Math.floor((rows - drawH) / 2)

      const path: { x: number; y: number }[] = []
      for (const p of stencil) {
        for (let dy = 0; dy < block; dy++) {
          for (let dx = 0; dx < block; dx++) {
            path.push({ x: ox + p.x * block + dx, y: oy + p.y * block + dy })
          }
        }
      }
      wordPath = path
      trailProgress = 0
      trailCursor = 0
      trailPhase = 'draw'
      trailHoldUntil = 0
      lastTrailCell = null
      wordInkAt.length = 0
    }

    const stepWordTrail = (dt: number, now: number) => {
      if (wordPath.length === 0) return

      if (trailPhase === 'hold') {
        if (now >= trailHoldUntil) {
          trailPhase = 'draw'
          trailProgress = 0
          trailCursor = 0
          lastTrailCell = null
          wordInkAt.length = 0
        }
        return
      }

      trailProgress += TRAIL_CELLS_PER_SEC * dt

      while (trailCursor < wordPath.length && trailCursor < trailProgress) {
        const p = wordPath[trailCursor]
        if (lastTrailCell) {
          walkLine(lastTrailCell.x, lastTrailCell.y, p.x, p.y, (x, y) =>
            bump(x, y, 0.55, WORD_TRAIL_COLOR),
          )
        }
        lastTrailCell = p
        wordInkAt[trailCursor] = now
        trailCursor++
      }

      if (trailCursor >= wordPath.length) {
        trailPhase = 'hold'
        trailHoldUntil = now + TRAIL_HOLD_MS
      }
    }

    const drawWordOverlay = (now: number) => {
      if (wordPath.length === 0) return

      const written = trailPhase === 'hold' ? trailCursor : Math.min(trailCursor, wordPath.length)

      for (let i = 0; i < written; i++) {
        const inkAt = wordInkAt[i]
        if (inkAt == null) continue
        const age = (now - inkAt) / WORD_INK_FADE
        if (age >= 1) continue
        const alpha = (1 - age) * (1 - age)
        if (alpha < 0.03) continue
        const p = wordPath[i]
        ctx.globalAlpha = alpha
        ctx.fillStyle = WORD_COLOR
        ctx.fillRect(p.x * CELL + shift, p.y * CELL, CELL, CELL)
      }

      if (trailPhase === 'draw' && written > 0) {
        const head = wordPath[written - 1]
        ctx.globalAlpha = 1
        ctx.fillStyle = WORD_HEAD
        ctx.fillRect(head.x * CELL + shift, head.y * CELL, CELL, CELL)
      }
    }

    const syncWalkers = () => {
      if (cols < 8 || rows < 6) return
      if (walkers.length === 0) {
        walkers.push(
          { x: cols * 0.22, y: rows * 0.45, vx: 5.2, vy: 3.6, color: COLORS[0] },
          { x: cols * 0.72, y: rows * 0.38, vx: -4.4, vy: 4.8, color: COLORS[2] },
        )
        return
      }
      for (const w of walkers) {
        w.x = Math.min(cols - 3, Math.max(2, w.x))
        w.y = Math.min(rows - 3, Math.max(2, w.y))
      }
    }

    const scheduleAmbientRipple = (from = performance.now()) => {
      nextAmbientAt = from + (AMBIENT_RIPPLE_MIN + Math.random() * AMBIENT_RIPPLE_JITTER) * 1000
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = host.clientWidth
      height = host.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      shift = (((width % CELL) + CELL) % CELL) / 2
      cols = Math.ceil((width - shift) / CELL)
      rows = Math.ceil(height / CELL)
      syncWalkers()
      layoutWordPath()
    }

    const key = (cx: number, cy: number) => `${cx}:${cy}`

    const bump = (cx: number, cy: number, level: number, color: string) => {
      if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return
      const k = key(cx, cy)
      const prev = lit.get(k)
      if (!prev || level > prev.level) {
        lit.set(k, { level, color, t: performance.now() })
      } else if (prev) {
        prev.t = performance.now()
      }
    }

    const walkLine = (x0: number, y0: number, x1: number, y1: number, visit: (x: number, y: number) => void) => {
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

    const pointerToCell = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      const cx = Math.floor((clientX - rect.left - shift) / CELL)
      const cy = Math.floor((clientY - rect.top) / CELL)
      return { cx, cy }
    }

    const spawnRipple = (cx: number, cy: number, color?: string) => {
      const c = color ?? COLORS[colorAt++ % COLORS.length]
      ripples.push({ cx, cy, born: performance.now(), color: c })
    }

    const spawnAmbientRipple = () => {
      if (cols < 6 || rows < 4) return
      const cx = 2 + Math.floor(Math.random() * (cols - 4))
      const cy = 2 + Math.floor(Math.random() * (rows - 4))
      spawnRipple(cx, cy, COLORS[Math.floor(Math.random() * COLORS.length)])
    }

    const stepWalkers = (dt: number) => {
      if (walkers.length === 0) return
      for (const w of walkers) {
        w.x += w.vx * dt
        w.y += w.vy * dt
        if (w.x < 1.5) {
          w.x = 1.5
          w.vx = Math.abs(w.vx)
        } else if (w.x > cols - 2.5) {
          w.x = cols - 2.5
          w.vx = -Math.abs(w.vx)
        }
        if (w.y < 1.5) {
          w.y = 1.5
          w.vy = Math.abs(w.vy)
        } else if (w.y > rows - 2.5) {
          w.y = rows - 2.5
          w.vy = -Math.abs(w.vy)
        }
        const cx = Math.round(w.x)
        const cy = Math.round(w.y)
        bump(cx, cy, 0.38, w.color)
        bump(cx + 1, cy, 0.18, w.color)
        bump(cx, cy + 1, 0.18, w.color)
      }
    }

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(212, 212, 212, 0.45)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = shift; x <= width; x += CELL) {
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, height)
      }
      for (let y = 0; y <= height; y += CELL) {
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(width, y + 0.5)
      }
      ctx.stroke()
    }

    const draw = (now: number) => {
      const dt = lastFrame ? Math.min(0.05, (now - lastFrame) / 1000) : 0
      lastFrame = now

      ctx.clearRect(0, 0, width, height)
      drawGrid()

      if (!reduced) {
        if (visible) {
          stepWalkers(dt)
          stepWordTrail(dt, now)
          if (now >= nextAmbientAt) {
            spawnAmbientRipple()
            scheduleAmbientRipple(now)
          }
        }

        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i]
          const age = (now - r.born) / 1000
          if (age > RIPPLE_LIFE) {
            ripples.splice(i, 1)
            continue
          }
          const radius = age * RIPPLE_SPEED
          const ring = Math.round(radius)
          const fade = 1 - age / RIPPLE_LIFE
          const strength = fade * fade * 0.95
          for (let dx = -ring; dx <= ring; dx++) {
            for (let dy = -ring; dy <= ring; dy++) {
              const dist = Math.max(Math.abs(dx), Math.abs(dy))
              if (dist !== ring && dist !== ring - 1) continue
              const cx = r.cx + dx
              const cy = r.cy + dy
              if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue
              const edge = dist === ring ? strength : strength * 0.55
              bump(cx, cy, edge, r.color)
            }
          }
        }

        for (const [k, cell] of lit) {
          const age = (now - cell.t) / TRAIL_FADE
          if (age >= 1) {
            lit.delete(k)
            continue
          }
          const alpha = cell.level * (1 - age) * (1 - age)
          if (alpha < 0.02) continue
          const [sx, sy] = k.split(':').map(Number)
          ctx.globalAlpha = alpha
          ctx.fillStyle = cell.color
          ctx.fillRect(sx * CELL + shift, sy * CELL, CELL, CELL)
        }
        drawWordOverlay(now)
        ctx.globalAlpha = 1
        frame = requestAnimationFrame(draw)
      } else {
        if (wordPath.length === 0) layoutWordPath()
        for (const p of wordPath) {
          ctx.globalAlpha = 0.9
          ctx.fillStyle = WORD_COLOR
          ctx.fillRect(p.x * CELL + shift, p.y * CELL, CELL, CELL)
        }
        ctx.globalAlpha = 1
      }
    }

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    const onPointerDown = (e: PointerEvent) => {
      if (reduced) return
      const { cx, cy } = pointerToCell(e.clientX, e.clientY)
      spawnRipple(cx, cy)
      lastPointer = { cx, cy }
      kick()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (reduced) return
      const { cx, cy } = pointerToCell(e.clientX, e.clientY)
      const color = COLORS[colorAt++ % COLORS.length]
      if (lastPointer && e.buttons) {
        walkLine(lastPointer.cx, lastPointer.cy, cx, cy, (x, y) => bump(x, y, 0.75, color))
      } else {
        bump(cx, cy, 0.35, color)
      }
      lastPointer = { cx, cy }
      kick()
    }

    const onPointerLeave = () => {
      lastPointer = null
    }

    const onDblClick = () => {
      ripples.length = 0
      lit.clear()
      kick()
    }

    resize()
    scheduleAmbientRipple()
    spawnAmbientRipple()

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
    })
    io.observe(host)
    host.addEventListener('pointerdown', onPointerDown)
    host.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerleave', onPointerLeave)
    host.addEventListener('dblclick', onDblClick)

    if (reduced) draw(performance.now())
    else frame = requestAnimationFrame(draw)

    return () => {
      ro.disconnect()
      io.disconnect()
      host.removeEventListener('pointerdown', onPointerDown)
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      host.removeEventListener('dblclick', onDblClick)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="border-b border-line bg-white" aria-label="Interactive pixels">
      <PixelStrip />
      <div className="mx-auto w-full max-w-[1728px]">
        <div className="relative mx-4 border-x border-line sm:mx-[6.97%]">
          <div
            ref={hostRef}
            className="pixel-playground relative min-h-[clamp(280px,38vh,420px)] cursor-crosshair touch-none select-none"
            role="img"
            aria-label="Animated missout pixel trail with ripples. Double-click to clear."
          >
            <canvas ref={canvasRef} className="absolute inset-0 size-full" />
            <span className="sr-only">Click to send pixel ripples. Drag while pressed to draw. Double-click to clear.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
