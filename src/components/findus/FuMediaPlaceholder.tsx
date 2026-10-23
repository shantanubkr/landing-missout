import { cn } from '../../lib/cn'

export type FuMediaPlaceholderSpec = {
  width: number
  height: number
  /** Defaults to `{width}×{height}` */
  label?: string
}

export type FuMediaPlaceholderProps = FuMediaPlaceholderSpec & {
  className?: string
}

export function mediaRatioLabel(width: number, height: number): string {
  return `${width}×${height}`
}

/** Shaded slot for a future screenshot — shows target pixel ratio. */
export function FuMediaPlaceholder({
  width,
  height,
  label,
  className,
}: FuMediaPlaceholderProps) {
  const text = label ?? mediaRatioLabel(width, height)

  return (
    <div
      className={cn(
        'flex h-full w-full min-h-[8rem] items-center justify-center',
        'bg-[color-mix(in_srgb,var(--fu-ink)_6%,var(--fu-canvas))] text-[var(--fu-ink-muted)]',
        className,
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-hidden
    >
      <span className="font-sans text-sm font-semibold tracking-tight">{text}</span>
    </div>
  )
}
