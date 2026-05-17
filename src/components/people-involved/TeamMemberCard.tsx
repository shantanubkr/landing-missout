import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import {
  TEAM_CARD_PX_HEIGHT,
  TEAM_CARD_PX_WIDTH,
  type PeopleInvolvedMember,
  peoplePortraitPath,
} from '../../lib/peopleInvolvedData'

/** Matches card PNG border radius vs design spec (27px). */
const TEAM_CARD_RADIUS_CLASS = 'rounded-[27px]'

/** Frame used on carousel faces — applied on the raster so nothing “fills” beyond its pixels. */
const deckFaceFrameClass = cn(
  TEAM_CARD_RADIUS_CLASS,
  'shadow-[0_10px_36px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.06]',
)

export function TeamMemberCard({
  member,
  className,
  variant = 'intrinsic',
}: {
  member: PeopleInvolvedMember
  className?: string
  /** `intrinsic`: natural PNG aspect, scales with container width (grid). `fill`: deck — raw PNG, no fill/crop shell. */
  variant?: 'intrinsic' | 'fill'
}) {
  /** Carousel stack: no inner “fill” container — image keeps 504×630 proportions from width only. */
  if (variant === 'fill') {
    if (!member.portraitFile) {
      return (
        <div
          className={cn(
            deckFaceFrameClass,
            'flex w-full items-center justify-center bg-gradient-to-b from-[#E6E6E6] to-[#D0D0D0]',
            className,
          )}
          style={{ aspectRatio: `${TEAM_CARD_PX_WIDTH} / ${TEAM_CARD_PX_HEIGHT}` }}
          aria-hidden
        >
          <span className="font-display text-4xl font-bold text-[#1A1A1A]/25 sm:text-5xl">
            {member.name.replace(/\s/g, '').charAt(0) || '—'}
          </span>
        </div>
      )
    }

    return (
      <img
        src={peoplePortraitPath(member.portraitFile)}
        alt={member.name}
        width={TEAM_CARD_PX_WIDTH}
        height={TEAM_CARD_PX_HEIGHT}
        className={cn(
          'block h-auto w-full max-w-full select-none',
          deckFaceFrameClass,
          className,
        )}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    )
  }

  /* Avoid overflow:hidden on the shell: border-radius + overflow clips the asset’s outer blue stroke. */
  const shell = (child: ReactNode) => (
    <div
      className={cn(
        TEAM_CARD_RADIUS_CLASS,
        'bg-white',
        'shadow-[0_10px_36px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.06]',
        'w-full',
        className,
      )}
    >
      {child}
    </div>
  )

  if (!member.portraitFile) {
    return shell(
      <div
        className={cn(
          'flex w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#E6E6E6] to-[#D0D0D0]',
          TEAM_CARD_RADIUS_CLASS,
        )}
        style={{ aspectRatio: `${TEAM_CARD_PX_WIDTH} / ${TEAM_CARD_PX_HEIGHT}` }}
        aria-hidden
      >
        <span className="font-display text-4xl font-bold text-[#1A1A1A]/25 sm:text-5xl">
          {member.name.replace(/\s/g, '').charAt(0) || '—'}
        </span>
      </div>,
    )
  }

  return shell(
    <img
      src={peoplePortraitPath(member.portraitFile)}
      alt={member.name}
      width={TEAM_CARD_PX_WIDTH}
      height={TEAM_CARD_PX_HEIGHT}
      className={cn(
        'block h-auto w-full max-w-full select-none',
        TEAM_CARD_RADIUS_CLASS,
      )}
      loading="lazy"
      decoding="async"
      draggable={false}
    />,
  )
}
