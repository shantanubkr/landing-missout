import { usePageMeta } from '../../hooks/usePageMeta'
import { GET_STARTED_HREF } from '../../lib/ctas'
import type { BackstageFeatureContent } from '../../lib/backstageFeaturePages'
import { BACKSTAGE_FEATURE_SCREENS } from '../../lib/productAssets'
import { cn } from '../../lib/cn'
import { FuButtonAnchor } from './FuButton'
import { FuCtaBand } from './FuCtaBand'
import { FuContainer } from './FuContainer'
import { FuFeatureHero } from './FuFeatureHero'
import { FuProductShot } from './FuProductShot'
import { FuSection } from './FuSection'
import { FuSitewideCtaPair } from './FuSitewideCtaPair'

export type BackstageFeaturePageProps = {
  content: BackstageFeatureContent
}

/** Standard Backstage feature page — hero + final conversion band. */
export function BackstageFeaturePage({ content }: BackstageFeaturePageProps) {
  const screens = BACKSTAGE_FEATURE_SCREENS[content.assetKey]

  usePageMeta({
    title: content.featureLabel,
    description: content.metaDescription,
  })

  return (
    <>
      <FuFeatureHero
        featureLabel={content.featureLabel}
        title={content.title}
        subtitle={content.subtitle}
        mess={content.mess || undefined}
        changes={content.changes}
        audience={content.audience ? [...content.audience] : undefined}
        flag={content.flag}
        accent={content.accent}
        cta={
          <FuButtonAnchor href={GET_STARTED_HREF} variant="primary" size="lg">
            {content.ctaLabel}
          </FuButtonAnchor>
        }
      />

      <FuSection tone="surface" padding="md">
        <FuContainer width="narrow">
          <div
            className={cn(
              'grid items-start gap-4',
              screens.secondary ? 'sm:grid-cols-2' : 'max-w-2xl',
            )}
          >
            <FuProductShot shot={screens.primary} alt={screens.primaryAlt} loading="eager" />
            {screens.secondary ? (
              <FuProductShot
                shot={screens.secondary}
                alt={screens.secondaryAlt ?? `${content.featureLabel} preview`}
              />
            ) : null}
          </div>
        </FuContainer>
      </FuSection>

      <FuCtaBand
        title={`Ready to use ${content.featureLabel} on Backstage?`}
        primaryCta={<FuSitewideCtaPair size="lg" />}
      />
    </>
  )
}
