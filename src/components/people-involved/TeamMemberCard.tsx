import { cn } from '../../lib/cn'
import {
  TEAM_CARD_PX_HEIGHT,
  TEAM_CARD_PX_WIDTH,
  type PeopleInvolvedMember,
  peoplePortraitPath,
} from '../../lib/peopleInvolvedData'

/** Full art PNG — name, role, frame, and shadow are baked into the asset; render as-is. */
export function TeamMemberCard({
  member,
  className,
}: {
  member: PeopleInvolvedMember
  className?: string
}) {
  if (!member.portraitFile) {
    return (
      <div
        className={cn(
          'flex w-full items-center justify-center bg-gradient-to-b from-[#E6E6E6] to-[#D0D0D0]',
          className,
        )}
        style={{ aspectRatio: `${TEAM_CARD_PX_WIDTH} / ${TEAM_CARD_PX_HEIGHT}` }}
        aria-hidden
      >
        <span className="font-display text-4xl font-bold text-[#1A1A1A]/25 sm:text-5xl">
          {member.name.replace(/\s/g, '').charAt(0) || '-'}
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
      className={cn('block h-auto w-full max-w-full select-none', className)}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )
}
