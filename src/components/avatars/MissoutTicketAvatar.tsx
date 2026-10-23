import { cn } from '../../lib/cn'
import { TICKET_AVATAR, TICKET_ASPECT } from '../../lib/brandAssets'
import type { MissoutAvatarSize } from '../../lib/avatars'

const TICKET_ANIMATIONS = new Set(['idle', 'listening', 'happy', 'curious'])

const TICKET_ANIMATION_ALIASES: Record<string, string> = {
  idle: 'idle',
  listening: 'listening',
  happy: 'happy',
  curious: 'curious',
  working: 'idle',
  thinking: 'curious',
  searching: 'curious',
  excited: 'happy',
}

const TICKET_WIDTHS: Record<MissoutAvatarSize, number> = {
  xs: 120,
  sm: 160,
  md: 220,
  lg: 300,
  xl: 380,
  hero: 480,
}

export type MissoutTicketAvatarProps = {
  size?: MissoutAvatarSize | number
  animation?: string
  defaultAnimation?: string
  className?: string
  ariaLabel?: string
}

function resolveAnimation(animation?: string, defaultAnimation?: string) {
  const candidate = animation ?? defaultAnimation ?? 'happy'
  const aliased = TICKET_ANIMATION_ALIASES[candidate] ?? candidate
  return TICKET_ANIMATIONS.has(aliased) ? aliased : 'happy'
}

/** Ticket illustration — animated marketing avatar from brand artwork. */
export function MissoutTicketAvatar({
  size = 'lg',
  animation,
  defaultAnimation,
  className,
  ariaLabel = 'Admission ticket',
}: MissoutTicketAvatarProps) {
  const width = typeof size === 'number' ? size : TICKET_WIDTHS[size]
  const playback = resolveAnimation(animation, defaultAnimation)

  return (
    <img
      src={TICKET_AVATAR.src}
      alt={ariaLabel}
      width={TICKET_AVATAR.width}
      height={TICKET_AVATAR.height}
      draggable={false}
      decoding="async"
      data-animation={playback}
      style={{ width, height: `calc(${width}px / (${TICKET_ASPECT}))` }}
      className={cn('missout-coordinator-avatar block max-w-none shrink-0 object-contain', className)}
    />
  )
}
