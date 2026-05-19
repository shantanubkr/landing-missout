/**
 * Partner fests in the "Partnered fests" section.
 * Add logos under public/partner_fests/logos/ and set `logoFile` to the filename.
 * See public/partner_fests/README.md.
 */
export type PartnerFest = {
  id: string
  festName: string
  college: string
  /** Filename inside public/partner_fests/logos/ */
  logoFile: string
  /**
   * Use for logos that sit on a solid dark square (e.g. black); keeps them readable on the light card.
   */
  logoFrame?: 'dark'
}

export const PARTNER_FESTS: readonly PartnerFest[] = [
  {
    id: 'umang',
    festName: 'Umang',
    college: 'NMIMS',
    logoFile: 'umang_logo.jpg',
    logoFrame: 'dark',
  },
  {
    id: 'evo-bits-design',
    festName: 'Evo',
    college: 'BITS Design',
    logoFile: 'evo_logo.png',
  },
  {
    id: 'rangreza-bits-design',
    festName: 'Rangreza',
    college: 'BITS Design',
    logoFile: 'Rangreza_Logo.png',
  },
]

export function partnerFestLogoPath(logoFile: string): string {
  return `/partner_fests/logos/${encodeURIComponent(logoFile)}`
}
