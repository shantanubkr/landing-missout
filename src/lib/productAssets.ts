/**
 * Unified product screenshot registry.
 *
 * Folders under `public/product/` and `public/onboarding/`:
 * - `backstage/` - Backstage hero shots (light/dark)
 * - `stage/` - Stage hero shots
 * - `features/` - New per-feature light/dark PNGs
 * - `discover-bento/` - Legacy Stage / attendee-facing bento tiles
 * - `manage-bento/` - Legacy Backstage / ops bento tiles
 * - `onboarding/` - Backstage onboarding flow (light/dark steps 1-4)
 *
 * FindUs pages and legacy product sections should import from here, not hardcode paths.
 */

import { STAGE_CAPABILITY_ICONS } from './marketingIcons'

const BASE = '/product'
const ONBOARDING_BASE = '/onboarding'

/** Single screenshot with intrinsic pixel dimensions (sets layout aspect ratio). */
export type ImageAsset = {
  src: string
  width: number
  height: number
}

export type ThemedShot = {
  light: ImageAsset
  dark: ImageAsset
}

export type ProductShot = ImageAsset | ThemedShot

function img(src: string, width: number, height: number): ImageAsset {
  return { src, width, height }
}

/** Legacy discover bento (`public/product/discover-bento/`). Good for Stage + attendee flows. */
export const DISCOVER_BENTO = {
  missout: `${BASE}/discover-bento/1_missout.png`,
  locate: `${BASE}/discover-bento/2_locate.png`,
  ticketing: `${BASE}/discover-bento/3_ticketing.png`,
  ticketingDark: `${BASE}/discover-bento/3_ticketing_dark.png`,
  tagline: `${BASE}/discover-bento/4_tagline.png`,
  updates: `${BASE}/discover-bento/5_updates.png`,
  discover: `${BASE}/discover-bento/6_discover.png`,
  powered: `${BASE}/discover-bento/7_powered.png`,
  logo: `${BASE}/discover-bento/8_logo.png`,
} as const

/** Legacy manage bento (`public/product/manage-bento/`). Good for Backstage / ops flows. */
export const MANAGE_BENTO = {
  whole: `${BASE}/manage-bento/1_Your_whole.png`,
  pbac: `${BASE}/manage-bento/2_PBAC.png`,
  /** Slot 3 asset missing on disk — reuse whole-dashboard shot. */
  dashboard: `${BASE}/manage-bento/1_Your_whole.png`,
  metrics: `${BASE}/manage-bento/4_metrics.png`,
  activity: `${BASE}/manage-bento/5_activity_logs.png`,
  form: `${BASE}/manage-bento/6_form_builder.png`,
  backstage: `${BASE}/manage-bento/7_backstage_title.png`,
  manage: `${BASE}/manage-bento/8_manage_event.png`,
} as const

/** Sized discover-bento assets for components that need intrinsic ratios. */
export const DISCOVER_BENTO_IMAGES = {
  discover: img(DISCOVER_BENTO.discover, 1275, 1113),
  ticketing: {
    light: img(DISCOVER_BENTO.ticketing, 1416, 807),
    dark: img(DISCOVER_BENTO.ticketingDark, 1416, 807),
  },
  updates: img(DISCOVER_BENTO.updates, 1632, 807),
} as const

/** Sized manage-bento assets for components that need intrinsic ratios. */
export const MANAGE_BENTO_IMAGES = {
  whole: img(MANAGE_BENTO.whole, 1269, 423),
  pbac: img(MANAGE_BENTO.pbac, 1269, 1113),
  dashboard: img(MANAGE_BENTO.dashboard, 1269, 423),
  metrics: img(MANAGE_BENTO.metrics, 1184, 626),
  activity: img(MANAGE_BENTO.activity, 1632, 807),
  form: img(MANAGE_BENTO.form, 2069, 758),
  backstage: img(MANAGE_BENTO.backstage, 1198, 318),
  manage: img(MANAGE_BENTO.manage, 1198, 1125),
} as const

function themed(
  pathStem: string,
  light: { width: number; height: number },
  dark: { width: number; height: number },
): ThemedShot {
  return {
    light: img(`${BASE}/features/${pathStem}_light.png`, light.width, light.height),
    dark: img(`${BASE}/features/${pathStem}_dark.png`, dark.width, dark.height),
  }
}

/** Page-level hero previews — prefer new folders, fall back to legacy bento where needed. */
export const PRODUCT_HEROES = {
  backstage: {
    light: img(`${BASE}/backstage/home_hero.png`, 2302, 1328),
    dark: img(`${BASE}/backstage/backstage_hero_dark.png`, 3024, 1734),
  },
  stage: {
    light: img(DISCOVER_BENTO.discover, 1275, 1113),
    dark: img(`${BASE}/stage/stage_hero_dark.png`, 440, 1004),
  },
} as const satisfies Record<string, ThemedShot>

