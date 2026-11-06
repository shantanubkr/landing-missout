import { SHOTS } from './assets'

/**
 * Home product demo tabs — swap media in the screen rectangle.
 * Tabs with uploaded art use `image`; others use `placeholder`.
 */

export type LandingDemoMedia =
  | { kind: 'placeholder'; alt: string; seed?: string }
  | { kind: 'image'; src: string; alt: string; object?: string; fit?: 'cover' | 'contain' }
  | { kind: 'video'; src: string; poster?: string; alt: string; loop?: boolean; muted?: boolean; object?: string; fit?: 'cover' | 'contain' }

export type LandingProductDemoTab = {
  id: string
  label: string
  media: LandingDemoMedia
}

export const LANDING_PRODUCT_DEMO_TABS: LandingProductDemoTab[] = [
  {
    id: 'make-event',
    label: 'Make event',
    media: {
      kind: 'image',
      src: SHOTS.demo.backstageHomeUi,
      alt: 'Backstage home dashboard',
      object: 'center',
      fit: 'contain',
    },
  },
  {
    id: 'check-in',
    label: 'Check-In',
    media: {
      kind: 'image',
      src: SHOTS.demo.checkInUi,
      alt: 'Backstage check-in on desktop and phone',
      object: 'center',
      fit: 'contain',
    },
  },
  {
    id: 'registrations',
    label: 'Registrations',
    media: { kind: 'placeholder', alt: 'Registrations screenshot', seed: 'registrations' },
  },
  {
    id: 'contingents',
    label: 'Contingents',
    media: { kind: 'placeholder', alt: 'Contingents screenshot', seed: 'contingents' },
  },
  {
    id: 'payments',
    label: 'Payments',
    media: { kind: 'placeholder', alt: 'Payments screenshot', seed: 'payments' },
  },
]

export const DEFAULT_LANDING_DEMO_TAB_ID = LANDING_PRODUCT_DEMO_TABS[0].id

export function getLandingDemoTab(id: string) {
  return LANDING_PRODUCT_DEMO_TABS.find((t) => t.id === id) ?? LANDING_PRODUCT_DEMO_TABS[0]
}
