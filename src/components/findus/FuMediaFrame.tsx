import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { ProductShot } from '../../lib/productAssets'
import { resolveImageAsset } from '../../lib/productAssets'
import type { FuMediaPlaceholderSpec } from './FuMediaPlaceholder'
import { FuMediaPlaceholder } from './FuMediaPlaceholder'
import { ThemedProductImage } from './ThemedProductImage'

export type FuMediaFrameProps = {
  children?: ReactNode
  className?: string
}

export type FuShowcaseCrop = 'landscape' | 'portrait' | 'wide'

export type FuShowcasePlacement = 'module-a' | 'module-b' | 'spotlight'

const showcaseCropClass: Record<FuShowcaseCrop, string> = {
  landscape: 'aspect-[5/3] sm:aspect-[16/10]',
  portrait: 'aspect-[3/4] sm:aspect-[4/5] lg:max-w-none',
  wide: 'aspect-[16/10] lg:aspect-[2/1] lg:min-h-[22rem]',
}

export type FuShowcaseMediaTrayProps = {
  children: ReactNode
  crop?: FuShowcaseCrop
  className?: string
}

/** Notion-style white screenshot tray — single inset on surface cards, no card-in-card gray. */
export function FuShowcaseMediaTray({
  children,
  crop = 'landscape',
  className,
}: FuShowcaseMediaTrayProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[var(--fu-radius-sm)] bg-[var(--fu-canvas)] shadow-[var(--fu-shadow-media)]',
        showcaseCropClass[crop],
        className,
      )}
    >
      {children}
    </div>
  )
}

export function shotShowcaseCrop(shot: ProductShot): FuShowcaseCrop {
  const asset = resolveImageAsset(shot, 'light')
  return dimensionsShowcaseCrop(asset.width, asset.height)
}

export function dimensionsShowcaseCrop(width: number, height: number): FuShowcaseCrop {
  const ratio = width / height
  if (ratio > 1.35) return 'landscape'
  if (ratio < 0.85) return 'portrait'
  return 'landscape'
}

export type LayeredShotLayout = 'single' | 'stack' | 'sideBySide'

/** Pick a composition that respects each screenshot's intrinsic proportions. */
export function getLayeredShotLayout(
  primary?: ProductShot,
  secondary?: ProductShot,
): LayeredShotLayout {
  if (!primary || !secondary) return 'single'

  const primaryAsset = resolveImageAsset(primary, 'light')
  const secondaryAsset = resolveImageAsset(secondary, 'light')
  const primaryRatio = primaryAsset.width / primaryAsset.height
  const secondaryRatio = secondaryAsset.width / secondaryAsset.height

  // Short wide strips (CTA bars, ticket rails) sit under a portrait UI — not beside it.
  if (secondaryRatio >= 2.2 && secondaryAsset.height <= 320) return 'stack'
  if (primaryRatio < 0.9 && secondaryRatio > 1.1) return 'stack'

  return 'sideBySide'
}

function layeredPrimaryMaxWidth(primary?: ProductShot): string {
  if (!primary) return 'max-w-4xl'
  const asset = resolveImageAsset(primary, 'light')
  const ratio = asset.width / asset.height
  if (ratio < 0.85) return 'max-w-[22rem]'
  if (ratio > 1.35) return 'max-w-5xl'
  return 'max-w-3xl'
}

function ModuleTrayShot({
  shot,
  alt,
  placeholder,
  loading,
}: {
  shot?: ProductShot
  alt?: string
  placeholder?: FuMediaPlaceholderSpec
  loading?: 'eager' | 'lazy'
}) {
  return (
    <div className="w-full overflow-hidden rounded-[var(--fu-radius-sm)] bg-[var(--fu-canvas)] shadow-[var(--fu-shadow-media)] ring-1 ring-[var(--fu-hairline)]">
      {placeholder ? (
        <FuMediaPlaceholder {...placeholder} className="w-full rounded-none" />
      ) : shot && alt ? (
        <ThemedProductImage shot={shot} alt={alt} loading={loading} fit="natural" />
      ) : null}
    </div>
  )
}

function LayeredTrayShot({
  shot,
  alt,
  placeholder,
  loading,
}: {
  shot?: ProductShot
  alt?: string
  placeholder?: FuMediaPlaceholderSpec
  loading?: 'eager' | 'lazy'
}) {
  return (
    <div className="overflow-hidden rounded-[var(--fu-radius-sm)] bg-[var(--fu-canvas)] shadow-[var(--fu-shadow-media)] ring-1 ring-[var(--fu-hairline)]">
      {placeholder ? (
        <FuMediaPlaceholder {...placeholder} className="w-full rounded-none" />
      ) : shot && alt ? (
        <ThemedProductImage shot={shot} alt={alt} loading={loading} fit="natural" />
      ) : null}
    </div>
  )
}

