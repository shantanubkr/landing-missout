import { cn } from '../../lib/cn'
import {
  fuProgressFillClass,
  fuProgressTrackClass,
  fuStepDotClass,
} from '../../lib/design/findusMotion'

export type FuStepProgressProps = {
  current: number
  total: number
  fillColor?: string
  showDots?: boolean
  className?: string
}

/** Animated progress bar + optional step dots for multi-step flows. */
export function FuStepProgress({
  current,
  total,
  fillColor = 'var(--fu-brand-blue)',
  showDots = true,
  className,
}: FuStepProgressProps) {
  const safeTotal = Math.max(total, 1)
  const progress = Math.min(Math.max(current, 0), safeTotal)
  const width = `${(progress / safeTotal) * 100}%`

  return (
    <div className={cn('space-y-3', className)}>
      <div className={fuProgressTrackClass} aria-hidden>
        <div className={fuProgressFillClass} style={{ width, backgroundColor: fillColor }} />
      </div>
      {showDots ? (
        <div className="flex items-center gap-2" aria-hidden>
          {Array.from({ length: safeTotal }, (_, index) => (
            <span key={index} className={fuStepDotClass(index + 1 === progress)} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
