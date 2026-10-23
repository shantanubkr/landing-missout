export type Audience = 'organiser' | 'attendee' | 'community' | 'company'
export type ProductSurface = 'stage' | 'backstage'
export type HomeSurface = 'direct' | 'indirect'

export type EventCreateKind = 'event' | 'festival'

export type Capability = {
  id: string
  product: ProductSurface
  surface: HomeSurface
  audiences: Audience[]
  jobToBeDone: string
  organiserOutcome?: string
  replaces?: string[]
  subFeatures: string[]
  homeOrder?: number
  href: string
}

/** Event types under “Create event” (festival is a separate create path). */
export const EVENT_TYPES = [
  { id: 'competition', label: 'Competition' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'performance', label: 'Performance' },
  { id: 'seminar', label: 'Seminar' },
] as const

export const CREATE_PATHS: readonly {
  kind: EventCreateKind
  title: string
  blurb: string
  href: string
}[] = [
  {
    kind: 'event',
    title: 'Create Event',
    blurb:
      'Pick a type - competition, workshop, performance, seminar - then build the rest.',
    href: '/product/backstage#create-event',
  },
  {
    kind: 'festival',
    title: 'Host a Festival',
    blurb:
      'Its own path. Structure, child events, and heavier ops when you’re running something bigger.',
    href: '/product/backstage#create-festival',
  },
]

export const CAPABILITIES: readonly Capability[] = [
  {
    id: 'create',
    product: 'backstage',
    surface: 'direct',
    audiences: ['organiser'],
    jobToBeDone: 'Stand up an event or festival without rebuilding your stack each time.',
    subFeatures: [
      'Create event with typed templates',
      'Create festival as its own path',
      'Publish when you’re ready',
    ],
    homeOrder: 1,
    href: '/product/backstage#create',
  },
  {
    id: 'registrations',
    product: 'backstage',
    surface: 'direct',
    audiences: ['organiser'],
    jobToBeDone: 'Take registrations and teams in one place.',
    replaces: ['Google Forms', 'Spreadsheets'],
    subFeatures: ['Dynamic forms', 'Team / contingent flows', 'Status and capacity'],
    homeOrder: 2,
    href: '/product/backstage#registrations',
  },
  {
    id: 'check-in',
    product: 'backstage',
    surface: 'direct',
    audiences: ['organiser'],
    jobToBeDone: 'Check people in without the clipboard scramble.',
    replaces: ['Paper lists', 'Ad-hoc sheets'],
    subFeatures: ['QR check-in', 'Live counts', 'Door-ready flows'],
    homeOrder: 3,
    href: '/product/backstage#check-in',
  },
  {
    id: 'updates',
    product: 'backstage',
    surface: 'direct',
    audiences: ['organiser'],
    jobToBeDone: 'Send updates that reach everyone who signed up.',
    replaces: ['WhatsApp blasts', 'Instagram stories'],
    subFeatures: ['Targeted updates', 'History you can find', 'Attendee inbox on Stage'],
    organiserOutcome: 'People see changes on Stage - you send once from Backstage.',
    homeOrder: 4,
    href: '/product/backstage#updates',
  },
  {
    id: 'roles',
    product: 'backstage',
    surface: 'direct',
    audiences: ['organiser'],
    jobToBeDone: 'Give your team the right access.',
    subFeatures: ['Roles and permissions', 'Committee / org structure'],
    homeOrder: 5,
    href: '/product/backstage#roles',
  },
  {
    id: 'discovery',
    product: 'stage',
    surface: 'indirect',
    audiences: ['organiser', 'attendee'],
    jobToBeDone: 'Make your event findable.',
    organiserOutcome: 'When you publish on Backstage, people discover and join on Stage.',
    subFeatures: ['Browse and search', 'Event pages', 'Register and track'],
    homeOrder: 6,
    href: '/product/stage',
  },
]

export function homeDirectCapabilities() {
  return CAPABILITIES.filter((c) => c.surface === 'direct' && c.homeOrder != null).sort(
    (a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0),
  )
}

export function homeIndirectCapabilities() {
  return CAPABILITIES.filter((c) => c.surface === 'indirect')
}
