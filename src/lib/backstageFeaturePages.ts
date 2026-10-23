import type { FuBrandHue } from './design/findus'
import { HOME_FEATURE_CTA_ICONS, type BackstageFeatureKey } from './productAssets'

export type BackstageFeatureContent = {
  sectionId: string
  assetKey: BackstageFeatureKey
  featureLabel: string
  title: string
  subtitle: string
  mess?: string
  changes: string
  audience?: readonly string[]
  flag?: string
  ctaLabel: string
  accent: FuBrandHue
  metaDescription: string
}

export const BACKSTAGE_FEATURES_PAGE = '/features' as const

export function featureSectionHref(sectionId: string): string {
  return `${BACKSTAGE_FEATURES_PAGE}#${sectionId}`
}

export const BACKSTAGE_FEATURE_ROUTES = {
  events: featureSectionHref('build-publish'),
  registrations: featureSectionHref('build-publish'),
  checkIn: featureSectionHref('run-check-ins'),
  teamAccess: featureSectionHref('manage-committees'),
  updatesMedia: featureSectionHref('send-updates'),
  moneyProof: featureSectionHref('money-proof'),
} as const

/** Sections on the unified `/features` product page. */
export const BACKSTAGE_PRODUCT_SECTIONS = [
  {
    sectionId: 'manage-committees',
    label: 'Manage committees',
    subtitle:
      'Create departments, assign heads and volunteers, define responsibilities, and organize your committee from one place.',
    accent: 'pink',
    iconKey: 'teamAccess',
    ctaIcon: 'departments',
  },
  {
    sectionId: 'build-publish',
    label: 'Build & publish',
    subtitle:
      'Create festivals, competitions, performances, and workshops, set up details and registration forms, and publish when ready.',
    accent: 'blue',
    iconKey: 'events',
    ctaIcon: 'yourEvents',
  },
  {
    sectionId: 'run-check-ins',
    label: 'Run check-ins',
    subtitle:
      'Scan attendees, handle walk-ins and guests, track attendance, and see who is checked in as your event runs.',
    accent: 'lime',
    iconKey: 'checkIn',
    ctaIcon: 'registrations',
  },
  {
    sectionId: 'send-updates',
    label: 'Send updates',
    subtitle:
      'Send targeted updates to participants, accepted recruits, rejected applicants, and your teams without chasing people across WhatsApp.',
    accent: 'pink',
    iconKey: 'updatesMedia',
    ctaIcon: 'updates',
  },
  {
    sectionId: 'recruit-your-team',
    label: 'Recruit your team',
    subtitle:
      'Open recruitment cycles, collect applications, review candidates, assign departments, and build your team from one place.',
    accent: 'blue',
    iconKey: 'registrations',
    ctaIcon: 'registrations',
  },
  {
    sectionId: 'money-proof',
    label: 'Money, stalls & proof',
    subtitle:
      'Commercial side next to ops, then participation/outcomes without three spreadsheet exports.',
    accent: 'lime',
    iconKey: 'moneyProof',
    ctaIcon: 'lotMore',
  },
] as const satisfies ReadonlyArray<{
  sectionId: string
  label: string
  subtitle: string
  accent: FuBrandHue
  iconKey: BackstageFeatureKey
  ctaIcon: keyof typeof HOME_FEATURE_CTA_ICONS
}>

export const EVENTS_PAGE: BackstageFeatureContent = {
  sectionId: 'events',
  assetKey: 'events',
  featureLabel: 'Events',
  title: 'One system for the whole fest, not a folder of links.',
  subtitle:
    'Create festivals, child events, and standalones in Backstage. Keep schedules, details, and ownership connected so the fest doesn’t live in twelve chats and a shared drive.',
  mess: 'Event info shouldn’t be a scavenger hunt. Docs, slides, “final_final_v3” sheets; child events drift; nobody knows which link is current.',
  changes:
    'Plan the fest as one connected structure: festivals + child events, standalones, schedules & details, clear ownership, publish when ready, fits big and small.',
  audience: ['Fest & committee organisers', 'Dept teams', 'College core'],
  ctaLabel: 'Put your fest structure in one place.',
  accent: 'pink',
  metaDescription:
    'Plan festivals, child events, and standalones in one connected Backstage structure.',
}

