export const STAGE_APP = 'https://missout.in'
export const BACKSTAGE_ONBOARDING = 'https://missout.in/onboarding'
export const BACKSTAGE_ADMIN = 'https://missout.in/admin'
export const BOOK_DEMO_MAILTO = 'mailto:info@missout.in?subject=MissOut%20demo%20request'
export const BOOK_DEMO_WHATSAPP = 'https://wa.me/919717130609'
export const CONTACT_MAILTO = 'mailto:info@missout.in'

export type NavItem =
  | { label: string; href: string; external?: false }
  | { label: string; href: string; external: true }

export const NAV: NavItem[] = [
  { label: 'Products', href: '#product' },
  { label: 'Developers', href: '#developers' },
  { label: 'About', href: '#ecosystem' },
  { label: 'Contact', href: CONTACT_MAILTO, external: true },
]
