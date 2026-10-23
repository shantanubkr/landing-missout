import type { BackstageFeatureContent } from '../../lib/backstageFeaturePages'
import { BACKSTAGE_FEATURE_SCREENS } from '../../lib/productAssets'
import { FEATURE_MASCOT_ANIMATION } from '../../lib/mascotThemes'
import { FuFeatureSpotlightBand } from './FuFeatureSpotlightBand'

export type BackstageFeatureSectionProps = {
  content: BackstageFeatureContent
  /** First band on the page — eager-load screenshots. */
  priority?: boolean
  className?: string
}

/** One Notion-style feature band on the unified Backstage features scroll page. */
export function BackstageFeatureSection({
  content,
  priority = false,
  className,
}: BackstageFeatureSectionProps) {
  const screens = BACKSTAGE_FEATURE_SCREENS[content.assetKey]

  return (
    <FuFeatureSpotlightBand
      className={className}
      title={content.title}
      subtitle={content.subtitle}
      accent={content.accent}
      avatarAnimation={FEATURE_MASCOT_ANIMATION[content.assetKey]}
      shot={screens.primary}
      shotAlt={screens.primaryAlt}
      secondaryShot={screens.secondary}
      secondaryAlt={screens.secondaryAlt}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}
