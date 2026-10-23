import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { GET_BACKSTAGE_LABEL, OPEN_STAGE_LABEL } from '../lib/marketingPageContent'
import { GET_STARTED_HREF, STAGE_APP_HREF } from '../lib/ctas'
import { BACKSTAGE_FEATURE_ROUTES } from '../lib/backstageFeaturePages'
import { PRODUCT_HEROES, STAGE_CAPABILITY_SHOTS } from '../lib/productAssets'
import {
  FuButtonAnchor,
  FuCapabilityCardGrid,
  FuCtaBand,
  FuMarketingSection,
  FuPageHero,
  FuProductShot,
  FuTitle,
  FuBody,
} from '../components/findus'

export function StagePage() {
  usePageMeta({
    title: 'Stage',
    description:
      'Stage is MissOut for students: discover campus events, register without Form archaeology, and keep your schedule in one place.',
  })

  return (
    <>
      <FuPageHero
        mediaLayout="below"
        eyebrow="Stage"
        title="Campus events, easier to find, and easier to show up to."
        subtitle="Stage is MissOut for students: discover festivals, competitions, performances, and workshops, register without Form archaeology, keep your events in one place."
        primaryCta={
          <FuButtonAnchor href={STAGE_APP_HREF} variant="primary" size="lg">
            {OPEN_STAGE_LABEL}
          </FuButtonAnchor>
        }
        secondaryCta={
          <FuButtonAnchor href={GET_STARTED_HREF} variant="secondary" size="lg">
            {GET_BACKSTAGE_LABEL}
          </FuButtonAnchor>
        }
        media={
          <FuProductShot
            shot={PRODUCT_HEROES.stage}
            alt="Stage app: discover and register for campus events"
            loading="eager"
            presentation="inline"
          />
        }
      />

      <FuMarketingSection tone="surface" padding="sm">
        <FuCapabilityCardGrid
          items={STAGE_CAPABILITY_SHOTS.map((item) => ({
            label: item.label,
            shot: item.shot,
            alt: item.alt,
            iconName: item.iconName,
          }))}
        />
      </FuMarketingSection>

      <FuMarketingSection tone="default">
        <FuTitle level="h2" className="mb-4 max-w-2xl">
          Stage is the front door. Backstage runs the fest.
        </FuTitle>
        <FuBody className="max-w-2xl">
          Organisers publish from{' '}
          <Link to={BACKSTAGE_FEATURE_ROUTES.events} className="font-semibold text-[var(--fu-brand-blue)] no-underline">
            Backstage
          </Link>
          . Students find, register, and follow updates on Stage, one connected system, two
          surfaces.
        </FuBody>
      </FuMarketingSection>

      <FuCtaBand
        title="Looking for something on campus?"
        primaryCta={
          <FuButtonAnchor href={STAGE_APP_HREF} variant="primary" size="lg">
            {OPEN_STAGE_LABEL}
          </FuButtonAnchor>
        }
        secondaryCta={
          <FuButtonAnchor href={GET_STARTED_HREF} variant="secondary" size="lg">
            Run your fest on Backstage
          </FuButtonAnchor>
        }
      />
    </>
  )
}
