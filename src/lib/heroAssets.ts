/**
 * Hero imagery in `public/hero/`. Replace SVGs/PNGs; update paths if filenames change.
 */
export const HERO_ASSETS = {
  /** Bottom brand graphic / splash; scales with the section. */
  graphic: '/hero/background_graphic.svg',
  /** Pixel art clock for the launch countdown. */
  countdownClock: '/hero/Pixel/Solid/Clock.svg',
} as const

/** About hero decorative pixel graphic (`public/about_hero.svg`). */
export const ABOUT_HERO_ASSETS = {
  graphic: '/about_hero.svg',
  /** Intrinsic size from `about_hero.svg` viewBox (update if the asset changes). */
  graphicSize: { w: 1512, h: 520 },
} as const
