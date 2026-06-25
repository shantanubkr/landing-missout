/**
 * Partner colleges in the "Missout Partners" section.
 * Add logos under public/partner_fests/logos/ and set `logoFile` to the filename.
 * See public/partner_fests/README.md.
 */
export type PartnerCollege = {
  id: string
  college: string
  /** Filename inside public/partner_fests/logos/ */
  logoFile: string
}

/** @deprecated Use `PartnerCollege` — kept for existing imports */
export type PartnerFest = PartnerCollege

export const PARTNER_COLLEGES: readonly PartnerCollege[] = [
  {
    id: 'nmims',
    college: 'NMIMS',
    logoFile: 'nm_logo.webp',
  },
  {
    id: 'bits-design',
    college: 'BITS Design School',
    logoFile: 'bitsdesign_logo.webp',
  },
  {
    id: 'jai-hind',
    college: 'Jai Hind College',
    logoFile: 'jaihind_logo.webp',
  },
]

/** @deprecated Use `PARTNER_COLLEGES` — kept for existing imports */
export const PARTNER_FESTS = PARTNER_COLLEGES

export function partnerFestLogoPath(logoFile: string): string {
  return `/partner_fests/logos/${encodeURIComponent(logoFile)}`
}
