import { useEffect, useState } from 'react'
import { HERO_ASSETS } from '../../lib/heroAssets'
import { cn } from '../../lib/cn'

const MS_DAY = 86_400_000
const MS_HOUR = 3_600_000
const MS_MIN = 60_000
const MS_SEC = 1_000

/** 10 July 2026, start of day (IST) — Stage launch countdown. */
const LAUNCH_END = new Date('2026-07-10T00:00:00+05:30')

function pad2(n: number) {
  return n.toString().padStart(2, '0')
}

function getParts(ms: number) {
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true as const }
  const d = Math.floor(ms / MS_DAY)
  const h = Math.floor((ms % MS_DAY) / MS_HOUR)
  const m = Math.floor((ms % MS_HOUR) / MS_MIN)
  const s = Math.floor((ms % MS_MIN) / MS_SEC)
  return { d, h, m, s, done: false as const }
}

type CountdownLaunchProps = {
  className?: string
}

export function CountdownLaunch({ className }: CountdownLaunchProps) {
  const [left, setLeft] = useState(() => getParts(LAUNCH_END.getTime() - Date.now()))

  useEffect(() => {
    const tick = () => setLeft(getParts(LAUNCH_END.getTime() - Date.now()))
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className={cn('flex flex-col items-center gap-1.5 text-center sm:gap-2', className)}
      aria-live="polite"
      aria-atomic
    >
      <ClockBadge />
      <p className="font-sans text-lg font-medium leading-normal tracking-tight text-[#F92C99] sm:text-xl">
        Stage goes live in {left.d}d {pad2(left.h)}h {pad2(left.m)}m {pad2(left.s)}s
      </p>
    </div>
  )
}

function ClockBadge() {
  return (
    <div
      className={cn(
        'box-border flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12',
        'bg-[#FCE8F2]',
      )}
      aria-hidden
    >
      <img
        src={HERO_ASSETS.countdownClock}
        alt=""
        width={22}
        height={22}
        className="hero-beat pointer-events-none h-5 w-5 select-none object-contain sm:h-6 sm:w-6"
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </div>
  )
}