/** Stage iPhone mockup for home page bridge section. */
export const STAGE_IPHONE = img(`${BASE}/stage/stage_iphone.png`, 1105, 2458)

/** Backstage iPhone mockup — sticky headline band on home. */
export const BACKSTAGE_IPHONE = img(`${BASE}/backstage/backstage_iphone.png`, 1056, 2362)

/** Home “run the event” feature tiles (`public/product/home-run/`). */
export const HOME_RUN_EVENT_SCREENS = {
  createEvents: img(`${BASE}/home-run/create_events.png`, 1535, 874),
  lineUp: img(`${BASE}/home-run/line_up.png`, 1148, 874),
  enterBasics: img(`${BASE}/home-run/enter_basics.png`, 1390, 793),
} as const

/** Home feature quick-link icons (`public/product/home-ctas/`). */
export const HOME_FEATURE_CTA_ICONS = {
  yourEvents: img(`${BASE}/home-ctas/your_events.png`, 126, 126),
  registrations: img(`${BASE}/home-ctas/regis.png`, 126, 126),
  updates: img(`${BASE}/home-ctas/updates.png`, 126, 126),
  departments: img(`${BASE}/home-ctas/departments.png`, 126, 126),
  lotMore: img(`${BASE}/home-ctas/lotmore.png`, 126, 126),
} as const

/** Manage committees product band (`public/product/features/manage_committees.png`). */
export const MANAGE_COMMITTEES_SCREEN = img(
  `${BASE}/features/manage_committees.png`,
  2176,
  1424,
)

/** Build & publish events band (`public/product/features/`). */
export const BUILD_PUBLISH_EVENT_SCREENS = {
  review: img(`${BASE}/features/review.png`, 586, 892),
  eventPage: img(`${BASE}/features/event_page.png`, 1888, 892),
} as const

/** Run check-ins product band (`public/product/features/checkin_band.png`). */
export const CHECKIN_BAND_SCREEN = img(`${BASE}/features/checkin_band.png`, 764, 1340)

/** Send updates product band (`public/product/features/send_update_band.png`). */
export const SEND_UPDATE_BAND_SCREEN = img(`${BASE}/features/send_update_band.png`, 1352, 536)

/** Recruit your team product band (`public/product/features/`). */
export const RECRUIT_TEAM_SCREENS = {
  members: img(`${BASE}/features/recruit_members.png`, 710, 820),
  recruitment: img(`${BASE}/features/recruit_recruitment.png`, 1242, 816),
} as const

/** Drop-in replacements for removed `Stage.webp` / `backstage.webp` root assets. */
export const LEGACY_HERO_FALLBACKS = {
  stage: PRODUCT_HEROES.stage,
  backstage: PRODUCT_HEROES.backstage,
} as const

export type BackstageFeatureKey =
  | 'events'
  | 'registrations'
  | 'checkIn'
  | 'teamAccess'
  | 'updatesMedia'
  | 'moneyProof'

export type FeatureScreens = {
  primary: ProductShot
  secondary?: ProductShot
  primaryAlt: string
  secondaryAlt?: string
}

/**
 * Per-feature screenshots for `/features/*` pages.
 * New `features/` shots first; legacy bento fills gaps (e.g. money/ticketing, form builder).
 */
export const BACKSTAGE_FEATURE_SCREENS: Record<BackstageFeatureKey, FeatureScreens> = {
  events: {
    primary: themed('event_creation', { width: 2586, height: 1734 }, { width: 2500, height: 1660 }),
    secondary: themed('event_type_picker', { width: 2376, height: 1110 }, { width: 2376, height: 1108 }),
    primaryAlt: 'Creating a festival or event in Backstage',
    secondaryAlt: 'Choosing event type when setting up a fest',
  },
  registrations: {
    primary: themed('registrations', { width: 766, height: 1488 }, { width: 764, height: 1516 }),
    secondary: themed('update_channels', { width: 766, height: 814 }, { width: 760, height: 792 }),
    primaryAlt: 'Registration responses and status in Backstage',
    secondaryAlt: 'Update channels for registration and attendee comms',
  },
  checkIn: {
    primary: themed('checkin', { width: 764, height: 1412 }, { width: 764, height: 1412 }),
    secondary: themed('checkin_cta', { width: 1158, height: 206 }, { width: 1142, height: 204 }),
    primaryAlt: 'QR check-in at the gate',
    secondaryAlt: 'Scan QR, walk-in guest, and guest list actions at the gate',
  },
  teamAccess: {
    primary: themed('department_create', { width: 1188, height: 774 }, { width: 1188, height: 774 }),
    secondary: themed(
      'department_page',
      { width: 2886, height: 1336 },
      { width: 2850, height: 1324 },
    ),
    primaryAlt: 'Creating departments and committees with scoped access',
    secondaryAlt: 'Department overview with roles and volunteers',
  },
  updatesMedia: {
    primary: themed('send_update', { width: 1266, height: 1406 }, { width: 1266, height: 1406 }),
    secondary: themed('media', { width: 2874, height: 1686 }, { width: 2854, height: 1654 }),
    primaryAlt: 'Sending an official update to attendees',
    secondaryAlt: 'Event media library in Backstage',
  },
  moneyProof: {
    primary: DISCOVER_BENTO_IMAGES.ticketing,
    secondary: img(MANAGE_BENTO.metrics, 1184, 626),
    primaryAlt: 'Ticketing and paid events on Stage',
    secondaryAlt: 'Fest metrics and participation reporting',
  },
}

