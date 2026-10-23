import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { MissoutAvatarSize } from '../../lib/avatars'
import { FuContainer } from './FuContainer'
import { FuMascot } from './FuMascot'
import { FuBody, FuTitle } from './FuTypography'

export type FuCtaBandTone = 'default' | 'surface' | 'dark'

export type FuCtaBandProps = {
  tone?: FuCtaBandTone
  title: string
  body?: string
  primaryCta: ReactNode
  secondaryCta?: ReactNode
  /** Larger centered headline with extra air. */
  sparse?: boolean
  mascot?: boolean
  mascotSize?: MissoutAvatarSize
  mascotAnimation?: string
  className?: string
}

const toneClass: Record<FuCtaBandTone, string> = {
  default: 'bg-[var(--fu-canvas)] text-[var(--fu-ink)]',
  surface: 'bg-[var(--fu-surface)] text-[var(--fu-ink)]',
  dark: 'bg-[var(--fu-band-dark)] text-[var(--fu-band-dark-ink)]',
}

/** Calm conversion band — white or soft gray, primary Blue CTA. */
export function FuCtaBand({
  tone = 'surface',
  title,
  body,
  primaryCta,
  secondaryCta,
  sparse = false,
  mascot = false,
  mascotSize,
  mascotAnimation = 'happy',
  className,
}: FuCtaBandProps) {
  const onDark = tone === 'dark'
  const resolvedMascotSize = mascotSize ?? (sparse ? 'lg' : 'md')

  return (
    <section
      className={cn(
        'border-t border-[var(--fu-hairline)]',
        sparse ? 'py-20 sm:py-28' : 'py-16 sm:py-24',
        toneClass[tone],
        className,
      )}
      aria-label="Call to action"
    >
      <FuContainer width="narrow">
        <div className="flex flex-col items-center gap-5 text-center">
          {mascot ? (
            <FuMascot size={resolvedMascotSize} framed animation={mascotAnimation} />
          ) : null}
          <FuTitle
            level="h2"
            className={cn(
              sparse && 'max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)] leading-tight',
              onDark ? 'text-inherit' : undefined,
            )}
          >
            {title}
          </FuTitle>
          {body ? (
            <FuBody className={cn('max-w-lg', onDark ? 'text-[var(--fu-band-dark-muted)]' : undefined)}>
              {body}
            </FuBody>
          ) : null}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
            {primaryCta}
            {secondaryCta}
          </div>
        </div>
      </FuContainer>
    </section>
  )
}
