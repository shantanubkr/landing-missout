import { SHOTS } from './assets'
import { BOOK_DEMO_WHATSAPP, BACKSTAGE_ONBOARDING, STAGE_APP } from './links'
import { featurePath, SITE_LINKS } from './siteRoutes'

export type StoryTab = {
  id: string
  label: string
  caption: string
  src: string
  alt: string
  fit?: 'cover' | 'contain'
}

type LinkTo = { to?: string; href?: string }

export type FeatureCard = LinkTo & {
  title: string
  body: string
  cta: string
  src: string
  alt: string
}

export type TextCard = LinkTo & {
  title: string
  body: string
}

export type WalkItem = LinkTo & {
  title: string
  body: string
  cta: string
  src: string
  alt: string
}

export type ExploreCard = LinkTo & {
  title: string
  body: string
  src: string
  alt: string
}

export type ProductPageData = {
  name: string
  blurb: string
  primary: { label: string; href?: string; to?: string }
  secondary?: { label: string; href?: string; to?: string }
  storyLabel: string
  tabs: StoryTab[]
  featuresTitle: string
  features: FeatureCard[]
  toolsTitle: string
  tools: TextCard[]
  walkTitle: string
  walk: WalkItem[]
  stats: { value: number; suffix?: string; label: string }[]
  ctaTitle: string
  exploreTitle: string
  explore: ExploreCard[]
}

const STATS = [
  { value: 733, suffix: '+', label: 'students on Stage' },
  { value: 1, suffix: '+', label: 'active events' },
  { value: 2, label: 'products, one fest' },
] as const

export const BACKSTAGE_PAGE: ProductPageData = {
  name: 'Backstage',
  blurb: 'Registrations, check-ins, and day-of ops, on a desk or in a phone browser.',
  primary: { label: 'Get started', href: BACKSTAGE_ONBOARDING },
  secondary: { label: 'Book a demo', href: BOOK_DEMO_WHATSAPP },
  storyLabel: 'Backstage walkthrough',
  tabs: [
    {
      id: 'build',
      label: 'Build',
      caption: 'Publish the fest, then every event under it.',
      src: SHOTS.demo.makeEvent,
      alt: 'Create a festival or a single event in Backstage',
    },
    {
      id: 'register',
      label: 'Register',
      caption: 'Forms, contingents, and who is in.',
      src: SHOTS.demo.registrationsHub,
      alt: 'Registrations hub',
    },
    {
      id: 'check-in',
      label: 'Check in',
      caption: 'QR entry and walk-ins at the door, from a desk or a phone.',
      src: SHOTS.demo.checkInUi,
      alt: 'Check-in on desktop and phone',
      fit: 'contain',
    },
    {
      id: 'money',
      label: 'Money',
      caption: 'Tickets, stalls, and the money trail.',
      src: SHOTS.demo.paymentsMoney,
      alt: 'Festival payments',
    },
  ],
  featuresTitle: 'Keep the fest on one desk',
  features: [
    {
      title: 'Build & publish',
      body: 'Festivals, events, and forms. Publish once; Stage picks it up.',
      to: featurePath('build-publish'),
      cta: 'Explore events',
      src: SHOTS.ways.buildPublish,
      alt: 'Event builder in Backstage',
    },
    {
      title: 'Run check-ins',
      body: 'QR entry from a phone browser, walk-ins, and a live attendance count.',
      to: featurePath('run-check-ins'),
      cta: 'Explore check-ins',
      src: SHOTS.ways.runCheckIns,
      alt: 'Check-in in Backstage',
    },
    {
      title: 'Manage committees',
      body: 'Departments, roles, and who can change what.',
      to: featurePath('manage-committees'),
      cta: 'Explore committees',
      src: SHOTS.ways.manageCommittees,
      alt: 'Committee departments',
    },
    {
      title: 'Money, stalls & proof',
      body: 'Payments, stalls, sponsors, and the report after.',
      to: featurePath('money-proof'),
      cta: 'Explore payments',
      src: SHOTS.ways.money,
      alt: 'Payments in Backstage',
    },
  ],
  toolsTitle: 'What the committee uses',
  tools: [
    {
      title: 'Send updates',
      body: 'Tell participants and teams.',
      to: featurePath('send-updates'),
    },
    {
      title: 'Recruit your team',
      body: 'Applications, reviews, and department assignments.',
      to: featurePath('recruit-your-team'),
    },
    {
      title: 'Open Stage',
      body: 'Students see the fest you published, on their phone.',
      to: SITE_LINKS.stage,
    },
  ],
  walkTitle: 'How a fest week runs',
  walk: [
    {
      title: 'Publish the fest',
      body: 'Set up events and open the forms before anyone arrives.',
      cta: 'Explore events',
      to: featurePath('build-publish'),
      src: SHOTS.backstageHome,
      alt: 'Backstage home',
    },
    {
      title: 'Open the doors',
      body: 'Check people in from a phone at the gate.',
      cta: 'Explore check-ins',
      to: featurePath('run-check-ins'),
      src: SHOTS.ways.runCheckIns,
      alt: 'Check-in in Backstage',
    },
    {
      title: 'Close the books',
      body: 'Payments, stalls, and the numbers the committee keeps.',
      cta: 'Explore payments',
      to: featurePath('money-proof'),
      src: SHOTS.demo.paymentsMoney,
      alt: 'Festival payments',
    },
  ],
  stats: [...STATS],
  ctaTitle: 'Put the next fest on Backstage',
  exploreTitle: 'Explore more from MissOut',
  explore: [
    {
      title: 'Stage',
      body: 'The student site for the fest you publish, on their phone.',
      to: SITE_LINKS.stage,
      src: SHOTS.stageHome,
      alt: 'Stage, the student event site',
    },
    {
      title: 'All features',
      body: 'Every Backstage capability on one page.',
      to: SITE_LINKS.features,
      src: SHOTS.ways.sendUpdates,
      alt: 'Backstage features',
    },
  ],
}