const HOME_FEATURES_BASE = `${BASE}/home-features`

/** Home page — “Everything you need to run the fest” feature modules. */
export const HOME_FEST_FEATURE_SCREENS = {
  events: {
    primary: {
      light: img(`${HOME_FEATURES_BASE}/events_light.png`, 2586, 1685),
      dark: img(`${HOME_FEATURES_BASE}/events_dark.png`, 2586, 1685),
    },
    primaryAlt: 'Creating and editing events in Backstage',
  },
  registrations: {
    primary: {
      light: img(`${HOME_FEATURES_BASE}/registrations_light.png`, 766, 471),
      dark: img(`${HOME_FEATURES_BASE}/registrations_dark.png`, 766, 467),
    },
    primaryAlt: 'Registration settings for a published festival',
  },
  checkIn: {
    primary: {
      light: img(`${HOME_FEATURES_BASE}/checkin_light.png`, 764, 1412),
      dark: img(`${HOME_FEATURES_BASE}/checkin_dark.png`, 764, 1412),
    },
    secondary: themed('checkin_cta', { width: 1158, height: 206 }, { width: 1142, height: 204 }),
    primaryAlt: 'QR check-in guest list in Backstage',
    secondaryAlt: 'Scan QR, walk-in guest, and guest list actions at the gate',
  },
} as const satisfies Record<string, FeatureScreens>

function themedOnboarding(step: 1 | 2 | 3 | 4): ThemedShot {
  const ratios = {
    1: {
      light: { width: 2584, height: 1062 },
      dark: { width: 2574, height: 1044 },
    },
    2: {
      light: { width: 1554, height: 752 },
      dark: { width: 1550, height: 674 },
    },
    3: {
      light: { width: 1488, height: 1610 },
      dark: { width: 1498, height: 1608 },
    },
    4: {
      light: { width: 1534, height: 1122 },
      dark: { width: 1500, height: 1112 },
    },
  } as const

  const ratio = ratios[step]
  return {
    light: img(`${ONBOARDING_BASE}/onboarding${step}_light.png`, ratio.light.width, ratio.light.height),
    dark: img(`${ONBOARDING_BASE}/onboarding${step}_dark.png`, ratio.dark.width, ratio.dark.height),
  }
}

/** Backstage onboarding flow (`public/onboarding/`). */
export const ONBOARDING_STEPS = [
  {
    step: 1,
    shot: themedOnboarding(1),
    alt: 'Choose how to get started on Backstage',
  },
  {
    step: 2,
    shot: themedOnboarding(2),
    alt: 'Set up your fest structure in Backstage',
  },
  {
    step: 3,
    shot: themedOnboarding(3),
    alt: 'Invite your committee and volunteers',
  },
  {
    step: 4,
    shot: themedOnboarding(4),
    alt: 'Publish and run your fest on Backstage',
  },
] as const

/** Stage capability cards on `/stage`. */
export const STAGE_CAPABILITY_SHOTS = [
  {
    label: 'Discover',
    tint: 'blue' as const,
    shot: img(DISCOVER_BENTO.discover, 1275, 1113),
    alt: 'Discover campus events on Stage',
    iconName: STAGE_CAPABILITY_ICONS.discover,
  },
  {
    label: 'Register',
    tint: 'pink' as const,
    shot: DISCOVER_BENTO_IMAGES.ticketing,
    alt: 'Register for events without form archaeology',
    iconName: STAGE_CAPABILITY_ICONS.register,
  },
  {
    label: 'Track',
    tint: 'lime' as const,
    shot: img(DISCOVER_BENTO.updates, 1632, 807),
    alt: 'Follow schedule and updates in one place',
    iconName: STAGE_CAPABILITY_ICONS.track,
  },
] as const

export function isThemedShot(shot: ProductShot): shot is ThemedShot {
  return 'light' in shot && 'dark' in shot
}

export function isImageAsset(shot: ProductShot): shot is ImageAsset {
  return 'src' in shot && 'width' in shot && 'height' in shot
}

export function resolveImageAsset(shot: ProductShot, theme: 'light' | 'dark' = 'light'): ImageAsset {
  return isThemedShot(shot) ? shot[theme] : shot
}

export function resolveShot(shot: ProductShot, theme: 'light' | 'dark' = 'light'): string {
  return resolveImageAsset(shot, theme).src
}
