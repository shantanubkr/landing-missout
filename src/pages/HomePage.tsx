import { usePageMeta } from '../hooks/usePageMeta'
import {
  GET_STARTED_HREF,
  GET_STARTED_LABEL,
  REQUEST_DEMO_HREF,
  REQUEST_DEMO_LABEL,
} from '../lib/ctas'
import { FuBackstageBridge, FuButtonAnchor, FuButtonLink, FuCtaBand, FuHomeHero, FuHomeRunEventSection, FuIphoneStickyBridge } from '../components/findus'
import { BACKSTAGE_IPHONE, PRODUCT_HEROES, STAGE_IPHONE } from '../lib/productAssets'
import { partnerLogoStripItems } from '../lib/partnerFestsData'

const PARTNER_LOGOS = partnerLogoStripItems()

export function HomePage() {
  usePageMeta({
    title: 'Home',
    description:
      'MissOut Backstage helps festivals and campus teams run registrations, check-ins, updates, and day-of ops, in one place.',
  })

  return (
    <>
      <FuHomeHero
        shot={PRODUCT_HEROES.backstage}
        shotAlt="Backstage dashboard for campus event operations"
        logos={PARTNER_LOGOS}
      />

      <FuBackstageBridge image={BACKSTAGE_IPHONE} />

      <FuIphoneStickyBridge
        title="Stage"
        tagline="Made for you to show up."
        accent="lime"
        mascotAccent="pink"
        mascotAnimation="happy"
        layout="image-right"
        image={STAGE_IPHONE}
        imageAlt="Stage mobile app on iPhone showing featured campus events"
      />

      <FuHomeRunEventSection />

      <FuCtaBand
        sparse
        className="!py-14 sm:!py-20"
        title="Ready to run your next fest on Backstage?"
        primaryCta={
          <FuButtonAnchor href={GET_STARTED_HREF} variant="primary" size="lg">
            {GET_STARTED_LABEL}
          </FuButtonAnchor>
        }
        secondaryCta={
          <FuButtonLink to={REQUEST_DEMO_HREF} variant="secondary" size="lg">
            {REQUEST_DEMO_LABEL}
          </FuButtonLink>
        }
      />
    </>
  )
}
