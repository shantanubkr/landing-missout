import { cn } from '../../lib/cn'
import type { FuBrandHue } from '../../lib/design/findus'
import { fuAccentSoftBg } from '../../lib/design/findus'
import type { ProductShot } from '../../lib/productAssets'
import { FuMascot } from './FuMascot'
import { mascotThemeForAccent } from '../../lib/mascotThemes'
import { FuFeatureShowcaseShot } from './FuMediaFrame'
import { FuBody, FuTitle } from './FuTypography'

export type FuFeatureSpotlightBandProps = {
  title: string
  subtitle: string
  avatarAnimation?: string
  accent?: FuBrandHue
  shot: ProductShot
  shotAlt: string
  secondaryShot?: ProductShot
  secondaryAlt?: string
  loading?: 'eager' | 'lazy'
  className?: string
}

/**
 * Notion-style feature band — editorial header + tinted stage with overlapping UI windows.
 * No link-card grid below.
 */
export function FuFeatureSpotlightBand({
  title,
  subtitle,
  avatarAnimation = 'idle',
  accent = 'blue',
  shot,
  shotAlt,
  secondaryShot,
  secondaryAlt,
  loading = 'lazy',
  className,
}: FuFeatureSpotlightBandProps) {
  const layered = Boolean(secondaryShot && secondaryAlt)
  const mascotTheme = mascotThemeForAccent(accent, avatarAnimation)

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <div className="flex items-start justify-between gap-6 lg:gap-10">
          <FuTitle
            level="h2"
            className="max-w-2xl text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08]"
          >
            {title}
          </FuTitle>
          <FuMascot
            size="md"
            framed
            animation={mascotTheme.animation}
            bodyFill={mascotTheme.bodyFill}
            eyeFill={mascotTheme.eyeFill}
            className="hidden shrink-0 sm:inline-flex"
          />
        </div>
        <FuBody className="mt-4 max-w-2xl text-base sm:text-lg">{subtitle}</FuBody>
      </div>

      <div
        className={cn(
          'overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] lg:rounded-[2rem]',
          fuAccentSoftBg(accent),
          'flex justify-center p-4 sm:p-6 lg:p-8',
        )}
      >
        <FuFeatureShowcaseShot
          shot={shot}
          alt={shotAlt}
          secondaryShot={secondaryShot}
          secondaryAlt={secondaryAlt}
          placement={layered ? 'spotlight' : 'module-a'}
          loading={loading}
        />
      </div>
    </div>
  )
}
