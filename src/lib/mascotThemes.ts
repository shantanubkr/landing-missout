import { FU_BRAND, type FuBrandHue } from './design/findus'
import type { BackstageFeatureKey } from './productAssets'

export type MascotTheme = {
  bodyFill: string
  eyeFill: string
  animation: string
}

/** Star fill + idle motion keyed to section accent. */
export const MASCOT_BY_ACCENT: Record<FuBrandHue, MascotTheme> = {
  blue: { bodyFill: FU_BRAND.blue, eyeFill: '#111316', animation: 'idle' },
  pink: { bodyFill: FU_BRAND.pink, eyeFill: '#111316', animation: 'happy' },
  lime: { bodyFill: FU_BRAND.lime, eyeFill: '#111316', animation: 'curious' },
}

/** Per-feature motion on top of accent color (features scroll page). */
export const FEATURE_MASCOT_ANIMATION: Record<BackstageFeatureKey, string> = {
  events: 'working',
  registrations: 'listening',
  checkIn: 'excited',
  teamAccess: 'curious',
  updatesMedia: 'thinking',
  moneyProof: 'searching',
}

export function mascotThemeForAccent(accent: FuBrandHue, animation?: string): MascotTheme {
  const base = MASCOT_BY_ACCENT[accent]
  return animation ? { ...base, animation } : base
}

export function mascotThemeForFeature(
  accent: FuBrandHue,
  assetKey: BackstageFeatureKey,
): MascotTheme {
  return mascotThemeForAccent(accent, FEATURE_MASCOT_ANIMATION[assetKey])
}
