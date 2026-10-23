import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { CONTACT_CHANNELS } from '../lib/marketingPageContent'
import { BACKSTAGE_FEATURES_PAGE } from '../lib/backstageFeaturePages'
import {
  FuButtonAnchor,
  FuButtonLink,
  FuMarketingSection,
  FuPageHero,
  FuSitewideCtaPair,
  FuTag,
} from '../components/findus'

export function DevelopersPage() {
  usePageMeta({
    title: 'Developers',
    description:
      'MissOut APIs are on the roadmap: developer access and docs coming soon.',
  })

  return (
    <>
      <FuPageHero
        eyebrow="Developers"
        title="MissOut APIs, coming soon."
        subtitle="Developer access on the roadmap, not live docs yet."
        micro={<FuTag tone="neutral">Coming soon</FuTag>}
      />

      <FuMarketingSection
        tone="surface"
        title="What we're aiming for"
        body="Connected campus tooling: fewer CSV loops between your stack and event ops. No invented endpoints until the API is ready to ship."
      />

      <FuMarketingSection tone="default" title="Register interest">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <FuButtonAnchor href={CONTACT_CHANNELS.mailto} variant="secondary" size="lg">
            {CONTACT_CHANNELS.email}
          </FuButtonAnchor>
          <FuButtonAnchor
            href={CONTACT_CHANNELS.whatsapp}
            variant="secondary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {CONTACT_CHANNELS.phone}
          </FuButtonAnchor>
        </div>
      </FuMarketingSection>

      <FuMarketingSection tone="surface" title="Meanwhile">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <FuButtonLink to={BACKSTAGE_FEATURES_PAGE} variant="ghost" size="lg">
            Explore Backstage
          </FuButtonLink>
          <FuButtonAnchor href={CONTACT_CHANNELS.getStarted} variant="primary" size="lg">
            {CONTACT_CHANNELS.getStartedLabel}
          </FuButtonAnchor>
        </div>
        <p className="fu-type-body-sm m-0 mt-6 text-[var(--fu-ink-muted)]">
          Questions about integrations?{' '}
          <Link to="/contact" className="font-semibold text-[var(--fu-brand-blue)] no-underline">
            Contact us
          </Link>
          .
        </p>
      </FuMarketingSection>

      <FuMarketingSection tone="default" padding="sm">
        <FuSitewideCtaPair size="lg" />
      </FuMarketingSection>
    </>
  )
}
