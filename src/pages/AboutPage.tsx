import { usePageMeta } from '../hooks/usePageMeta'
import { GET_STARTED_HREF, GET_STARTED_LABEL } from '../lib/ctas'
import {
  FuButtonAnchor,
  FuCtaBand,
  FuMarketingSection,
  FuPageHero,
  FuTag,
} from '../components/findus'

const WHO_TAGS = [
  'Fest & committee organisers',
  'College & institution teams',
  'Students',
] as const

const BELIEVE_TAGS = [
  'Campus-native',
  'Ops first on Find Us',
  'Clear roles',
  'Discovery needs solid ops',
] as const

export function AboutPage() {
  usePageMeta({
    title: 'About',
    description:
      'MissOut is built for the way campus events actually run: Backstage for organisers, Stage for students.',
  })

  return (
    <>
      <FuPageHero
        eyebrow="About MissOut"
        title="Built for the way campus events actually run."
        subtitle="College fest discovery and backstage operations: less tool-wrestling for organisers, less FOMO for students."
      />

      <FuMarketingSection
        tone="surface"
        eyebrow="Reason"
        body="Better infrastructure than Forms and group chats. Backstage for people who run events, Stage for people who attend."
      />

      <FuMarketingSection tone="default" eyebrow="Who">
        <div className="flex flex-wrap gap-2">
          {WHO_TAGS.map((tag, i) => (
            <FuTag key={tag} tone={i === 1 ? 'blue' : 'neutral'}>
              {tag}
            </FuTag>
          ))}
        </div>
      </FuMarketingSection>

      <FuMarketingSection tone="surface" eyebrow="Believe">
        <div className="flex flex-wrap gap-2">
          {BELIEVE_TAGS.map((tag) => (
            <FuTag key={tag} tone="neutral">
              {tag}
            </FuTag>
          ))}
        </div>
      </FuMarketingSection>

      <FuMarketingSection tone="default" eyebrow="Company" title="Built by Intrct Technologies." />

      <FuCtaBand
        title="Bring your next fest onto MissOut."
        primaryCta={
          <FuButtonAnchor href={GET_STARTED_HREF} variant="primary" size="lg">
            {GET_STARTED_LABEL}
          </FuButtonAnchor>
        }
      />
    </>
  )
}
