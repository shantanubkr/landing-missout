import { usePageMeta } from '../hooks/usePageMeta'
import { useHashScroll } from '../hooks/useHashScroll'
import { BACKSTAGE_FEATURES_PAGE } from '../lib/backstageFeaturePages'
import {
  GET_STARTED_HREF,
  GET_STARTED_LABEL,
  REQUEST_DEMO_HREF,
  REQUEST_DEMO_LABEL,
} from '../lib/ctas'
import { cn } from '../lib/cn'
import {
  FuBody,
  FuButtonAnchor,
  FuButtonLink,
  FuContainer,
  FuCtaBand,
  FuDisplay,
  FuMoneyStallsProofSection,
  FuRecruitYourTeamSection,
  FuSendUpdatesSection,
  FuRunCheckInsSection,
  FuBuildPublishEventsSection,
  FuManageCommitteesSection,
  FuPageHero,
  FuSection,
} from '../components/findus'

const heroSecondaryCtaClass =
  'border-[var(--fu-ink)] bg-[var(--fu-canvas)] hover:border-[var(--fu-ink)] hover:bg-[var(--fu-surface)] sm:min-w-[11.5rem]'

const heroCtaClass = 'w-full sm:w-auto sm:min-w-[11.5rem]'

export function BackstageFeaturesPage() {
  usePageMeta({
    title: 'Backstage features',
    description:
      'Create and publish events, manage registrations and contingents, coordinate your team, collect payments, handle check-ins, send updates, and track everything in one place.',
  })

  useHashScroll(BACKSTAGE_FEATURES_PAGE)

  return (
    <>
      <FuPageHero
        id="overview"
        align="center"
        ctaRow
        className="scroll-mt-28 pb-6 sm:pb-8 lg:pb-10 max-lg:!py-12 lg:!py-28"
        title={
          <FuDisplay className="whitespace-nowrap text-[clamp(1.5rem,5vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.045em] sm:text-[clamp(2.5rem,6.8vw,4.75rem)]">
            What does backstage do?
          </FuDisplay>
        }
        subtitle={
          <FuBody className="mx-auto max-w-3xl text-base sm:text-lg">
            Create and publish events, manage registrations and contingents, coordinate your team,
            collect payments, handle check-ins, send updates, and track everything in one place.
          </FuBody>
        }
        primaryCta={
          <FuButtonAnchor
            href={GET_STARTED_HREF}
            variant="primary"
            size="lg"
            className={heroCtaClass}
          >
            {GET_STARTED_LABEL}
          </FuButtonAnchor>
        }
        secondaryCta={
          <FuButtonLink
            to={REQUEST_DEMO_HREF}
            variant="secondary"
            size="lg"
            className={cn(heroSecondaryCtaClass, heroCtaClass)}
          >
            {REQUEST_DEMO_LABEL}
          </FuButtonLink>
        }
      />

      <FuSection id="manage-committees" tone="default" padding="md" className="scroll-mt-28 max-lg:!py-10">
        <FuContainer>
          <FuManageCommitteesSection />
        </FuContainer>
      </FuSection>

      <FuSection id="build-publish" tone="default" padding="lg" className="scroll-mt-28 max-lg:!py-12">
        <FuContainer>
          <FuBuildPublishEventsSection />
        </FuContainer>
      </FuSection>

      <FuSection id="run-check-ins" tone="default" padding="lg" className="scroll-mt-28 max-lg:!py-12">
        <FuContainer>
          <FuRunCheckInsSection />
        </FuContainer>
      </FuSection>

      <FuSection id="send-updates" tone="default" padding="lg" className="scroll-mt-28 max-lg:!py-12">
        <FuContainer>
          <FuSendUpdatesSection />
        </FuContainer>
      </FuSection>

      <FuSection id="recruit-your-team" tone="default" padding="lg" className="scroll-mt-28 max-lg:!py-12">
        <FuContainer>
          <FuRecruitYourTeamSection />
        </FuContainer>
      </FuSection>

      <FuSection id="money-proof" tone="default" padding="lg" className="scroll-mt-28 max-lg:!py-12">
        <FuContainer>
          <FuMoneyStallsProofSection />
        </FuContainer>
      </FuSection>

      <FuCtaBand
        sparse
        tone="default"
        className="!border-t-0 !py-14 sm:!py-20"
        title="Ready to run your next event?"
        primaryCta={
          <FuButtonAnchor
            href={GET_STARTED_HREF}
            variant="primary"
            size="lg"
            className="sm:min-w-[11.5rem]"
          >
            {GET_STARTED_LABEL}
          </FuButtonAnchor>
        }
        secondaryCta={
          <FuButtonLink
            to={REQUEST_DEMO_HREF}
            variant="secondary"
            size="lg"
            className={heroSecondaryCtaClass}
          >
            {REQUEST_DEMO_LABEL}
          </FuButtonLink>
        }
      />
    </>
  )
}
