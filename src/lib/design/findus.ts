/**
 * FindUs marketing design tokens — source of truth for hex values.
 * Geometry (radius, borders, elevation) synced with missout-v2 Backstage admin tokens.
 * CSS custom properties are declared in `findus.css` (keep in sync).
 * Do not use ad-hoc hex in components; reference `fu*` tokens or CSS vars.
 */

export const FU_BRAND = {
  blue: '#006AFE',
  pink: '#F92C99',
  lime: '#CCFF24',
} as const

export const FU_NEUTRAL = {
  canvas: '#FFFFFF',
  surface: '#F7F7F5',
  surfaceElevated: '#FFFFFF',
  ink: '#000000',
  inkSecondary: '#3D3D3D',
  inkMuted: '#6B6B6B',
  inkSubtle: '#8A8A8A',
  hairline: 'rgb(0 0 0 / 0.08)',
  hairlineStrong: 'rgb(0 0 0 / 0.12)',
  cardBorder: 'rgb(0 0 0 / 0.06)',
  cardBorderHover: 'rgb(0 0 0 / 0.12)',
  cardBorderWidth: '1px',
} as const

export const FU_BAND = {
  dark: '#0A0A0A',
  darkInk: '#FFFFFF',
  darkMuted: 'rgba(255, 255, 255, 0.72)',
  limeInk: '#000000',
} as const

