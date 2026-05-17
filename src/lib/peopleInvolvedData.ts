/**
 * Team cards — full art PNGs in `public/people/` (name/role/logo baked into the asset).
 * Set `portraitFile` to the filename (e.g. `Shantanu.png`).
 */
export type PeopleInvolvedMember = {
  id: string
  name: string
  /** Filename in `public/people/` */
  portraitFile?: string
}

/** Native pixel size of team card PNGs (all assets match). */
export const TEAM_CARD_PX_WIDTH = 504
export const TEAM_CARD_PX_HEIGHT = 630

export const PEOPLE_INVOLVED: readonly PeopleInvolvedMember[] = [
  { id: 'shantanu', name: 'Shantanu Borkar', portraitFile: 'Shantanu.png' },
  { id: 'aryan', name: 'Aryan Puri', portraitFile: 'Aryan.png' },
  { id: 'samarth', name: 'Samarth Saluja', portraitFile: 'Samarth.png' },
  { id: 'siddharth', name: 'Siddharth Saripalle', portraitFile: 'Siddharth.png' },
]

export function peoplePortraitPath(file: string): string {
  return `/people/${encodeURIComponent(file)}`
}

/** Members drawn behind the front card in the carousel stack (furthest → nearest). */
export function peopleStackBehind(activeIndex: number): readonly PeopleInvolvedMember[] {
  const n = PEOPLE_INVOLVED.length
  if (n <= 1) return []
  if (n === 2) {
    return [PEOPLE_INVOLVED[(activeIndex + 1) % 2]!]
  }
  return [
    PEOPLE_INVOLVED[(activeIndex - 2 + n) % n]!,
    PEOPLE_INVOLVED[(activeIndex - 1 + n) % n]!,
  ]
}