export const REGISTRATIONS_PAGE: BackstageFeatureContent = {
  sectionId: 'registrations',
  assetKey: 'registrations',
  featureLabel: 'Registrations & Contingents',
  title: 'Registrations that don’t spill into five tools.',
  subtitle:
    'Custom forms, individual and team signups, approvals, and visiting contingents, tracked in Backstage so the list at the gate matches signup.',
  mess: 'Forms were never built to run a fest. Teams in DMs, contingents in Excel, approvals in WhatsApp.',
  changes:
    'Custom forms · individual & team · approvals/waitlists/deadlines · exports · contingents/institute codes · a list check-in can trust. (Org join = Team & access, not this page.)',
  ctaLabel: 'Close the Forms tab.',
  accent: 'blue',
  metaDescription:
    'Custom registration forms, teams, approvals, and contingents: one list check-in can trust.',
}

export const CHECK_IN_PAGE: BackstageFeatureContent = {
  sectionId: 'check-in',
  assetKey: 'checkIn',
  featureLabel: 'Check-in',
  title: 'The gate should match the list.',
  subtitle:
    'QR-based entry and digital passes tied to real registrations, not a printed sheet from last night.',
  mess: 'Clipboard check-in breaks under fest volume.',
  changes:
    'QR/digital passes · fast gate flow · tied to registration status · fewer clipboard surprises · same system as signup.',
  ctaLabel: 'Make the gate boring (in a good way).',
  accent: 'lime',
  metaDescription:
    'QR-based check-in and digital passes tied to real registrations, not a clipboard at the gate.',
}

export const TEAM_ACCESS_PAGE: BackstageFeatureContent = {
  sectionId: 'team-access',
  assetKey: 'teamAccess',
  featureLabel: 'Team & Access',
  title: 'The right people, with the right access, not everyone as admin.',
  subtitle: 'Build your fest team, recruit volunteers, give each role only what they need.',
  mess: 'Shared logins or everyone as admin.',
  changes:
    'Plain-language access · oversight vs operations · committees & departments · recruitment · scoped work. (Say “roles & access,” not “RBAC.”)',
  ctaLabel: 'Stop running the fest on shared passwords.',
  accent: 'blue',
  metaDescription:
    'Fest teams, volunteers, and plain-language roles & access, not shared admin logins.',
}

export const UPDATES_MEDIA_PAGE: BackstageFeatureContent = {
  sectionId: 'updates-media',
  assetKey: 'updatesMedia',
  featureLabel: 'Updates & Media',
  title: 'When plans change, attendees shouldn’t find out from a rumour.',
  subtitle: 'Send updates from Backstage and keep event media in one place.',
  mess: 'Official update is a story that expires; assets scattered.',
  changes:
    'Attendee updates · one version of the plan · central media · role-friendly for comms/media.',
  ctaLabel: 'Make the official channel obvious.',
  accent: 'pink',
  metaDescription:
    'Send attendee updates from Backstage and keep event media in one place.',
}

export const MONEY_PROOF_PAGE: BackstageFeatureContent = {
  sectionId: 'money-proof',
  assetKey: 'moneyProof',
  featureLabel: 'Money, Stalls & Proof',
  title: 'Paid events, stalls, sponsors, and a clear picture after.',
  subtitle:
    'Commercial side next to ops, then participation/outcomes without three spreadsheet exports.',
  flag: 'Confirm payments/ticketing depth before launch.',
  changes: 'Payments & ticketing · stalls & sponsors · participation signals · reports & exports.',
  ctaLabel: 'Know what the fest did, not just what it felt like.',
  accent: 'lime',
  metaDescription:
    'Payments, stalls, sponsors, and post-fest reporting: commercial ops next to the rest of Backstage.',
}

export const BACKSTAGE_FEATURE_PAGES = [
  EVENTS_PAGE,
  REGISTRATIONS_PAGE,
  CHECK_IN_PAGE,
  TEAM_ACCESS_PAGE,
  UPDATES_MEDIA_PAGE,
  MONEY_PROOF_PAGE,
] as const

/** Map legacy `/features/*` paths to section hashes on the unified page. */
export const LEGACY_FEATURE_PATH_TO_SECTION: Record<string, string> = {
  '/features/events': 'build-publish',
  '/features/registrations-contingents': 'build-publish',
  '/features/check-in': 'run-check-ins',
  '/features/team-access': 'manage-committees',
  '/features/updates-media': 'send-updates',
  '/features/money-proof': 'money-proof',
}