export type FuBrandHue = keyof typeof FU_BRAND
export type FuTintLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type FuShadeLevel = FuTintLevel

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '')
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)))
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((n) => n.toString(16).padStart(2, '0'))
    .join('')}`
}

/** Mix two hex colors; `weight` 0 = a, 1 = b. */
export function fuMixHex(a: string, b: string, weight: number): string {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  const w = Math.max(0, Math.min(1, weight))
  return rgbToHex(
    ca.r + (cb.r - ca.r) * w,
    ca.g + (cb.g - ca.g) * w,
    ca.b + (cb.b - ca.b) * w,
  )
}

function buildBrandScale(base: string) {
  const tints = {} as Record<FuTintLevel, string>
  const shades = {} as Record<FuShadeLevel, string>
  /** tint0 = softest fill; tint10 = full brand. */
  for (let i = 0; i <= 10; i += 1) {
    tints[i as FuTintLevel] = fuMixHex(FU_NEUTRAL.canvas, base, 0.05 + i * 0.095)
  }
  shades[0] = base
  for (let i = 1; i <= 10; i += 1) {
    shades[i as FuShadeLevel] = fuMixHex(base, FU_NEUTRAL.ink, i / 12)
  }
  return { tints, shades }
}

export const FU_BRAND_SCALES = {
  blue: buildBrandScale(FU_BRAND.blue),
  pink: buildBrandScale(FU_BRAND.pink),
  lime: buildBrandScale(FU_BRAND.lime),
} as const

/** Soft card / section fills (tint 1–2). */
export const FU_TINT_SOFT = {
  blue: FU_BRAND_SCALES.blue.tints[1],
  pink: FU_BRAND_SCALES.pink.tints[1],
  lime: FU_BRAND_SCALES.lime.tints[1],
} as const

/**
 * Corner radius — synced with missout-v2 Backstage (`--bs-radius-*`, `globals.css`).
 * Default surfaces use 12px; nested controls use 8px / 6px icon wells.
 */
export const FU_RADIUS = {
  NONE: 0,
  XS: 4,
  SM: 6,
  MD: 8,
  /** Panels, cards, buttons, inputs, chips — `bs-radius-chip` */
  DEFAULT: 12,
  LG: 12,
  XL: 16,
  XXL: 20,
  ICON_WELL_XS: 6,
  ICON_WELL_SM: 8,
  ICON_WELL_MD: 10,
  PILL: 9999,
} as const

/** Tailwind class helpers — prefer CSS vars over hardcoded px. */
export const fuRadius = 'rounded-[var(--fu-radius)]'
export const fuRadiusSm = 'rounded-[var(--fu-radius-sm)]'
export const fuRadiusXs = 'rounded-[var(--fu-radius-xs)]'

export const FU_SPACING = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  16: 64,
  24: 96,
  30: 120,
} as const

export type FuSectionPadding = 'sm' | 'md' | 'lg' | 'xl' | 'hero'

export const FU_SECTION_PADDING: Record<
  FuSectionPadding,
  { phone: string; desktop: string }
> = {
  sm: { phone: 'py-12', desktop: 'sm:py-16' },
  md: { phone: 'py-16', desktop: 'sm:py-24' },
  lg: { phone: 'py-16', desktop: 'sm:py-28' },
  xl: { phone: 'py-20', desktop: 'sm:py-32 lg:py-[8.75rem]' },
  hero: { phone: 'py-16', desktop: 'sm:py-[8.75rem]' },
}

export const FU_CONTAINER = {
  default: 1160,
  narrow: 720,
  wide: 1280,
  gutterPhone: 16,
  gutterDesktop: 24,
} as const

export type FuContainerWidth = 'default' | 'narrow' | 'wide'

export const FU_CONTAINER_CLASS: Record<FuContainerWidth, string> = {
  default: 'max-w-[1160px]',
  narrow: 'max-w-[720px]',
  wide: 'max-w-[1280px]',
}

export const FU_BREAKPOINTS = {
  phone: 390,
  desktop: 1280,
} as const

export const FU_MOTION = {
  ui: 'duration-150',
  uiMs: 150,
  enter: 'duration-[300ms]',
  enterMs: 300,
  hoverLift:
    'motion-safe:transition-[transform,box-shadow,border-color,background-color] motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:-translate-y-0.5',
  chipPress: 'active:scale-[0.995]',
} as const

export const FU_ELEVATION = {
  card:
    'border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)]',
  cardHover:
    'motion-safe:hover:border-[var(--fu-card-border-hover)] motion-safe:hover:shadow-[var(--fu-shadow-soft)]',
  media: 'shadow-[var(--fu-shadow-media)]',
} as const

/** CSS variable names — values live in findus.css */
export const fuVar = {
  brandBlue: 'var(--fu-brand-blue)',
  brandPink: 'var(--fu-brand-pink)',
  brandLime: 'var(--fu-brand-lime)',
  canvas: 'var(--fu-canvas)',
  surface: 'var(--fu-surface)',
  ink: 'var(--fu-ink)',
  inkSecondary: 'var(--fu-ink-secondary)',
  inkMuted: 'var(--fu-ink-muted)',
  inkSubtle: 'var(--fu-ink-subtle)',
  hairline: 'var(--fu-hairline)',
  hairlineStrong: 'var(--fu-hairline-strong)',
  cardBorder: 'var(--fu-card-border)',
  cardBorderHover: 'var(--fu-card-border-hover)',
  cardBorderWidth: 'var(--fu-card-border-width)',
  tintBlueSoft: 'var(--fu-tint-blue-soft)',
  tintPinkSoft: 'var(--fu-tint-pink-soft)',
  tintLimeSoft: 'var(--fu-tint-lime-soft)',
  washHero: 'var(--fu-wash-hero)',
  washCtaLime: 'var(--fu-wash-cta-lime)',
  washCtaDark: 'var(--fu-wash-cta-dark)',
  bandDark: 'var(--fu-band-dark)',
  radius: 'var(--fu-radius)',
  radiusSm: 'var(--fu-radius-sm)',
  radiusXs: 'var(--fu-radius-xs)',
  shadowSoft: 'var(--fu-shadow-soft)',
  shadowMedia: 'var(--fu-shadow-media)',
} as const

export type FuAccent = FuBrandHue | 'neutral'

export function fuAccentSoftBg(accent: FuAccent): string {
  switch (accent) {
    case 'blue':
      return 'bg-[var(--fu-tint-blue-soft)]'
    case 'pink':
      return 'bg-[var(--fu-tint-pink-soft)]'
    case 'lime':
      return 'bg-[var(--fu-tint-lime-soft)]'
    default:
      return 'bg-[var(--fu-surface)]'
  }
}

export function fuAccentSolidBg(accent: FuBrandHue): string {
  switch (accent) {
    case 'blue':
      return 'bg-[var(--fu-brand-blue)] text-white'
    case 'pink':
      return 'bg-[var(--fu-brand-pink)] text-white'
    case 'lime':
      return 'bg-[var(--fu-brand-lime)] text-[var(--fu-band-lime-ink)]'
  }
}
