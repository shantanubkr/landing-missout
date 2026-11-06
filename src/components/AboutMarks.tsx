import { type CSSProperties } from 'react'
import { CursorRotate } from './motion/CursorRotate'
import { HeroStarStatic } from './motion/HeroStar'
import { PixelTrail } from './motion/PixelTrail'
import { useInView } from '../hooks/useInView'

const PINK = '#f92c99'
const LIGHT = '#ffc6e6'
const DARK = '#c90e72'
const TRAIL = ['#f92c99', '#fb58af', '#fc84c5', '#feb0db']

function Cell({
  x,
  y,
  i,
  fill = PINK,
  s = 4,
}: {
  x: number
  y: number
  i: number
  fill?: string
  s?: number
}) {
  return (
    <rect
      x={x}
      y={y}
      width={s}
      height={s}
      fill={fill}
      className="about-cell"
      style={{ '--i': i } as CSSProperties}
    />
  )
}

/** Five pixel people — the desk. */
export function MarkFive({ className = '' }: { className?: string }) {
  const [ref, inView] = useInView<SVGSVGElement>('view')
  const people = [0, 1, 2, 3, 4]
  return (
    <svg
      ref={ref}
      viewBox="0 0 160 36"
      className={`about-mark ${inView ? 'is-in' : ''} ${className}`}
      fill="none"
      aria-hidden
    >
      {people.map((p) => {
        const ox = p * 32
        const i = p * 6
        const head = p === 2 ? LIGHT : PINK
        return (
          <g key={p}>
            <Cell x={ox + 10} y={0} i={i} s={6} fill={head} />
            <Cell x={ox + 10} y={8} i={i + 1} s={6} fill={PINK} />
            <Cell x={ox + 4} y={14} i={i + 2} s={6} fill={LIGHT} />
            <Cell x={ox + 16} y={14} i={i + 3} s={6} fill={LIGHT} />
            <Cell x={ox + 10} y={14} i={i + 4} s={6} fill={DARK} />
            <Cell x={ox + 4} y={22} i={i + 5} s={6} fill={DARK} />
            <Cell x={ox + 16} y={22} i={i + 5} s={6} fill={DARK} />
          </g>
        )
      })}
    </svg>
  )
}

/** Scattered pixel cluster — a lot of students. */
export function MarkCluster({ className = '' }: { className?: string }) {
  const [ref, inView] = useInView<SVGSVGElement>('view')
  const cells: [number, number, number, string][] = [
    [0, 12, 0, PINK],
    [8, 18, 1, DARK],
    [16, 8, 2, LIGHT],
    [16, 16, 3, PINK],
    [24, 16, 4, DARK],
    [32, 4, 5, PINK],
    [32, 12, 6, LIGHT],
    [40, 12, 7, PINK],
    [48, 20, 8, DARK],
    [56, 8, 9, PINK],
    [56, 16, 10, LIGHT],
  ]
  return (
    <svg
      ref={ref}
      viewBox="0 0 64 28"
      className={`about-mark ${inView ? 'is-in' : ''} ${className}`}
      fill="none"
      aria-hidden
    >
      {cells.map(([x, y, i, fill]) => (
        <Cell key={`${x}-${y}`} x={x} y={y} i={i} s={6} fill={fill} />
      ))}
    </svg>
  )
}

/** Pixel envelope. */
export function MarkInbox({ className = '' }: { className?: string }) {
  const [ref, inView] = useInView<SVGSVGElement>('view')
  const cells: [number, number, number, string][] = [
    [4, 8, 0, PINK],
    [10, 8, 1, LIGHT],
    [16, 8, 2, PINK],
    [22, 8, 3, LIGHT],
    [28, 8, 4, PINK],
    [4, 14, 5, DARK],
    [10, 14, 6, PINK],
    [16, 14, 7, LIGHT],
    [22, 14, 8, PINK],
    [28, 14, 9, DARK],
    [4, 20, 10, PINK],
    [10, 20, 11, DARK],
    [16, 20, 12, PINK],
    [22, 20, 13, DARK],
    [28, 20, 14, PINK],
  ]
  return (
    <svg
      ref={ref}
      viewBox="0 0 40 32"
      className={`about-mark ${inView ? 'is-in' : ''} ${className}`}
      fill="none"
      aria-hidden
    >
      {cells.map(([x, y, i, fill]) => (
        <Cell key={`${x}-${y}`} x={x} y={y} i={i} s={5} fill={fill} />
      ))}
    </svg>
  )
}

/** Pixel door — the hour before it opens. */
export function MarkDoor({ className = '' }: { className?: string }) {
  const [ref, inView] = useInView<SVGSVGElement>('view')
  return (
    <svg
      ref={ref}
      viewBox="0 0 40 40"
      className={`about-mark ${inView ? 'is-in' : ''} ${className}`}
      fill="none"
      aria-hidden
    >
      <Cell x={8} y={4} i={0} s={6} fill={DARK} />
      <Cell x={14} y={4} i={1} s={6} fill={PINK} />
      <Cell x={20} y={4} i={2} s={6} fill={DARK} />
      <Cell x={8} y={10} i={3} s={6} fill={PINK} />
      <Cell x={20} y={10} i={4} s={6} fill={PINK} />
      <Cell x={8} y={16} i={5} s={6} fill={PINK} />
      <Cell x={20} y={16} i={6} s={6} fill={LIGHT} />
      <Cell x={8} y={22} i={7} s={6} fill={PINK} />
      <Cell x={20} y={22} i={8} s={6} fill={PINK} />
      <Cell x={8} y={28} i={9} s={6} fill={DARK} />
      <Cell x={14} y={28} i={10} s={6} fill={PINK} />
      <Cell x={20} y={28} i={11} s={6} fill={DARK} />
      <Cell x={28} y={16} i={12} s={4} fill={LIGHT} />
    </svg>
  )
}

const STAR =
  'M240.733 180.462V210.538H300.9V240.615H331V300.769H270.816V270.692H210.633V330.846H180.55V391H150.45V270.692H60.1835V300.769H0V240.615H60.1835V210.538H90.2835V180.462H60.1835V150.385H30.1V120.308H0V90.2308H90.2835V120.308H120.367V90.2308H150.45V0H180.55V60.1539H210.633V120.308H240.733V90.2308H331V120.308H300.9V150.385H270.816V180.462H240.733Z'

export function MarkStar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 331 391" className={className} fill="none" aria-hidden>
      <path d={STAR} fill={PINK} />
    </svg>
  )
}

export function AboutHeroStars() {
  return (
    <div
      className="pointer-events-none absolute inset-0 left-1/2 z-0 w-screen -translate-x-1/2 max-sm:hidden"
      style={{ '--drift': 0 } as CSSProperties}
      aria-hidden
    >
      {(['left', 'right'] as const).map((side) => (
        <HeroStarStatic key={side} side={side} />
      ))}
    </div>
  )
}

export function AboutPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="about-photo relative overflow-hidden rounded-[6px]">
      <img
        src={src}
        alt={alt}
        width={1024}
        height={768}
        className="block aspect-[16/10] w-full object-cover object-[center_82%]"
      />
      <PixelTrail cell={22} colors={TRAIL} fade={900} />
    </div>
  )
}

export function AboutHelloStar() {
  return (
    <CursorRotate rest={-12} span={160} className="about-hello-star inline-block h-8 w-auto shrink-0 sm:h-9">
      <img src="/landing-figma/badge-star.svg" alt="" className="block h-full w-auto" width={25} height={31} />
    </CursorRotate>
  )
}
