import type { IconName } from '../icons'
import { MissoutIcon } from '../icons'
import { cn } from '../../lib/cn'
import type { FuBrandHue } from '../../lib/design/findus'

export type FuIconChipProps = {
  name: IconName
  tint?: FuBrandHue | 'neutral'
  size?: number
  className?: string
}

const iconColor = {
  blue: 'text-[var(--fu-brand-blue)]',
  pink: 'text-[var(--fu-brand-pink)]',
  lime: 'text-[var(--fu-ink-secondary)]',
  neutral: 'text-[var(--fu-ink-secondary)]',
} as const satisfies Record<FuBrandHue | 'neutral', string>

/** Neutral icon well — brand color on icon only, optional 4px accent dot. */
export function FuIconChip({ name, tint = 'neutral', size = 18, className }: FuIconChipProps) {
  const accent = tint !== 'neutral' ? tint : null

  return (
    <span
      className={cn(
        'relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--fu-radius-sm)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-surface)]',
        className,
      )}
    >
      {accent === 'blue' ? (
        <span
          className="absolute right-1 top-1 h-1 w-1 rounded-full bg-[var(--fu-brand-blue)]"
          aria-hidden
        />
      ) : accent === 'pink' ? (
        <span
          className="absolute right-1 top-1 h-1 w-1 rounded-full bg-[var(--fu-brand-pink)]"
          aria-hidden
        />
      ) : accent === 'lime' ? (
        <span
          className="absolute right-1 top-1 h-1 w-1 rounded-full bg-[var(--fu-brand-lime)]"
          aria-hidden
        />
      ) : null}
      <MissoutIcon name={name} size={size} className={iconColor[tint ?? 'neutral']} />
    </span>
  )
}
