import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import {
  PRODUCT_MOCKUP_ACCENTS,
  type ProductMockupAccentConfig,
  type ProductMockupAccentPlacement,
} from '../../lib/productMockupVariants'

const accentPlacementClass: Record<ProductMockupAccentPlacement, string> = {
  'bottom-right': 'bottom-[8%] right-[4%] sm:bottom-[10%] sm:right-[6%]',
  'top-right': 'top-[8%] right-[4%] sm:top-[10%] sm:right-[6%]',
  'bottom-left': 'bottom-[8%] left-[4%] sm:bottom-[10%] sm:left-[6%]',
}

export type FuProductMockupFrameProps = {
  children: ReactNode
  accents?: readonly ProductMockupAccentConfig[]
  /** Visual spill scale — 1.05–1.15 recommended. */
  scale?: number
  minHeight?: string
  className?: string
}

/** Spill frame — flush full-width panel, cropped only at the bottom edge. */
export function FuProductMockupFrame({
  children,
  accents,
  scale = 1.08,
  minHeight = 'min-h-[17.5rem] sm:min-h-[21rem]',
  className,
}: FuProductMockupFrameProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-[var(--fu-surface)]',
        minHeight,
        className,
      )}
    >
      <div className="w-full origin-top" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>

      {accents?.map((accent) => {
        const Accent = PRODUCT_MOCKUP_ACCENTS[accent.id]
        const placement = accent.placement ?? 'bottom-right'
        return (
          <div
            key={accent.id}
            className={cn(
              'pointer-events-none absolute z-30 isolate',
              accentPlacementClass[placement],
            )}
            style={{ rotate: `${accent.rotate ?? -3}deg` }}
          >
            <Accent />
          </div>
        )
      })}
    </div>
  )
}
