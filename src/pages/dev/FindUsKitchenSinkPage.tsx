import { type ReactNode } from 'react'
import { usePageMeta } from '../../hooks/usePageMeta'
import {
  GET_STARTED_HREF,
  GET_STARTED_LABEL,
  REQUEST_DEMO_HREF,
  REQUEST_DEMO_LABEL,
} from '../../lib/ctas'
import { partnerLogoStripItems } from '../../lib/partnerFestsData'
import {
  BACKSTAGE_FEATURE_ROUTES,
  CHECK_IN_PAGE,
  EVENTS_PAGE,
} from '../../lib/backstageFeaturePages'
import {
  FuProductMockupCard,
  FuProductMockupFrame,
  FuProductMockupRenderer,
} from '../../components/product-mockups'
import {
  FuBody,
  FuButton,
  FuButtonAnchor,
  FuButtonLink,
  FuCard,
  FuContainer,
  FuCtaBand,
  FuDisplay,
  FuEyebrow,
  FuFaq,
  FuFeatureGrid,
  FuFeatureHero,
  FuFooter,
  FuLogoStrip,
  FuMeta,
  FuPageHeader,
  FuPageHero,
  FuProblemBlock,
  FuQuote,
  FuSection,
  FuTag,
  FuTimeline,
  FuTitle,
} from '../../components/findus'

const FEATURE_ITEMS = [
  {
    title: 'Events',
    body: 'Create festivals, competitions, workshops, and performances.',
    href: BACKSTAGE_FEATURE_ROUTES.events,
    tint: 'neutral' as const,
  },
  {
    title: 'Registrations & contingents',
    body: 'Forms, teams, capacity, and status in one place.',
    href: BACKSTAGE_FEATURE_ROUTES.registrations,
    tint: 'neutral' as const,
  },
  {
    title: 'Check-in',
    body: 'QR and live counts instead of clipboard chaos.',
    href: BACKSTAGE_FEATURE_ROUTES.checkIn,
    tint: CHECK_IN_PAGE.accent,
  },
  {
    title: 'Team & access',
    body: 'Roles and permissions for core, volunteers, departments.',
    href: BACKSTAGE_FEATURE_ROUTES.teamAccess,
    tint: 'neutral' as const,
  },
  {
    title: 'Updates & media',
    body: 'Send once, attendees read on Stage.',
    href: BACKSTAGE_FEATURE_ROUTES.updatesMedia,
    tint: 'neutral' as const,
  },
  {
    title: 'Money, stalls & proof',
    body: 'Payments, stalls, and sponsor reporting.',
    href: BACKSTAGE_FEATURE_ROUTES.moneyProof,
    tint: 'neutral' as const,
  },
]

function KitchenSinkBlock({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="border-b border-[var(--fu-hairline)] py-10">
      <FuContainer>
        <FuEyebrow tone="neutral" className="mb-2">
          Primitive
        </FuEyebrow>
        <FuTitle level="h2" className="mb-6">
          {title}
        </FuTitle>
        {children}
      </FuContainer>
    </div>
  )
}

