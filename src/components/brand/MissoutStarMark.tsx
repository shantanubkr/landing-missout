import { cn } from '../../lib/cn'
import { MISSOUT_STAR } from '../../lib/brandAssets'

export type MissoutStarMarkProps = {
  className?: string
  fill?: string
}

/** Filled star mark from `public/brand/missout_star.svg`. */
export function MissoutStarMark({ className, fill = 'currentColor' }: MissoutStarMarkProps) {
  return (
    <svg
      viewBox={`0 0 ${MISSOUT_STAR.width} ${MISSOUT_STAR.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn('block h-full w-auto max-w-none', className)}
    >
      <path d={MISSOUT_STAR.path} fill={fill} />
    </svg>
  )
}
