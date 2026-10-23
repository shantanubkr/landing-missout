import type { MissoutAvatarId } from './avatars'

export type AvatarEyeProfile = {
  /** SVG pupils translate inside the star mark. */
  mode: 'svg' | 'parallax'
}

export const AVATAR_EYE_PROFILES: Partial<Record<MissoutAvatarId, AvatarEyeProfile>> = {
  star: { mode: 'svg' },
  coordinator: { mode: 'parallax' },
  artist: { mode: 'parallax' },
  studentMark: { mode: 'parallax' },
  ticket: { mode: 'parallax' },
}
