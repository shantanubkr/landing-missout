import { SHOTS } from './assets'

const V = '/landing-figma/videos'

/**
 * Home product demo tabs — screen rectangle cycles through Backstage flows.
 * Uses preview videos with posters; falls back to stills when motion is reduced.
 */

export type LandingDemoMedia =
  | { kind: 'placeholder'; alt: string; seed?: string }
  | { kind: 'image'; src: string; alt: string; object?: string; fit?: 'cover' | 'contain' }
  | {
      kind: 'video'
      src: string
      poster: string
      alt: string
      loop?: boolean
      muted?: boolean
      object?: string
      fit?: 'cover' | 'contain'
      /** Still shown when `prefers-reduced-motion: reduce` */
      staticSrc: string
    }

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
      kind: 'video',
      src: `${V}/make-event-preview.mp4`,
      poster: `${V}/make-event-preview-poster.png`,
      alt: 'Create a festival or event in Backstage — event chooser',
      loop: true,
      muted: true,
      object: 'left center',
      fit: 'cover',
      staticSrc: SHOTS.demo.makeEvent,
    },
  },
  {
    id: 'check-in',
    label: 'Check-In',
    media: {
      kind: 'video',
      src: `${V}/check-in-preview.mp4`,
      poster: `${V}/check-in-preview-poster.png`,
      alt: 'Check-in on desktop and phone — illustrative scan with genuine empty UI',
      loop: true,
      muted: true,
      object: 'left center',
      fit: 'cover',
      staticSrc: SHOTS.demo.checkInUi,
    },
  },
  {
    id: 'registrations',
    label: 'Registrations',
    media: {
      kind: 'video',
      src: `${V}/registrations-preview.mp4`,
      poster: `${V}/registrations-preview-poster.png`,
      alt: 'Registrations in Backstage',
      loop: true,
      muted: true,
      object: 'left center',
      fit: 'cover',
      staticSrc: SHOTS.demo.registrations,
    },
  },
  {
    id: 'contingents',
    label: 'Contingents',
    media: {
      kind: 'video',
      src: `${V}/contingents-preview.mp4`,
      poster: `${V}/contingents-preview-poster.png`,
      alt: 'Contingents in Backstage',
      loop: true,
      muted: true,
      object: 'left center',
      fit: 'cover',
      staticSrc: SHOTS.demo.contingents,
    },
  },
  {
    id: 'payments',
    label: 'Payments',
    media: {
      kind: 'video',
      src: `${V}/payments-preview.mp4`,
      poster: `${V}/payments-preview-poster.png`,
      alt: 'Payments in Backstage',
      loop: true,
      muted: true,
      object: 'left center',
      fit: 'cover',
      staticSrc: SHOTS.demo.payments,
    },
  },
]

export const DEFAULT_LANDING_DEMO_TAB_ID = LANDING_PRODUCT_DEMO_TABS[0].id

export function getLandingDemoTab(id: string) {
  return LANDING_PRODUCT_DEMO_TABS.find((t) => t.id === id) ?? LANDING_PRODUCT_DEMO_TABS[0]
}
