import { BACKSTAGE_PRODUCT_SECTIONS, featureSectionHref } from './backstageFeaturePages'

/** Backstage feature sections on the unified `/features` page. */
export const BACKSTAGE_FEATURES = BACKSTAGE_PRODUCT_SECTIONS.map((section) => ({
  label: section.label,
  href: featureSectionHref(section.sectionId),
  sectionId: section.sectionId,
  accent: section.accent,
}))

export const PRIMARY_NAV = [
  { label: 'Stage', href: '/stage' },
  { label: 'About', href: '/about' },
  { label: 'Developers', href: '/developers' },
  { label: 'Contact', href: '/contact' },
] as const

/** Route prefixes for Backstage / Stage marketing pages. */
export const PRODUCT_ROUTE_PREFIXES = [
  '/features',
  '/stage',
] as const

export function isProductRoute(pathname: string): boolean {
  return PRODUCT_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}
