import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { FU_SECTION_PADDING, type FuSectionPadding } from '../../lib/design/findus'

/** Section background — default canvas, surface panel, or dark band only. */
export type FuSectionTone = 'default' | 'surface' | 'dark'

export type FuSectionProps = {
  tone?: FuSectionTone
  padding?: FuSectionPadding
  id?: string
  className?: string
  children?: ReactNode
  'aria-labelledby'?: string
}

const toneClass: Record<FuSectionTone, string> = {
  default: 'bg-[var(--fu-canvas)] text-[var(--fu-ink)]',
  surface: 'bg-[var(--fu-surface)] text-[var(--fu-ink)]',
  dark: 'bg-[var(--fu-band-dark)] text-[var(--fu-band-dark-ink)]',
}

/**
 * Full-bleed section with tone and vertical rhythm.
 * Default padding: 96px desktop / 64px phone.
 */
export function FuSection({
  tone = 'default',
  padding = 'md',
  id,
  className,
  children,
  'aria-labelledby': ariaLabelledby,
}: FuSectionProps) {
  const pad = FU_SECTION_PADDING[padding]

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(toneClass[tone], pad.phone, pad.desktop, className)}
    >
      {children}
    </section>
  )
}