function SpotlightLayeredShot({
  shot,
  alt,
  placeholder,
  secondaryShot,
  secondaryAlt,
  secondaryPlaceholder,
  loading,
}: {
  shot?: ProductShot
  alt?: string
  placeholder?: FuMediaPlaceholderSpec
  secondaryShot?: ProductShot
  secondaryAlt?: string
  secondaryPlaceholder?: FuMediaPlaceholderSpec
  loading?: 'eager' | 'lazy'
}) {
  const hasBack = Boolean(secondaryPlaceholder || (secondaryShot && secondaryAlt))
  const hasFront = Boolean(placeholder || (shot && alt))

  if (!hasBack && !hasFront) return null

  if (!hasBack && hasFront) {
    return (
      <div className={cn('mx-auto w-full', layeredPrimaryMaxWidth(shot))}>
        <LayeredTrayShot shot={shot} alt={alt} placeholder={placeholder} loading={loading} />
      </div>
    )
  }

  const layout = getLayeredShotLayout(shot, secondaryShot)
  const primaryWidth = layeredPrimaryMaxWidth(shot)

  if (layout === 'stack') {
    return (
      <div className={cn('mx-auto flex w-full flex-col items-center gap-4 sm:gap-5', primaryWidth)}>
        {hasFront ? (
          <LayeredTrayShot shot={shot} alt={alt} placeholder={placeholder} loading={loading} />
        ) : null}
        <LayeredTrayShot
          shot={secondaryShot}
          alt={secondaryAlt}
          placeholder={secondaryPlaceholder}
          loading={loading}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl items-end gap-4 overflow-x-clip sm:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] sm:gap-5 lg:gap-8">
      <div className="min-w-0">
        <LayeredTrayShot
          shot={secondaryShot}
          alt={secondaryAlt}
          placeholder={secondaryPlaceholder}
          loading={loading}
        />
      </div>
      {hasFront ? (
        <div className="min-w-0 lg:-ml-[6%]">
          <LayeredTrayShot shot={shot} alt={alt} placeholder={placeholder} loading={loading} />
        </div>
      ) : null}
    </div>
  )
}

export type FuFeatureShowcaseShotProps = {
  shot?: ProductShot
  alt?: string
  placeholder?: FuMediaPlaceholderSpec
  crop?: FuShowcaseCrop
  placement?: FuShowcasePlacement
  secondaryShot?: ProductShot
  secondaryAlt?: string
  secondaryPlaceholder?: FuMediaPlaceholderSpec
  className?: string
  loading?: 'eager' | 'lazy'
}

/** Product screenshot inside a single white tray — no nested clip layers. */
export function FuFeatureShowcaseShot({
  shot,
  alt,
  placeholder,
  placement = 'module-a',
  secondaryShot,
  secondaryAlt,
  secondaryPlaceholder,
  className,
  loading = 'lazy',
}: FuFeatureShowcaseShotProps) {
  if (placement === 'spotlight') {
    return (
      <div className={className}>
        <SpotlightLayeredShot
          shot={shot}
          alt={alt}
          placeholder={placeholder}
          secondaryShot={secondaryShot}
          secondaryAlt={secondaryAlt}
          secondaryPlaceholder={secondaryPlaceholder}
          loading={loading}
        />
      </div>
    )
  }

  return (
    <div className={className}>
      <ModuleTrayShot
        shot={shot}
        alt={alt}
        placeholder={placeholder}
        loading={loading}
      />
    </div>
  )
}

/**
 * Card-in-card product frame — concentric radii + inner padding so screenshots
 * are not clipped at corners.
 */
export function FuMediaFrame({ children, className }: FuMediaFrameProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--fu-radius)] bg-[var(--fu-surface)] p-3 sm:p-4',
        className,
      )}
    >
      <div className="rounded-[var(--fu-radius-sm)] bg-[var(--fu-canvas)] p-2 shadow-[var(--fu-shadow-media)] sm:p-3">
        {children}
      </div>
    </div>
  )
}

/** Screenshot inside FuMediaFrame — soft radius only, no overflow clip. */
export const fuMediaFrameImageClass =
  'block h-auto w-full max-w-full rounded-[var(--fu-radius-xs)]'

/** Bento / marketing tiles — flush, no CSS radius (art defines edges). */
export const fuFlushImageClass = 'block h-auto w-full max-w-full'

/** Inline screenshot inside an existing frame wrapper. */
export const fuInlineImageClass =
  'block h-auto w-full max-w-full rounded-[var(--fu-radius-xs)]'
