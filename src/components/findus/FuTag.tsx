import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { FuBrandHue } from '../../lib/design/findus'

export type FuTagTone = 'neutral' | FuBrandHue

export type FuTagProps = {
  tone?: FuTagTone
  className?: string
  children?: ReactNode
}

const toneClass: Record<FuTagTone, string> = {
  neutral:
    'border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-surface)] text-[var(--fu-ink-secondary)]',
  blue: 'border border-[var(--fu-brand-blue)]/20 bg-[var(--fu-canvas)] text-[var(--fu-brand-blue)]',
  pink: 'border border-[var(--fu-brand-pink)]/20 bg-[var(--fu-canvas)] text-[var(--fu-brand-pink)]',
  lime: 'border border-[var(--fu-hairline)] bg-[var(--fu-surface)] text-[var(--fu-ink-secondary)]',
}

/** Eyebrow / chip tag — neutral default; brand tones are text + hairline only. */
export function FuTag({ tone = 'neutral', className, children }: FuTagProps) {
  return (
    <span
      className={cn(
        'fu-type-meta inline-flex items-center rounded-[var(--fu-radius)] px-3 py-1.5 normal-case tracking-normal',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
