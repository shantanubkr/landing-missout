import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { fuFocusRing } from '../../lib/design/findusMotion'
import type {
  ProductMockupAccentConfig,
  ProductMockupVariantId,
} from '../../lib/productMockupVariants'
import { MissoutIcon } from '../icons'
import { FuMeta, FuTitle } from '../findus/FuTypography'
import { FuProductMockupFrame } from './FuProductMockupFrame'
import { FuProductMockupRenderer, resolveMockupAccents } from './FuProductMockupRenderer'

function CardArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
        'bg-[var(--fu-ink)] text-[var(--fu-canvas)]',
        className,
      )}
      aria-hidden
    >
      <MissoutIcon name="arrowRight" size={16} className="text-current" />
    </span>
  )
}

export type FuProductMockupCardProps = {
  eyebrow?: string
  title: string
  href?: string
  variant: ProductMockupVariantId
  accents?: readonly ProductMockupAccentConfig[]
  frameScale?: number
  headerAction?: ReactNode
  className?: string
}

/**
 * Feature-card shell — headline row on top, spilled coded mockup below.
 * Reused across home feature modules and spotlight bands.
 */
export function FuProductMockupCard({
  eyebrow,
  title,
  href,
  variant,
  accents,
  frameScale,
  headerAction,
  className,
}: FuProductMockupCardProps) {
  const resolvedAccents = resolveMockupAccents(variant, accents)

  const header = (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        {eyebrow ? <FuMeta className="mb-2 normal-case">{eyebrow}</FuMeta> : null}
        <FuTitle level="h3" className="text-xl leading-snug sm:text-2xl">
          {title}
        </FuTitle>
      </div>
      {headerAction ?? (href ? <CardArrow /> : null)}
    </div>
  )

  const mockup = (
    <div className="mt-5 min-w-0 flex-1 sm:mt-6">
      <FuProductMockupFrame accents={resolvedAccents} scale={frameScale}>
        <FuProductMockupRenderer variant={variant} />
      </FuProductMockupFrame>
    </div>
  )

  const shellClass = cn(
    'flex h-full flex-col overflow-hidden rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-surface)] p-6 sm:p-8',
    className,
  )

  if (href) {
    return (
      <Link to={href} className={cn(shellClass, 'group no-underline text-inherit', fuFocusRing)}>
        {header}
        {mockup}
      </Link>
    )
  }

  return (
    <div className={shellClass}>
      {header}
      {mockup}
    </div>
  )
}
