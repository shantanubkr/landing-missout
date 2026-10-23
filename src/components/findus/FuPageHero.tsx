import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { MissoutAvatarSize } from '../../lib/avatars'
import { FuContainer } from './FuContainer'
import { FuMascot } from './FuMascot'
import { FuMediaFrame } from './FuMediaFrame'
import { FuBody, FuDisplay, FuEyebrow, FuMeta } from './FuTypography'

export type FuPageHeroProps = {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  primaryCta?: ReactNode
  secondaryCta?: ReactNode
  micro?: ReactNode
  media?: ReactNode
  align?: 'left' | 'center'
  /**
   * `equal` 50/50 · `wide` media-heavy split · `below` stacked ·
   * `spectacle` centered copy + full-width product stage (Notion home).
   */
  mediaLayout?: 'equal' | 'wide' | 'below' | 'spectacle'
  tone?: 'light' | 'dark'
  mascot?: boolean
  mascotSize?: MissoutAvatarSize
  mascotAnimation?: string
  /** Keep primary + secondary CTAs on one row at all breakpoints. */
  ctaRow?: boolean
  id?: string
  className?: string
}

const toneClass = {
  light: 'bg-[var(--fu-canvas)]',
  dark: 'bg-[var(--fu-band-dark)] text-[var(--fu-band-dark-ink)]',
}

/**
 * Top-of-page hero — white canvas, Polymath H1, product frame in surface panel.
 */
export function FuPageHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  micro,
  media,
  align = 'left',
  mediaLayout = 'equal',
  tone = 'light',
  mascot,
  mascotSize = 'lg',
  mascotAnimation = 'idle',
  ctaRow = false,
  id,
  className,
}: FuPageHeroProps) {
  const centered = align === 'center' || mediaLayout === 'spectacle'
  const dark = tone === 'dark'
  const wideMedia = mediaLayout === 'wide'
  const belowMedia = mediaLayout === 'below' || mediaLayout === 'spectacle'
  const spectacle = mediaLayout === 'spectacle'
  const showMascot = mascot === true

  const copyBlock = (
    <div
      className={cn(
        'relative flex flex-col gap-5',
        centered && 'mx-auto max-w-3xl items-center text-center',
        spectacle && 'max-w-2xl',
      )}
    >
      {showMascot ? (
        <div
          className={cn(
            'pointer-events-none absolute z-10',
            centered
              ? '-top-2 right-0 sm:-top-4 sm:right-2 lg:-right-16'
              : '-top-4 right-0 sm:-top-6 sm:right-0 lg:-right-10',
          )}
        >
          <FuMascot size={mascotSize} framed animation={mascotAnimation} />
        </div>
      ) : null}
      {eyebrow ? (
        typeof eyebrow === 'string' ? (
          <FuEyebrow tone="blue">{eyebrow}</FuEyebrow>
        ) : (
          eyebrow
        )
      ) : null}
      {typeof title === 'string' ? (
        <FuDisplay
          className={cn(
            dark ? 'text-[var(--fu-band-dark-ink)]' : undefined,
            spectacle && 'text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02]',
          )}
        >
          {title}
        </FuDisplay>
      ) : (
        title
      )}
      {subtitle ? (
        typeof subtitle === 'string' ? (
          <FuBody
            className={cn(
              'max-w-xl',
              spectacle && 'text-base sm:text-lg',
              dark && 'text-[var(--fu-band-dark-muted)]',
            )}
          >
            {subtitle}
          </FuBody>
        ) : (
          subtitle
        )
      ) : null}
      {primaryCta || secondaryCta ? (
        <div
          className={cn(
            'flex pt-1',
            ctaRow
              ? 'flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3'
              : 'flex-col gap-3 sm:flex-row sm:items-center',
            centered && !ctaRow && 'sm:justify-center',
            centered && ctaRow && 'justify-center',
          )}
        >
          {primaryCta}
          {secondaryCta}
        </div>
      ) : null}
      {micro ? (
        typeof micro === 'string' ? (
          <FuMeta className={dark ? 'text-[var(--fu-band-dark-muted)]' : undefined}>{micro}</FuMeta>
        ) : (
          micro
        )
      ) : null}
    </div>
  )

  const mediaBlock = media ? (
    <div
      className={cn(
        'min-w-0',
        wideMedia && !belowMedia && 'lg:pt-1',
        spectacle && 'w-full',
      )}
    >
      {belowMedia ? (
        <FuMediaFrame className={spectacle ? 'p-3 sm:p-4 lg:p-5' : undefined}>
          <div
            className={cn(
              spectacle &&
                'fu-hero-ken-burns min-h-[240px] overflow-hidden rounded-[var(--fu-radius-sm)] sm:min-h-[320px] lg:min-h-[420px]',
            )}
          >
            {media}
          </div>
        </FuMediaFrame>
      ) : (
        media
      )}
    </div>
  ) : null

  return (
    <section
      id={id}
      aria-label="Page hero"
      className={cn(
        spectacle ? 'py-14 sm:py-20 lg:py-24' : 'py-16 sm:py-24 lg:py-28',
        toneClass[tone],
        className,
      )}
    >
      <FuContainer width={spectacle ? 'wide' : 'default'}>
        <div
          className={cn(
            'grid gap-10',
            media &&
              !belowMedia &&
              (wideMedia
                ? 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-14'
                : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14'),
            media && belowMedia && 'grid-cols-1 gap-8 lg:gap-10',
          )}
        >
          {copyBlock}
          {mediaBlock}
        </div>
      </FuContainer>
    </section>
  )
}
