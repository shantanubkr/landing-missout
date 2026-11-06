import { SHOTS } from './assets'
import { featurePath, SITE_LINKS } from './siteRoutes'

/** Product nav & page content. */

export const BACKSTAGE_SECTIONS = [
  {
    id: 'manage-committees',
    label: 'Manage committees',
    description: 'Departments, roles, and committee structure in one place.',
  },
  {
    id: 'build-publish',
    label: 'Build & publish',
    description: 'Festivals, events, registration forms, and publish flow.',
  },
  {
    id: 'run-check-ins',
    label: 'Run check-ins',
    description: 'QR entry, walk-ins, and live attendance.',
  },
  {
    id: 'send-updates',
    label: 'Send updates',
    description: 'Targeted announcements to participants and teams.',
  },
  {
    id: 'recruit-your-team',
    label: 'Recruit your team',
    description: 'Applications, reviews, and department assignments.',
  },
  {
    id: 'money-proof',
    label: 'Money, stalls & proof',
    description: 'Payments, stalls, sponsors, and reporting.',
  },
] as const

export const PRODUCTS_MENU_IMAGES = {
  backstage: SHOTS.menu.backstage,
  stage: SHOTS.menu.stage,
} as const

export const PRODUCTS_FEATURED = [
  {
    title: 'Backstage',
    description: 'Committee ops for events,\nregistrations, and check-in.',
    to: SITE_LINKS.backstage,
    image: PRODUCTS_MENU_IMAGES.backstage,
    imageAlt: 'Backstage admin dashboard',
  },
  {
    title: 'Stage',
    description: 'Fests, registration,\nand the day of, on your phone.',
    to: SITE_LINKS.stage,
    image: PRODUCTS_MENU_IMAGES.stage,
    imageAlt: 'Stage, the student event site',
  },
] as const

export type ProductsMenuLink = {
  label: string
  to: string
  description: string
  icon: 'committees' | 'publish' | 'checkin' | 'updates' | 'recruit' | 'money'
}

export const PRODUCTS_MENU_COLUMNS: { title: string; items: ProductsMenuLink[] }[] = [
  {
    title: 'Run the fest',
    items: [
      {
        label: 'Manage committees',
        to: featurePath('manage-committees'),
        description: 'Departments, roles, and access',
        icon: 'committees',
      },
      {
        label: 'Build & publish',
        to: featurePath('build-publish'),
        description: 'Events, forms, and go-live',
        icon: 'publish',
      },
      {
        label: 'Run check-ins',
        to: featurePath('run-check-ins'),
        description: 'QR entry and live attendance',
        icon: 'checkin',
      },
    ],
  },
  {
    title: 'Engage & prove',
    items: [
      {
        label: 'Send updates',
        to: featurePath('send-updates'),
        description: 'Announcements that reach attendees',
        icon: 'updates',
      },
      {
        label: 'Recruit your team',
        to: featurePath('recruit-your-team'),
        description: 'Applications and department hiring',
        icon: 'recruit',
      },
      {
        label: 'Money, stalls & proof',
        to: featurePath('money-proof'),
        description: 'Payments, stalls, and reporting',
        icon: 'money',
      },
    ],
  },
]

/** Flat list for mobile nav accordion. */
export const PRODUCTS_DROPDOWN_FLAT = [
  ...PRODUCTS_FEATURED.map((p) => ({ label: p.title, to: p.to })),
  ...BACKSTAGE_SECTIONS.map((s) => ({ label: s.label, to: featurePath(s.id) })),
  { label: 'All features', to: SITE_LINKS.features },
] as const
