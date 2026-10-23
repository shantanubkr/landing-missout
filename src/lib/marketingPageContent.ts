import {
  CONTACT_EMAIL,
  GET_STARTED_HREF,
  GET_STARTED_LABEL,
  REQUEST_DEMO_HREF,
  REQUEST_DEMO_LABEL,
  REQUEST_DEMO_MAILTO,
  REQUEST_DEMO_PHONE,
  REQUEST_DEMO_WHATSAPP,
  STAGE_APP_HREF,
} from './ctas'

export const OPEN_STAGE_LABEL = 'Open Stage' as const
export const GET_BACKSTAGE_LABEL = 'Get Backstage' as const

export const STAGE_CAPABILITIES = [
  { label: 'Discover', tint: 'blue' as const },
  { label: 'Register', tint: 'pink' as const },
  { label: 'Track', tint: 'lime' as const },
] as const

export type TeamMember = {
  name: string
  role: string
  group: 'co-founder' | 'team'
}

export const TEAM_MEMBERS: readonly TeamMember[] = [
  { name: 'Shantanu Borkar', role: 'Co-founder · Product & Growth', group: 'co-founder' },
  { name: 'Samarth Saluja', role: 'Co-founder · Product & Design', group: 'co-founder' },
  { name: 'Aryan Puri', role: 'Co-founder · Marketing & Growth', group: 'co-founder' },
  { name: 'Aarav Srivastava', role: 'Product & Quality Testing', group: 'team' },
  { name: 'Oishik Pal', role: 'Design', group: 'team' },
  { name: 'Onkar Dwivedi', role: 'Marketing', group: 'team' },
] as const

export const CONTACT_CHANNELS = {
  email: CONTACT_EMAIL,
  mailto: REQUEST_DEMO_MAILTO,
  whatsapp: REQUEST_DEMO_WHATSAPP,
  phone: REQUEST_DEMO_PHONE,
  getStarted: GET_STARTED_HREF,
  getStartedLabel: GET_STARTED_LABEL,
  demoLabel: REQUEST_DEMO_LABEL,
  demoHref: REQUEST_DEMO_HREF,
  stage: STAGE_APP_HREF,
  openStageLabel: OPEN_STAGE_LABEL,
  getBackstageLabel: GET_BACKSTAGE_LABEL,
} as const
