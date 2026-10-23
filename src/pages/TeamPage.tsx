import { usePageMeta } from '../hooks/usePageMeta'
import { GET_STARTED_HREF, GET_STARTED_LABEL } from '../lib/ctas'
import { TEAM_MEMBERS } from '../lib/marketingPageContent'
import {
  FuButtonAnchor,
  FuButtonLink,
  FuCtaBand,
  FuMarketingSection,
  FuPageHero,
  FuPersonCard,
} from '../components/findus'

export function TeamPage() {
  usePageMeta({
    title: 'Team',
    description:
      'The people building MissOut: product, design, growth, and quality for campus events.',
  })

  const coFounders = TEAM_MEMBERS.filter((m) => m.group === 'co-founder')
  const team = TEAM_MEMBERS.filter((m) => m.group === 'team')

  return (
    <>
      <FuPageHero
        eyebrow="Team"
        title="The people building MissOut."
        subtitle="Product, design, growth, and quality for campus events that are easier to run and harder to miss."
      />

      <FuMarketingSection tone="surface" title="Co-founders">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coFounders.map((member) => (
            <FuPersonCard key={member.name} name={member.name} role={member.role} />
          ))}
        </div>
      </FuMarketingSection>

      <FuMarketingSection tone="default" title="Team">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <FuPersonCard key={member.name} name={member.name} role={member.role} />
          ))}
        </div>
      </FuMarketingSection>

      <FuCtaBand
        title="Want to build with us?"
        primaryCta={
          <FuButtonLink to="/contact" variant="primary" size="lg">
            Contact
          </FuButtonLink>
        }
        secondaryCta={
          <FuButtonAnchor href={GET_STARTED_HREF} variant="secondary" size="lg">
            {GET_STARTED_LABEL}
          </FuButtonAnchor>
        }
      />
    </>
  )
}
