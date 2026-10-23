import backstageGuide from '../assets/avatars/backstage-guide.avatar.json'
import contactHost from '../assets/avatars/contact-host.avatar.json'
import stageStudent from '../assets/avatars/stage-student.avatar.json'

/** Procedural avatar presets — authored with Bible Strong Avatar Lab (AGPL-3.0). */
export const MISSOUT_BIBLE_STRONG_AVATARS = {
  guide: backstageGuide,
  host: contactHost,
  student: stageStudent,
} as const

export type MissoutBibleStrongAvatarId = keyof typeof MISSOUT_BIBLE_STRONG_AVATARS

export type MissoutAvatarId =
  | MissoutBibleStrongAvatarId
  | 'star'
  | 'coordinator'
  | 'artist'
  | 'ticket'
  | 'studentMark'

export type MissoutAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero'

export const MISSOUT_AVATAR_SIZES: Record<MissoutAvatarSize, number> = {
  xs: 48,
  sm: 80,
  md: 128,
  lg: 200,
  xl: 288,
  hero: 384,
}

/** Default idle loops per marketing surface. */
export const MISSOUT_AVATAR_DEFAULTS: Record<
  MissoutAvatarId,
  { animation: string; label: string }
> = {
  guide: { animation: 'idle', label: 'Backstage guide' },
  host: { animation: 'listening', label: 'MissOut contact host' },
  student: { animation: 'curious', label: 'Stage student' },
  star: { animation: 'idle', label: 'MissOut star' },
  coordinator: { animation: 'listening', label: 'Event coordinator' },
  artist: { animation: 'happy', label: 'Artist' },
  ticket: { animation: 'happy', label: 'Admission ticket' },
  studentMark: { animation: 'happy', label: 'Stage student' },
}
