import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import type { ProductShot } from '../../lib/productAssets'
import { fuFocusRing, fuMotion } from '../../lib/design/findusMotion'
import { MissoutIcon } from '../icons'
import type { FuMediaPlaceholderSpec } from './FuMediaPlaceholder'
import type { FuShowcaseCrop, FuShowcasePlacement } from './FuMediaFrame'
import { FuFeatureShowcaseShot } from './FuMediaFrame'
import { FuMeta, FuTitle } from './FuTypography'

export type FuFeatureMediaPanelItem = {
  eyebrow?: string
  title: string
  href?: string
  shot?: ProductShot
  shotAlt?: string
  placeholder?: FuMediaPlaceholderSpec
  mediaCrop?: FuShowcaseCrop
  mediaPlacement?: FuShowcasePlacement
  secondaryShot?: ProductShot
  secondaryAlt?: string
  secondaryPlaceholder?: FuMediaPlaceholderSpec
}

export type FuFeatureMediaPanelProps = {
  item: FuFeatureMediaPanelItem
  mediaSide?: 'left' | 'right'
  /** `spotlight` — Notion tier-2 band: copy left, large screenshot right. */
  variant?: 'default' | 'spotlight'
  className?: string
}

function ModuleArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
        'bg-[var(--fu-ink)] text-[var(--fu-canvas)]',
        'motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5',
        className,
      )}
      aria-hidden
    >
      <MissoutIcon name="arrowRight" size={16} className="text-current" />
    </span>
  )
}

/** Notion-style feature row — copy + large showcase screenshot. */
export function FuFeatureMediaPanel({
  item,
  mediaSide = 'right',
  variant = 'default',
  className,
}: FuFeatureMediaPanelProps) {
  const spotlight = variant === 'spotlight'

  const copy = spotlight ? (
    <>
      {item.eyebrow ? <FuMeta className="normal-case">{item.eyebrow}</FuMeta> : null}
      <FuTitle level="h3" className="mt-0 text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">
        {item.title}
      </FuTitle>
      {item.href ? <ModuleArrow className="mt-5" /> : null}
    </>
  ) : (
    <div className="flex min-w-0 flex-col justify-center gap-4 lg:px-2 lg:py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {item.eyebrow ? <FuMeta className="mb-2 normal-case">{item.eyebrow}</FuMeta> : null}
          <FuTitle level="h3" className="text-xl leading-snug sm:text-2xl">
            {item.title}
          </FuTitle>
        </div>
        {item.href ? <ModuleArrow /> : null}
      </div>
    </div>
  )

  const media =
    item.placeholder || item.shot ? (
      <div className="flex w-full min-w-0 items-end justify-center">
        <div className="w-full">
          <FuFeatureShowcaseShot
            shot={item.shot}
            alt={item.shotAlt}
            placeholder={item.placeholder}
            crop={item.mediaCrop}
            placement={item.mediaPlacement ?? (spotlight ? 'spotlight' : 'module-a')}
            secondaryShot={item.secondaryShot}
            secondaryAlt={item.secondaryAlt}
            secondaryPlaceholder={item.secondaryPlaceholder}
          />
        </div>
      </div>
    ) : null

  const gridClass = cn(
    spotlight
      ? 'grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-10 xl:gap-12'
      : 'grid items-center gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-14',
    mediaSide === 'left' && '[&>*:first-child]:lg:order-2 [&>*:last-child]:lg:order-1',
  )

  const shellClass = cn(
    'group block overflow-hidden rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-surface)]',
    spotlight ? 'p-0' : 'p-4 sm:p-5 lg:p-6',
    fuMotion.hoverLift,
    'motion-safe:transition-[box-shadow,transform]',
    'motion-safe:hover:shadow-[var(--fu-shadow-soft)]',
    fuFocusRing,
    className,
  )

  const content = spotlight ? (
    <div className={gridClass}>
      <div className="flex min-w-0 max-w-md flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10 lg:pr-6 xl:pr-8">
        {copy}
      </div>
      {media}
    </div>
  ) : (
    <div className={gridClass}>
      {copy}
      {media}
    </div>
  )

  if (item.href) {
    return (
      <Link to={item.href} className={cn(shellClass, 'no-underline text-inherit')}>
        {content}
      </Link>
    )
  }

  return <div className={shellClass}>{content}</div>
}

export type FuFeatureMediaStackProps = {
  items: readonly FuFeatureMediaPanelItem[]
  className?: string
}

export function FuFeatureMediaStack({ items, className }: FuFeatureMediaStackProps) {
  return (
    <div className={cn('flex flex-col gap-5 sm:gap-6', className)}>
      {items.map((item, index) => (
        <FuFeatureMediaPanel
          key={item.title}
          item={item}
          mediaSide={index % 2 === 0 ? 'right' : 'left'}
        />
      ))}
    </div>
  )
}
