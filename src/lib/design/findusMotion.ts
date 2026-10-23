import { cn } from '../cn'
import { FU_MOTION } from './findus'

/** Shared motion class fragments for FindUs primitives. */
export const fuMotion = {
  ui: `${FU_MOTION.ui} ease-out`,
  enter: `${FU_MOTION.enter} ease-out`,
  hoverLift: FU_MOTION.hoverLift,
  chipPress: FU_MOTION.chipPress,
  arrowNudge:
    'motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:group-hover:translate-x-0.5',
  iconPop:
    'motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover:scale-105',
  reduced: 'motion-reduce:transition-none motion-reduce:transform-none',
} as const

export const fuProgressTrackClass =
  'h-1 w-full overflow-hidden rounded-full bg-[var(--fu-hairline)]'

export const fuProgressFillClass =
  'h-full rounded-full motion-safe:transition-[width,background-color] motion-safe:duration-300 motion-safe:ease-out'

export const fuFieldClass = cn(
  'motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150',
  'hover:border-[var(--fu-card-border-hover)] focus:shadow-[var(--fu-shadow-soft)]',
  fuMotion.reduced,
)

export const fuBackLinkClass = cn(
  'motion-safe:transition-[color,transform] motion-safe:duration-150 motion-safe:hover:-translate-x-0.5',
  fuMotion.reduced,
)

export function fuStepDotClass(active: boolean, interactive = false) {
  return cn(
    'h-2.5 shrink-0 rounded-full motion-safe:transition-[width,background-color,transform] motion-safe:duration-200',
    active ? 'w-8 bg-[var(--fu-ink)]' : 'w-2.5 bg-[var(--fu-hairline-strong)]',
    interactive && !active && 'hover:bg-[var(--fu-ink-muted)] motion-safe:hover:scale-110',
    interactive && fuMotion.chipPress,
    interactive && fuMotion.reduced,
  )
}

export const fuFocusRing =
  'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fu-brand-blue)] focus-visible:ring-2 focus-visible:ring-[var(--fu-brand-blue)]/30'

export const fuFocusRingOnDark =
  'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
