import { usePageMeta } from '../hooks/usePageMeta'
import { partnerLogoStripItems } from '../lib/partnerFestsData'
import {
  FuBulletList,
  FuCtaBand,
  FuLogoStrip,
  FuMarketingSection,
  FuPageHero,
  FuSitewideCtaPair,
  FuTag,
} from '../components/findus'

const PARTNER_LOGOS = partnerLogoStripItems()

const PARTNERSHIP_MEANS = [
  'Dedicated workspace',
  'Onboarding & support',
  'Cross-campus visibility',
  'Built with feedback',
] as const

const WHY_PARTNER = [
  'Less overhead',
  'Centralised management',
  'Clearer participant experience',
  'Stage + Backstage',
] as const

export function PartnersPage() {
  usePageMeta({
    title: 'Partners',
    description:
      'Partner with MissOut: campus organisers, fest committees, and institutions end to end.',
  })

  return (
    <>
      <FuPageHero
        eyebrow="Partners"
        title="Built with campus organisers."
        subtitle="Partner with colleges and fest teams end to end, setup through day-of, and put events where more students can find them."
      />

      <FuMarketingSection tone="surface" title="Who we partner with">
        <div className="mb-8 flex flex-wrap gap-2">
          {['Fest committees', 'Entertainment bodies', 'Institutions'].map((tag, i) => (
            <FuTag key={tag} tone={i === 0 ? 'pink' : 'neutral'}>
              {tag}
            </FuTag>
          ))}
        </div>
        <FuLogoStrip logos={PARTNER_LOGOS} />
      </FuMarketingSection>

      <FuMarketingSection tone="default" title="Partnership means">
        <FuBulletList items={PARTNERSHIP_MEANS} />
      </FuMarketingSection>

      <FuMarketingSection tone="surface" title="Why teams partner with MissOut">
        <FuBulletList items={WHY_PARTNER} />
      </FuMarketingSection>

      <FuCtaBand title="Partner with MissOut." primaryCta={<FuSitewideCtaPair size="lg" />} />
    </>
  )
}
