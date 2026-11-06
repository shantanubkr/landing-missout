import { SHOTS } from './assets'
import { featurePath } from './siteRoutes'

export type FeatureVisual = {
  src: string
  alt: string
  fit?: 'cover' | 'contain'
}

export type FeatureMoment = FeatureVisual & {
  title: string
  body: string
}

export type FeatureBreakItem = {
  title: string
  body: string
}

export type FeaturePageData = {
  id: string
  path: string
  eyebrow: string
  title: string
  lede: string
  hero: FeatureVisual
  moments: FeatureMoment[]
  band: {
    kicker: string
    title: string
    items: FeatureBreakItem[]
  }
}

export const FEATURE_PAGES: FeaturePageData[] = [
  {
    id: 'manage-committees',
    path: featurePath('manage-committees'),
    eyebrow: 'Backstage',
    title: 'Manage committees',
    lede: 'Departments, roles, and who can change what, before fest week starts.',
    hero: {
      src: SHOTS.ways.manageCommittees,
      alt: 'Departments list in Backstage',
    },
    moments: [
      {
        title: 'Who still needs a head',
        body: 'Empty seats show up in Needs attention.',
        src: SHOTS.backstageHome,
        alt: 'Backstage home',
      },
      {
        title: 'Access follows the department',
        body: 'Overview, registrations, schedule, and updates, per team.',
        src: SHOTS.ways.manageCommittees,
        alt: 'Departments list in Backstage',
      },
    ],
    band: {
      kicker: 'On the desk',
      title: 'How a committee sits',
      items: [
        { title: 'A named head', body: 'Every department has one, or the seat shows as empty.' },
        { title: 'Access by department', body: 'Access follows the department.' },
        { title: 'One list', body: 'Core, PR, Events, and Media in one place.' },
      ],
    },
  },
  {
    id: 'build-publish',
    path: featurePath('build-publish'),
    eyebrow: 'Backstage',
    title: 'Build & publish',
    lede: 'Festivals, events, and forms. Publish once; Stage picks it up.',
    hero: {
      src: SHOTS.ways.buildPublish,
      alt: 'Event builder in Backstage',
    },
    moments: [
      {
        title: 'One event, the whole desk',
        body: 'Registrations, payments, and the event page sit on the same record.',
        src: SHOTS.demo.makeEvent,
        alt: 'Make event in Backstage',
      },
      {
        title: 'Go live on Stage',
        body: 'Students see it on Stage the moment you publish, on their phone.',
        src: SHOTS.stageHome,
        alt: 'Stage, the student event site',
      },
    ],
    band: {
      kicker: 'From the builder',
      title: 'What you publish',
      items: [
        { title: 'The festival record', body: 'Dates, venues, and the events under them.' },
        { title: 'The public page', body: 'What students see, written next to the form.' },
        { title: 'Stage, same day', body: 'They open Stage on their phone and it is there.' },
      ],
    },
  },
  {
    id: 'run-check-ins',
    path: featurePath('run-check-ins'),
    eyebrow: 'Backstage',
    title: 'Run check-ins',
    lede: 'QR entry, walk-ins, and a live count of who is in the room.',
    hero: {
      src: SHOTS.demo.checkInUi,
      alt: 'Check-in on desktop and phone',
      fit: 'contain',
    },
    moments: [
      {
        title: 'Phone and desk, same list',
        body: 'Scan at the door. The guest list updates for everyone running the gate.',
        src: SHOTS.ways.runCheckIns,
        alt: 'Check-in in Backstage',
      },
      {
        title: 'Walk-ins at the door',
        body: 'Add a name at the door. It still counts toward the room.',
        src: SHOTS.demo.checkInDesk,
        alt: 'Check-in desk',
      },
    ],
    band: {
      kicker: 'At the gate',
      title: 'What happens at the door',
      items: [
        { title: 'The scan', body: 'QR on the phone. The name lights up on the desk.' },
        { title: 'The walk-in', body: 'Add them there. They still count toward the room.' },
        { title: 'The live count', body: 'Who is in the room, live.' },
      ],
    },
  },
  {
    id: 'send-updates',
    path: featurePath('send-updates'),
    eyebrow: 'Backstage',
    title: 'Send updates',
    lede: 'Tell participants and teams.',
    hero: {
      src: SHOTS.ways.sendUpdates,
      alt: 'Sending an update',
      fit: 'contain',
    },
    moments: [
      {
        title: 'The people who need it',
        body: 'Target a department, an event, or the people still pending.',
        src: SHOTS.demo.registrationsHub,
        alt: 'Registrations in Backstage',
      },
      {
        title: 'It shows up on Stage',
        body: 'Students see the message on Stage, on their phone.',
        src: SHOTS.stageHome,
        alt: 'Stage, the student event site',
      },
    ],
    band: {
      kicker: 'The message',
      title: 'Who gets the message',
      items: [
        { title: 'Who it is for', body: 'A department, an event, or the people still pending.' },
        { title: 'What they see', body: 'The thread they open on Stage.' },
        { title: 'When it lands', body: 'When you send it.' },
      ],
    },
  },
  {
    id: 'recruit-your-team',
    path: featurePath('recruit-your-team'),
    eyebrow: 'Backstage',
    title: 'Recruit your team',
    lede: 'Applications, reviews, and department assignments.',
    hero: {
      src: SHOTS.ways.recruit,
      alt: 'Recruitment in Backstage',
    },
    moments: [
      {
        title: 'They join a department',
        body: 'A new member lands in PR, Events, or Media.',
        src: SHOTS.ways.manageCommittees,
        alt: 'Departments list',
      },
      {
        title: 'Heads see their own queue',
        body: 'Reviews stay with the department that asked for the help.',
        src: SHOTS.ways.recruit,
        alt: 'Recruitment in Backstage',
      },
    ],
    band: {
      kicker: 'The intake',
      title: 'From apply to a department',
      items: [
        { title: 'The form', body: 'They apply once.' },
        { title: 'The review', body: 'The head who asked for help reads the queue.' },
        { title: 'The seat', body: 'They land in PR, Events, or Media, already named.' },
      ],
    },
  },
  {
    id: 'money-proof',
    path: featurePath('money-proof'),
    eyebrow: 'Backstage',
    title: 'Money, stalls & proof',
    lede: 'Payments, stalls, sponsors, and the report after.',
    hero: {
      src: SHOTS.ways.money,
      alt: 'Payments in Backstage',
    },
    moments: [
      {
        title: 'What came in, what is pending',
        body: 'Ticket money and stall dues on one list the treasurer can open.',
        src: SHOTS.demo.paymentsMoney,
        alt: 'Festival payments',
      },
      {
        title: 'Proof the committee can hand over',
        body: 'A record the committee can hand over after the fest.',
        src: SHOTS.demo.payments,
        alt: 'Payments report',
      },
    ],
    band: {
      kicker: 'The books',
      title: 'What the treasurer opens',
      items: [
        { title: 'What came in', body: 'Tickets and stall dues on one list.' },
        { title: 'What is due', body: 'What is still pending.' },
        { title: 'What you hand over', body: 'A record after the fest.' },
      ],
    },
  },
]

export function getFeaturePage(id: string | undefined) {
  return FEATURE_PAGES.find((page) => page.id === id)
}

export function nextFeature(id: string) {
  const i = FEATURE_PAGES.findIndex((page) => page.id === id)
  if (i < 0) return FEATURE_PAGES[0]
  return FEATURE_PAGES[(i + 1) % FEATURE_PAGES.length]
}
