import { cn } from '../../lib/cn'
import { ARTIST_AVATAR, ARTIST_ASPECT } from '../../lib/brandAssets'
import type { MissoutAvatarSize } from '../../lib/avatars'

const ARTIST_ANIMATIONS = new Set(['idle', 'listening', 'happy', 'curious'])

const ARTIST_ANIMATION_ALIASES: Record<string, string> = {
  idle: 'idle',
  listening: 'listening',
  happy: 'happy',
  curious: 'curious',
  working: 'idle',
  thinking: 'curious',
  searching: 'curious',
  excited: 'happy',
}

export type MissoutArtistAvatarProps = {
  size?: MissoutAvatarSize | number
  animation?: string
  defaultAnimation?: string
  className?: string
  ariaLabel?: string
}

function resolveAnimation(animation?: string, defaultAnimation?: string) {
  const candidate = animation ?? defaultAnimation ?? 'happy'
  const aliased = ARTIST_ANIMATION_ALIASES[candidate] ?? candidate
  return ARTIST_ANIMATIONS.has(aliased) ? aliased : 'happy'
}

/** Artist illustration — animated marketing avatar from brand artwork. */
export function MissoutArtistAvatar({
  size = 'md',
  animation,
  defaultAnimation,
  className,
  ariaLabel = 'Artist',
}: MissoutArtistAvatarProps) {
  const height =
    typeof size === 'number'
      ? size
      : ({ xs: 48, sm: 80, md: 128, lg: 200, xl: 288, hero: 384 } as const)[size]
  const playback = resolveAnimation(animation, defaultAnimation)

  return (
    <img
      src={ARTIST_AVATAR.src}
      alt={ariaLabel}
      width={ARTIST_AVATAR.width}
      height={ARTIST_AVATAR.height}
      draggable={false}
      decoding="async"
      data-animation={playback}
      style={{ height, width: `calc(${height}px * (${ARTIST_ASPECT}))` }}
      className={cn('missout-coordinator-avatar block max-w-none shrink-0 object-contain', className)}
    />
  )
}
