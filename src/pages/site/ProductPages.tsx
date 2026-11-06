import { Navigate, useParams } from 'react-router-dom'
import { FeaturesIndex } from '../../components/features/FeaturesIndex'
import { FeatureStory } from '../../components/feature/FeatureStory'
import { FigmaSiteShell } from '../../components/FigmaSiteShell'
import { ProductPage } from '../../components/product/ProductKit'
import { getFeaturePage } from '../../lib/featurePages'
import { BACKSTAGE_PAGE, STAGE_PAGE } from '../../lib/productPages'
import { SITE_LINKS } from '../../lib/siteRoutes'

export function BackstageProductPage() {
  return (
    <FigmaSiteShell>
      <ProductPage page={BACKSTAGE_PAGE} />
    </FigmaSiteShell>
  )
}

export function StageProductPage() {
  return (
    <FigmaSiteShell>
      <ProductPage page={STAGE_PAGE} />
    </FigmaSiteShell>
  )
}

export function FeaturesPage() {
  return (
    <FigmaSiteShell>
      <FeaturesIndex />
    </FigmaSiteShell>
  )
}

export function FeatureStoryPage() {
  const { featureId } = useParams()
  const page = getFeaturePage(featureId)
  if (!page) return <Navigate to={SITE_LINKS.features} replace />
  return (
    <FigmaSiteShell>
      <FeatureStory page={page} />
    </FigmaSiteShell>
  )
}