export const STAGE_PAGE: ProductPageData = {
  name: 'Stage',
  blurb: 'Discover campus events, register, and show up on your phone.',
  primary: { label: 'Open Stage', href: STAGE_APP },
  secondary: { label: 'See Backstage', to: SITE_LINKS.backstage },
  storyLabel: 'Stage walkthrough',
  tabs: [
    {
      id: 'discover',
      label: 'Discover',
      caption: 'See what is on around campus, in a phone browser.',
      src: SHOTS.stageHome,
      alt: 'Stage, the student event site',
    },
    {
      id: 'check-in',
      label: 'Check in',
      caption: 'QR at the door. The desk checks you in from a phone too.',
      src: SHOTS.ways.runCheckIns,
      alt: 'Check-in in Backstage',
    },
  ],
  featuresTitle: 'On the day',
  features: [
    {
      title: 'Discover events',
      body: 'Festivals and one-off events, by campus and type.',
      href: STAGE_APP,
      cta: 'Open Stage',
      src: SHOTS.stageHome,
      alt: 'Stage, the student event site',
    },
    {
      title: 'Carry it on your phone',
      body: 'Your events and ticket, in a phone browser.',
      href: STAGE_APP,
      cta: 'Open Stage',
      src: SHOTS.stageHome,
      alt: 'Stage, the student event site',
    },
    {
      title: 'Get updates',
      body: 'The committee writes in Backstage. It lands here.',
      to: featurePath('send-updates'),
      cta: 'Explore updates',
      src: SHOTS.ways.sendUpdates,
      alt: 'Updates',
    },
    {
      title: 'Check in',
      body: 'A QR at the door. The gate runs from a phone browser too.',
      to: featurePath('run-check-ins'),
      cta: 'Explore check-ins',
      src: SHOTS.ways.runCheckIns,
      alt: 'Check-in in Backstage',
    },
  ],
  toolsTitle: 'From the listing to the door',
  tools: [
    {
      title: 'Find a fest',
      body: 'Campus, type, and what is live this week.',
      href: STAGE_APP,
    },
    {
      title: 'Register once',
      body: 'One form. Contingents stay together.',
      to: featurePath('build-publish'),
    },
    {
      title: 'Show up',
      body: 'The QR is the ticket. The desk does the rest.',
      to: featurePath('run-check-ins'),
    },
  ],
  walkTitle: 'How students use Stage',
  walk: [
    {
      title: 'Find what is on',
      body: 'Browse festivals and events the committee published.',
      cta: 'Open Stage',
      href: STAGE_APP,
      src: SHOTS.stageHome,
      alt: 'Stage, the student event site',
    },
    {
      title: 'Take it with you',
      body: 'The listing on your phone, with your ticket.',
      cta: 'Open Stage',
      href: STAGE_APP,
      src: SHOTS.stageHome,
      alt: 'Stage, the student event site',
    },
    {
      title: 'Hear from the desk',
      body: 'Room changes and call times, from Backstage.',
      cta: 'Explore updates',
      to: featurePath('send-updates'),
      src: SHOTS.ways.sendUpdates,
      alt: 'Updates',
    },
  ],
  stats: [...STATS],
  ctaTitle: 'Open Stage and find a fest',
  exploreTitle: 'Explore more from MissOut',
  explore: [
    {
      title: 'Backstage',
      body: 'The desk that publishes what you see here.',
      to: SITE_LINKS.backstage,
      src: SHOTS.backstageHome,
      alt: 'Backstage',
    },
    {
      title: 'All features',
      body: 'How the committee runs the fest behind Stage.',
      to: SITE_LINKS.features,
      src: SHOTS.ways.buildPublish,
      alt: 'Backstage features',
    },
  ],
}