/** Visual kitchen sink for FindUs design system review, not a production page. */
export function FindUsKitchenSinkPage() {
  usePageMeta({
    title: 'FindUs UI Kitchen Sink',
    description: 'FindUs marketing design system primitives and compositions.',
  })

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--fu-canvas)]">
      <FuPageHeader />

      <main>
        <FuPageHero
          eyebrow="Backstage for campus events"
          title="Campus events without the chaos."
          subtitle="MissOut Backstage is how festivals and campus teams run registrations, check-ins, updates, and day-of ops, in one place, with the right people in the right roles."
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
          micro="For fest committees, college core teams, and campus organisers."
          media={
            <FuCard variant="media" className="aspect-[4/3] flex items-center justify-center p-0">
              <FuMeta>PLACEHOLDER · Product frame</FuMeta>
            </FuCard>
          }
        />

        <FuSection tone="surface" padding="md">
          <FuContainer>
            <FuProblemBlock
              title="Sound familiar?"
              body="Most campus teams still stitch together forms, chats, and spreadsheets, then scramble on event day."
              chips={['Scattered tools', 'No clear ownership', 'Day-of scramble']}
            />
          </FuContainer>
        </FuSection>

        <FuSection tone="default" padding="md">
          <FuContainer>
            <FuTitle level="h2" className="mb-8">
              Lifecycle
            </FuTitle>
            <FuTimeline
              steps={[
                { title: 'Set up the fest' },
                { title: 'Open registrations' },
                { title: 'Run the day' },
                { title: 'See what happened' },
              ]}
            />
          </FuContainer>
        </FuSection>

        <FuSection tone="surface" padding="md">
          <FuContainer>
            <FuTitle level="h2" className="mb-8">
              Backstage features
            </FuTitle>
            <FuFeatureGrid items={FEATURE_ITEMS} columns={3} />
          </FuContainer>
        </FuSection>

        <FuFeatureHero
          featureLabel="Events"
          accent="blue"
          title="One system for the whole fest, not a folder of links."
          subtitle="Stand up typed events or full festivals without rebuilding your stack."
          mess="Details live in chats, decks, and five different forms."
          changes="One create path, publish when you're ready."
          audience={['Fest core', 'Society leads']}
          cta={
            <FuButtonAnchor href={GET_STARTED_HREF} variant="primary">
              {GET_STARTED_LABEL}
            </FuButtonAnchor>
          }
        />

        <FuSection tone="surface" padding="md">
          <FuContainer>
            <FuLogoStrip label="Missout Partners" logos={partnerLogoStripItems()} />
          </FuContainer>
        </FuSection>

        <FuSection tone="default" padding="md">
          <FuContainer width="narrow">
            <FuQuote
              quote="We stopped losing registrations in WhatsApp threads."
              name="Fest organiser"
              role="Core committee"
              org="PLACEHOLDER campus"
              accent="pink"
            />
          </FuContainer>
        </FuSection>

        <KitchenSinkBlock title="Product mockups (Phase 0)">
          <FuBody className="mb-8 max-w-2xl text-[var(--fu-ink-secondary)]">
            Coded UI mockups replace raster product screenshots. Review spill, crop, and accent
            layering here before wiring HomePage.
          </FuBody>
          <div className="grid gap-8 lg:grid-cols-2">
            <FuProductMockupCard
              eyebrow={EVENTS_PAGE.featureLabel}
              title="Festivals, child events, and standalones in one system."
              href={BACKSTAGE_FEATURE_ROUTES.events}
              variant="event-create"
            />
            <div className="rounded-[var(--fu-radius)] border border-[var(--fu-card-border)] bg-[var(--fu-surface)] p-6 sm:p-8">
              <FuMeta className="mb-2 normal-case">Frame only</FuMeta>
              <FuTitle level="h3" className="mb-5 text-xl leading-snug sm:text-2xl">
                Spill/crop shell without card chrome
              </FuTitle>
              <FuProductMockupFrame accents={[{ id: 'event-type-picker', placement: 'bottom-right', rotate: -3 }]}>
                <FuProductMockupRenderer variant="event-create" />
              </FuProductMockupFrame>
            </div>
          </div>
        </KitchenSinkBlock>

        <KitchenSinkBlock title="Buttons & tags (default)">
          <div className="flex flex-wrap gap-3">
            <FuButton variant="primary">Primary</FuButton>
            <FuButton variant="secondary">Secondary</FuButton>
            <FuButton variant="ghost">Ghost</FuButton>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <FuTag tone="neutral">Neutral</FuTag>
            <FuTag tone="blue">Blue accent</FuTag>
          </div>
        </KitchenSinkBlock>

        <KitchenSinkBlock title="Deprecated accents (do not use on pages)">
          <div className="flex flex-wrap gap-3">
            <FuButton variant="lime">Lime (deprecated)</FuButton>
            <FuButton variant="inverse" className="bg-[var(--fu-band-dark)]">
              Inverse on dark
            </FuButton>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FuCard variant="tint-blue">
              <FuTitle level="h3">Tint blue (deprecated)</FuTitle>
            </FuCard>
            <FuCard variant="solid-lime">
              <FuTitle level="h3">Solid lime (deprecated)</FuTitle>
            </FuCard>
            <FuCard variant="default">
              <FuTitle level="h3">Default (use this)</FuTitle>
            </FuCard>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <FuTag tone="pink">Pink accent</FuTag>
            <FuTag tone="lime">Lime accent</FuTag>
          </div>
        </KitchenSinkBlock>

        <KitchenSinkBlock title="Typography">
          <div className="flex flex-col gap-4">
            <FuDisplay>Polymath display / H1</FuDisplay>
            <FuTitle level="title">Title scale</FuTitle>
            <FuBody>Body copy at 17-18px desktop, 16px phone.</FuBody>
            <FuMeta>Meta / eyebrow scale, 13px minimum</FuMeta>
          </div>
        </KitchenSinkBlock>

        <FuSection tone="surface" padding="md">
          <FuContainer width="narrow">
            <FuFaq
              items={[
                {
                  id: 'what',
                  question: 'What is Missout?',
                  answer:
                    'Backstage for organisers. Stage for students to discover and register.',
                },
                {
                  id: 'who',
                  question: 'Who is it for?',
                  answer: 'Fest committees, college cores, and campus organisers.',
                },
              ]}
            />
          </FuContainer>
        </FuSection>

        <FuCtaBand
          title="Ready to run your next fest on Backstage?"
          body="Get started in minutes, or request a demo walkthrough."
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
      </main>

      <FuFooter tone="surface" />
    </div>
  )
}
