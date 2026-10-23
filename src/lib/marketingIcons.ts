import type { IconName } from '../components/icons'
import type { BackstageFeatureKey } from './productAssets'

/** Backstage feature pages → missout-v2 pixel icons. */
export const BACKSTAGE_FEATURE_ICONS: Record<BackstageFeatureKey, IconName> = {
  events: 'calender',
  registrations: 'receipt',
  checkIn: 'qr',
  teamAccess: 'users',
  updatesMedia: 'bell',
  moneyProof: 'bank',
}

export const STAGE_CAPABILITY_ICONS = {
  discover: 'search',
  register: 'receipt',
  track: 'bell',
} as const satisfies Record<string, IconName>
