export const GET_STARTED_HREF = 'https://missout.in/onboarding'
export const GET_STARTED_LABEL = 'Get started'
export const REQUEST_DEMO_PATH = '/contact'
export const REQUEST_DEMO_LABEL = 'Request a demo'

export const SITE_LINKS = {
  home: '/',
  features: '/features',
  backstage: '/products/backstage',
  stage: '/products/stage',
  developers: '/developers',
  about: '/about',
  contact: '/contact',
  demo: '/demo',
} as const

export function featurePath(id: string) {
  return `/features/${id}`
}
