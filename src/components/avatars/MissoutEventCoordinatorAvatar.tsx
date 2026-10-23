import { cn } from '../../lib/cn'
import { EVENT_COORDINATOR_AVATAR, EVENT_COORDINATOR_ASPECT } from '../../lib/brandAssets'
import type { MissoutAvatarSize } from '../../lib/avatars'

const COORDINATOR_ANIMATIONS = new Set(['idle', 'listening', 'happy', 'curious'])

const COORDINATOR_ANIMATION_ALIASES: Record<string, string> = {
  idle: 'idle',
  listening: 'listening',
  happy: 'happy',
  curious: 'curious',
  working: 'idle',
  thinking: 'curious',
  searching: 'curious',
  excited: 'happy',
}

export type MissoutEventCoordinatorAvatarProps = {
  size?: MissoutAvatarSize | number
  animation?: string
  defaultAnimation?: string
  className?: string
  ariaLabel?: string
}

function resolveAnimation(animation?: string, defaultAnimation?: string) {
  const candidate = animation ?? defaultAnimation ?? 'listening'
  const aliased = COORDINATOR_ANIMATION_ALIASES[candidate] ?? candidate
  return COORDINATOR_ANIMATIONS.has(aliased) ? aliased : 'listening'
}

/** Event coordinator illustration — animated marketing mascot from brand artwork. */
export function MissoutEventCoordinatorAvatar({
  size = 'md',
  animation,
  defaultAnimation,
  className,
  ariaLabel = 'Event coordinator',
}: MissoutEventCoordinatorAvatarProps) {
  const height =
    typeof size === 'number'
      ? size
      : ({ xs: 48, sm: 80, md: 128, lg: 200, xl: 288, hero: 384 } as const)[size]
  const playback = resolveAnimation(animation, defaultAnimation)

  return (
    <img
      src={EVENT_COORDINATOR_AVATAR.src}
      alt={ariaLabel}
      width={EVENT_COORDINATOR_AVATAR.width}
      height={EVENT_COORDINATOR_AVATAR.height}
      draggable={false}
      decoding="async"
      data-animation={playback}
      style={{ height, width: `calc(${height}px * (${EVENT_COORDINATOR_ASPECT}))` }}
      className={cn('missout-coordinator-avatar block max-w-none shrink-0 object-contain', className)}
    />
  )
}
