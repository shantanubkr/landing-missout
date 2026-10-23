import { cn } from '../../lib/cn'
import type { IconName } from '../icons'
import type { ProductShot } from '../../lib/productAssets'
import { FU_ELEVATION } from '../../lib/design/findus'
import { FuIconChip } from './FuIconChip'
import { FuProductShot } from './FuProductShot'
import { FuTitle } from './FuTypography'

export type FuCapabilityCardProps = {
  label: string
  shot: ProductShot
  alt: string
  iconName: IconName
  className?: string
}

/**
 * Stage / bento capability tile — art flush in padded well, pill footer label.
 * Bento PNGs ship with their own rounded chrome; avoid overflow clip on the art.
 */
export function FuCapabilityCard({
  label,
  shot,
  alt,
  iconName,
  className,
}: FuCapabilityCardProps) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-[var(--fu-radius)] bg-[var(--fu-canvas)]',
        FU_ELEVATION.card,
        className,
      )}
    >
      <div className="p-3 sm:p-4">
        <FuProductShot shot={shot} alt={alt} presentation="flush" />
      </div>
      <div className="mx-3 mb-3 mt-auto flex items-center justify-center gap-2 rounded-[var(--fu-radius)] bg-[var(--fu-surface)] px-4 py-3">
        <FuIconChip name={iconName} tint="neutral" size={16} />
        <FuTitle level="h3" className="text-base">
          {label}
        </FuTitle>
      </div>
    </article>
  )
}

export type FuCapabilityCardGridProps = {
  items: readonly FuCapabilityCardProps[]
  className?: string
}

export function FuCapabilityCardGrid({ items, className }: FuCapabilityCardGridProps) {
  return (
    <div className={cn('grid items-start gap-4 sm:grid-cols-3 sm:gap-5', className)}>
      {items.map((item) => (
        <FuCapabilityCard key={item.label} {...item} />
      ))}
    </div>
  )
}
