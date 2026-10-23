/** MissOut wordmark — keep dimensions in sync with `public/brand/missout_wordmark.svg`. */
export const MISSOUT_WORDMARK = {
  src: '/brand/missout_wordmark.svg',
  width: 130,
  height: 30,
} as const

export const MISSOUT_WORDMARK_ASPECT = `${MISSOUT_WORDMARK.width} / ${MISSOUT_WORDMARK.height}` as const

/** Outline star — keep dimensions in sync with `public/brand/missout_outline_star.svg`. */
export const MISSOUT_OUTLINE_STAR = {
  src: '/brand/missout_outline_star.svg',
  width: 718,
  height: 735,
} as const

/** Filled star mark — keep path in sync with `public/brand/missout_star.svg`. */
export const MISSOUT_STAR = {
  src: '/brand/missout_star.svg',
  width: 112,
  height: 127,
  path:
    'M81.4566 58.6154V68.3846H101.815V78.1538H112V97.6923H91.6358V87.9231H71.2717V107.462H61.0925V127H50.9075V87.9231H20.3642V97.6923H0V78.1538H20.3642V68.3846H30.5491V58.6154H20.3642V48.8462H10.1849V39.0769H0V29.3077H30.5491V39.0769H40.7283V29.3077H50.9075V0H61.0925V19.5385H71.2717V39.0769H81.4566V29.3077H112V39.0769H101.815V48.8462H91.6358V58.6154H81.4566Z',
} as const

export const MISSOUT_STAR_ASPECT = `${MISSOUT_STAR.width} / ${MISSOUT_STAR.height}` as const

/** Event coordinator mascot — keep in sync with `public/avatars/event-coordinator.webp`. */
export const EVENT_COORDINATOR_AVATAR = {
  src: '/avatars/event-coordinator.webp',
  width: 496,
  height: 536,
} as const

export const EVENT_COORDINATOR_ASPECT =
  `${EVENT_COORDINATOR_AVATAR.width} / ${EVENT_COORDINATOR_AVATAR.height}` as const

/** Artist mascot — keep in sync with `public/avatars/artist.webp`. */
export const ARTIST_AVATAR = {
  src: '/avatars/artist.webp',
  width: 517,
  height: 668,
} as const

export const ARTIST_ASPECT = `${ARTIST_AVATAR.width} / ${ARTIST_AVATAR.height}` as const

/** Ticket mascot — keep in sync with `public/avatars/ticket.webp`. */
export const TICKET_AVATAR = {
  src: '/avatars/ticket.webp',
  width: 936,
  height: 532,
} as const

export const TICKET_ASPECT = `${TICKET_AVATAR.width} / ${TICKET_AVATAR.height}` as const

/** Stage student mascot — keep in sync with `public/avatars/student-mark.svg`. */
export const STUDENT_MARK_AVATAR = {
  src: '/avatars/student-mark.svg',
  width: 549,
  height: 655,
} as const

export const STUDENT_MARK_ASPECT =
  `${STUDENT_MARK_AVATAR.width} / ${STUDENT_MARK_AVATAR.height}` as const
