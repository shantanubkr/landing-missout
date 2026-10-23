import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import type { ProductShot } from '../../lib/productAssets'
import { fuFocusRing, fuMotion } from '../../lib/design/findusMotion'
import { MissoutIcon } from '../icons'
import type { FuMediaPlaceholderSpec } from './FuMediaPlaceholder'
import type { FuShowcaseCrop, FuShowcasePlacement } from './FuMediaFrame'
import { FuFeatureShowcaseShot } from './FuMediaFrame'
import { FuMeta, FuTitle } from './FuTypography'

export type FuFeatureModuleItem = {
  eyebrow?: string
  title: string
  href?: string
  shot?: ProductShot
  shotAlt?: string
  placeholder?: FuMediaPlaceholderSpec
  /** Override auto-detected screenshot crop in the showcase tray. */
  mediaCrop?: FuShowcaseCrop
  mediaPlacement?: FuShowcasePlacement
}

export type FuFeatureModuleProps = {
  item: FuFeatureModuleItem
  mediaPlacement?: FuShowcasePlacement
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

/** Notion-style feature module — surface panel, headline, arrow, white showcase tray. */
export function FuFeatureModule({ item, mediaPlacement = 'module-a', className }: FuFeatureModuleProps) {
  const header = (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        {item.eyebrow ? <FuMeta className="mb-2 normal-case">{item.eyebrow}</FuMeta> : null}
        <FuTitle level="h3" className="text-xl leading-snug sm:text-2xl">
          {item.title}
        </FuTitle>
      </div>
      {item.href ? <ModuleArrow /> : null}
    </div>
  )

  const media =
    item.placeholder || item.shot ? (
      <div className="mt-5 min-w-0 flex-1 sm:mt-6">
        <FuFeatureShowcaseShot
          shot={item.shot}
          alt={item.shotAlt}
          placeholder={item.placeholder}
          crop={item.mediaCrop}
          placement={item.mediaPlacement ?? mediaPlacement}
        />
      </div>
    ) : null

  const shellClass = cn(
    'flex h-full flex-col overflow-hidden rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-surface)] p-6 sm:p-8',
    fuMotion.hoverLift,
    'motion-safe:transition-[box-shadow,transform]',
    'motion-safe:hover:shadow-[var(--fu-shadow-soft)]',
  )

  if (item.href) {
    return (
      <Link
        to={item.href}
        className={cn(shellClass, 'group no-underline text-inherit', fuFocusRing, className)}
      >
        {header}
        {media}
      </Link>
    )
  }

  return (
    <div className={cn(shellClass, className)}>
      {header}
      {media}
    </div>
  )
}

export type FuFeatureModuleGridProps = {
  items: readonly FuFeatureModuleItem[]
  className?: string
}

export function FuFeatureModuleGrid({ items, className }: FuFeatureModuleGridProps) {
  return (
    <div className={cn('grid items-stretch gap-4 sm:gap-5 lg:grid-cols-2', className)}>
      {items.map((item, index) => (
        <FuFeatureModule
          key={item.title}
          item={item}
          mediaPlacement={index === 0 ? 'module-a' : 'module-b'}
        />
      ))}
    </div>
  )
}

export type FuShowcasePanelProps = {
  eyebrow?: string
  title: string
  body?: ReactNode
  children?: ReactNode
  /** `split` places children beside the header on desktop (Notion band + CTA). */
  layout?: 'stack' | 'split'
  className?: string
}

/** Large surface band — Notion “Automate busywork” style wrapper. */
export function FuShowcasePanel({
  eyebrow,
  title,
  body,
  children,
  layout = 'stack',
  className,
}: FuShowcasePanelProps) {
  const split = layout === 'split'

  return (
    <div
      className={cn(
        'rounded-[var(--fu-radius)] bg-[var(--fu-surface)] p-6 sm:p-8 lg:p-10',
        split && 'lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10',
        className,
      )}
    >
      <div className={cn('max-w-2xl', children && !split && 'mb-8', split && 'mb-6 lg:mb-0')}>
        {eyebrow ? <FuMeta className="mb-2 normal-case">{eyebrow}</FuMeta> : null}
        <FuTitle level="h2" className="mb-3">
          {title}
        </FuTitle>
        {typeof body === 'string' ? (
          <p className="fu-type-body m-0 text-[var(--fu-ink-secondary)]">{body}</p>
        ) : (
          body
        )}
      </div>
      {children}
    </div>
  )
}
