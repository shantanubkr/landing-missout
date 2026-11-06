/** Subtle tints so placeholders read as blocks, not broken images. */
const TONES = [
  { bg: '#fff5fa', accent: '#f92c99' },
  { bg: '#f5f8ff', accent: '#5b7cfa' },
  { bg: '#f3fbf6', accent: '#2da86a' },
  { bg: '#fff8f0', accent: '#e8923a' },
  { bg: '#f6f3ff', accent: '#8b5cf6' },
  { bg: '#f0fafb', accent: '#0d9488' },
] as const

export function placeholderTone(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  return TONES[Math.abs(h) % TONES.length]
}

/** Slots with no uploaded asset yet — still show tinted placeholders. */
const PLACEHOLDER_SLOTS = new Set(['about-mission'])

/** Optional: force placeholder even when a src exists (broken / stock art). */
const PLACEHOLDER_SRC = new Set<string>([
  // e.g. `${DEMO}/registrations.png` — add paths here if a file should stay hidden
])

export function shouldUsePlaceholder(opts: { seed?: string; src?: string }): boolean {
  if (opts.seed && PLACEHOLDER_SLOTS.has(opts.seed)) return true
  if (opts.src && PLACEHOLDER_SRC.has(opts.src)) return true
  if (!opts.src) return true
  return false
}
