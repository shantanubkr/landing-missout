/** Pixel isometric still-life for the developers hero. */

const TOP = '#ffc6e6'
const LEFT = '#f92c99'
const RIGHT = '#c90e72'

const CUBES: [number, number, number][] = [
  [0, 0, 0],
  [1, 0, 0],
  [2, 0, 0],
  [3, 0, 0],
  [4, 0, 0],
  [5, 0, 0],
  [0, 1, 0],
  [1, 1, 0],
  [2, 1, 0],
  [3, 1, 0],
  [4, 1, 0],
  [0, 2, 0],
  [1, 2, 0],
  [2, 2, 0],
  [0, 0, 1],
  [1, 0, 1],
  [2, 0, 1],
  [3, 0, 1],
  [0, 1, 1],
  [1, 1, 1],
  [0, 0, 2],
  [1, 0, 2],
  [6, 1, 0],
  [5, 2, 0],
]

const FLOATERS: { at: [number, number, number]; size: number; cls: string }[] = [
  { at: [7, -1, 2], size: 22, cls: 'docs-illo-float' },
  { at: [8, 0, 1], size: 16, cls: 'docs-illo-float-b' },
  { at: [-1, 3, 1], size: 18, cls: 'docs-illo-float-c' },
]

const SIZE = 28
const ORIGIN_X = 200
const ORIGIN_Y = 110

function iso(i: number, j: number, k: number, size: number) {
  const sx = size
  const sy = size * 0.58
  return {
    x: ORIGIN_X + i * sx - j * sx,
    y: ORIGIN_Y + i * sy + j * sy - k * size,
  }
}

function Cube({
  i,
  j,
  k,
  size = SIZE,
  className,
}: {
  i: number
  j: number
  k: number
  size?: number
  className?: string
}) {
  const { x, y } = iso(i, j, k, size)
  const sx = size
  const sy = size * 0.58
  const h = size
  const top = `${x},${y} ${x + sx},${y + sy} ${x},${y + sy * 2} ${x - sx},${y + sy}`
  const left = `${x - sx},${y + sy} ${x},${y + sy * 2} ${x},${y + sy * 2 + h} ${x - sx},${y + sy + h}`
  const right = `${x + sx},${y + sy} ${x},${y + sy * 2} ${x},${y + sy * 2 + h} ${x + sx},${y + sy + h}`
  return (
    <g className={className}>
      <polygon points={left} fill={LEFT} />
      <polygon points={right} fill={RIGHT} />
      <polygon points={top} fill={TOP} />
    </g>
  )
}

export function DocsIllo() {
  const ordered = [...CUBES].sort((a, b) => a[0] + a[1] - (b[0] + b[1]) || a[2] - b[2])

  return (
    <div className="docs-illo" aria-hidden>
      <img src="/landing-figma/hero-deco.svg" alt="" className="docs-illo-star-img" />
      <svg
        className="docs-illo-scene"
        viewBox="0 0 560 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
      >
        {ordered.map(([i, j, k]) => (
          <Cube key={`${i}-${j}-${k}`} i={i} j={j} k={k} />
        ))}
        {FLOATERS.map(({ at: [i, j, k], size, cls }) => (
          <Cube key={`f-${i}-${j}-${k}`} i={i} j={j} k={k} size={size} className={cls} />
        ))}
      </svg>
      <div className="docs-illo-term">
        <div className="docs-illo-term-bar">
          <span className="docs-illo-dot bg-[#111]" />
          <span className="docs-illo-dot bg-brand-pink" />
          <span className="docs-illo-dot bg-[#d4d4d4]" />
          <span className="docs-illo-term-title">missout / docs</span>
        </div>
        <pre className="docs-illo-term-body">
          <span className="text-brand-pink">GET</span>
          {'    /v1/events'}
          {'\n'}
          <span className="text-brand-pink">POST</span>
          {'   /v1/webhooks'}
          {'\n'}
          {'\n'}
          {'{ "ok": true }'}
          <span className="docs-illo-cursor" />
        </pre>
      </div>
    </div>
  )
}
