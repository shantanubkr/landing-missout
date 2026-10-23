import type { FuFeatureMediaPanelItem } from './FuFeatureMediaPanel'
import { FuFeatureMediaPanel } from './FuFeatureMediaPanel'
import type { FuFeatureModuleItem } from './FuFeatureModule'
import { FuFeatureModuleGrid } from './FuFeatureModule'
import type { FuLinkCardItem } from './FuLinkCardStrip'
import { FuLinkCardStrip } from './FuLinkCardStrip'
import { FuTitle } from './FuTypography'
import { cn } from '../../lib/cn'

export type FuFestFeaturesSectionProps = {
  title?: string
  /** Top row — two equal feature modules (Notion tier 1). */
  pair: readonly [FuFeatureModuleItem, FuFeatureModuleItem]
  /** Middle row — full-width split module (Notion tier 2). */
  spotlight: FuFeatureMediaPanelItem
  /** Bottom row label + portrait link cards (Notion tier 3). */
  linkStripLabel?: string
  linkStripItems: readonly FuLinkCardItem[]
  className?: string
}

/**
 * Notion-style fest features — 2-up modules, wide spotlight, icon link strip.
 */
export function FuFestFeaturesSection({
  title = 'Everything you need to run the fest.',
  pair,
  spotlight,
  linkStripLabel = 'See what Backstage can do',
  linkStripItems,
  className,
}: FuFestFeaturesSectionProps) {
  return (
    <div className={cn('flex flex-col gap-5 sm:gap-6', className)}>
      <FuTitle level="h2" className="max-w-xl">
        {title}
      </FuTitle>

      <FuFeatureModuleGrid items={pair} />

      <FuFeatureMediaPanel
        item={spotlight}
        mediaSide="right"
        variant="spotlight"
      />

      <FuLinkCardStrip label={linkStripLabel} items={linkStripItems} className="pt-2 sm:pt-4" />
    </div>
  )
}
