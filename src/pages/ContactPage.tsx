import { usePageMeta } from '../hooks/usePageMeta'
import { CONTACT_CHANNELS } from '../lib/marketingPageContent'
import { ONBOARDING_STEPS } from '../lib/productAssets'
import {
  FuBody,
  FuContactDemoFlow,
  FuDirectContactSection,
  FuMarketingSection,
  FuOnboardingCarousel,
} from '../components/findus'

export function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description:
      'Tell us your role and number for a Backstage walkthrough, or reach the MissOut team by email and WhatsApp.',
  })

  return (
    <>
      <FuContactDemoFlow />

      <FuDirectContactSection className="max-lg:!py-10" />

      <FuMarketingSection tone="default" padding="lg" className="max-lg:!py-12" title="Ready without a call?">
        <FuBody className="mb-8 max-w-2xl">
          Start onboarding your team on Backstage: set up your fest structure and invite the
          committee when you&apos;re ready.
        </FuBody>
        <FuOnboardingCarousel
          steps={ONBOARDING_STEPS}
          getStartedHref={CONTACT_CHANNELS.getStarted}
          getStartedLabel={CONTACT_CHANNELS.getStartedLabel}
        />
      </FuMarketingSection>
    </>
  )
}
