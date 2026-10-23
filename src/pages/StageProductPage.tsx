import { useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { ContactSection } from '../components/contact'
import { ButtonAnchor, ButtonLink } from '../components/ui'
import { PRODUCT_CREATE_HREF } from '../lib/productUrls'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { FeatureChapter, FeatureGrid, UseCaseRow } from '../components/product/FeatureLayouts'
import { StageFeedDemo } from '../components/home/StageFeedDemo'
import {
  EventPageDemo,
  RegisterDemo,
  UpdatesInboxDemo,
} from '../components/product/ProductUiDemos'
import {
  PRODUCT_HERO_STAGE_IMG,
  ProductGlassShell,
} from '../components/product/ProductGlassShell'

const USE_CASES = [
  {
    href: '#discovery',
    title: 'Get found on Stage',
    iconSrc: '/value_propositions/discover.svg',
    iconBg: 'bg-[#E8F1FF]',
  },
  {
    href: '#event-pages',
    title: 'Clear event pages',
    iconSrc: '/value_propositions/track.svg',
    iconBg: 'bg-[#FFF4E5]',
  },
  {
    href: '#register',
    title: 'Register in a few taps',
    iconSrc: '/value_propositions/register.svg',
    iconBg: 'bg-[#FDE8F3]',
  },
  {
    href: '#updates',
    title: 'Stay updated live',
    iconSrc: '/value_propositions/track.svg',
    iconBg: 'bg-[#E8F8EF]',
  },
  {
    href: '/product/backstage',
    title: 'Powered by Backstage',
    iconSrc: '/value_propositions/manage.svg',
    iconBg: 'bg-[#EEE8FF]',
  },
] as const

const GRID = [
  {
    title: 'Discovery',
    blurb: 'Browse, search, and surface what’s upcoming.',
    href: '#discovery',
  },
  {
    title: 'Event pages',
    blurb: 'Schedule, venue, and trust signals in one view.',
    href: '#event-pages',
  },
  {
    title: 'Register',
    blurb: 'Individual and team flows with confirmations.',
    href: '#register',
  },
  {
    title: 'Tickets & status',
    blurb: 'People know where they stand without chasing you.',
    href: '#register',
  },
  {
    title: 'Updates inbox',
    blurb: 'Changes you send from Backstage land here.',
    href: '#updates',
  },
  {
    title: 'My events',
    blurb: 'A personal list of what’s next.',
    href: '#discovery',
  },
] as const

export function StageProductPage() {
  const { hash } = useLocation()

  usePageMeta({
    title: 'Stage',
    description:
      'Stage is where people discover and join events you run on Missout Backstage.',
  })

  useLayoutEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <div>
      {/* Notion-style product hero */}
      <section className="bg-white px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
            <div>
              <p className="font-sans text-sm text-[#5A5A5A]">Missout for discovery</p>
              <h1 className="mt-2 text-balance font-sans text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl md:text-[3.25rem]">
                Where people find and join your event.
              </h1>
              <p className="mt-4 max-w-xl text-pretty font-sans text-base leading-relaxed text-[#5A5A5A] sm:text-lg">
                Stage is the attendee surface. You run the event in{' '}
                <Link
                  to="/product/backstage"
                  className="font-semibold text-[#006AFE] no-underline"
                >
                  Backstage
                </Link>
                . People discover, register, and get updates here.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3">
                <ButtonAnchor
                  href={PRODUCT_CREATE_HREF}
                  variant="primary"
                  theme="product"
                  size="lg"
                  className="!font-semibold"
                >
                  Let&apos;s create
                </ButtonAnchor>
                <ButtonLink
                  to="#contact"
                  variant="outline"
                  theme="product"
                  size="lg"
                  className="!font-semibold"
                >
                  Request a demo
                </ButtonLink>
              </div>
            </div>

            <ScrollReveal>
              <ProductGlassShell
                src={PRODUCT_HERO_STAGE_IMG}
                alt="Stage product preview"
                loading="eager"
              />
            </ScrollReveal>
          </div>

          <FeatureGrid items={GRID} />
        </div>
      </section>

      <UseCaseRow heading="See what Stage can do" items={USE_CASES} />

      <FeatureChapter
        id="discovery"
        title="Get discovered without Instagram archaeology."
        blurb="Upcoming feeds, search, and categories so your event shows up for people who weren’t already in the group chat."
      >
        <StageFeedDemo />
      </FeatureChapter>

      <FeatureChapter
        id="event-pages"
        title="One clear page for what you’re running."
        blurb="Schedule, venue, and trust signals in a single view. Register is right there when they’re ready."
        reverse
      >
        <EventPageDemo />
      </FeatureChapter>

      <FeatureChapter
        id="register"
        title="People join without hunting through forms and chats."
        blurb="Individual and team flows, status, and confirmations - so registration stops living in Google Forms."
      >
        <RegisterDemo />
      </FeatureChapter>

      <FeatureChapter
        id="updates"
        title="Changes reach everyone who signed up."
        blurb="You send once from Backstage. Attendees see it in their Stage inbox - venue moves, timing, reminders."
        reverse
      >
        <UpdatesInboxDemo />
      </FeatureChapter>

      <ContactSection accent="product" />
    </div>
  )
}
