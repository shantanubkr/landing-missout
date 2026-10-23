import { cn } from '../../lib/cn'
import { STUDENT_MARK_AVATAR, STUDENT_MARK_ASPECT } from '../../lib/brandAssets'
import type { MissoutAvatarSize } from '../../lib/avatars'

const STUDENT_MARK_ANIMATIONS = new Set(['idle', 'listening', 'happy', 'curious'])

const STUDENT_MARK_ANIMATION_ALIASES: Record<string, string> = {
  idle: 'idle',
  listening: 'listening',
  happy: 'happy',
  curious: 'curious',
  working: 'idle',
  thinking: 'curious',
  searching: 'curious',
  excited: 'happy',
}

export type MissoutStudentMarkAvatarProps = {
  size?: MissoutAvatarSize | number
  animation?: string
  defaultAnimation?: string
  className?: string
  ariaLabel?: string
}

function resolveAnimation(animation?: string, defaultAnimation?: string) {
  const candidate = animation ?? defaultAnimation ?? 'happy'
  const aliased = STUDENT_MARK_ANIMATION_ALIASES[candidate] ?? candidate
  return STUDENT_MARK_ANIMATIONS.has(aliased) ? aliased : 'happy'
}

/** Stage student illustration — animated marketing avatar from brand artwork. */
export function MissoutStudentMarkAvatar({
  size = 'md',
  animation,
  defaultAnimation,
  className,
  ariaLabel = 'Stage student',
}: MissoutStudentMarkAvatarProps) {
  const height =
    typeof size === 'number'
      ? size
      : ({ xs: 48, sm: 80, md: 128, lg: 200, xl: 288, hero: 384 } as const)[size]
  const playback = resolveAnimation(animation, defaultAnimation)

  return (
    <img
      src={STUDENT_MARK_AVATAR.src}
      alt={ariaLabel}
      width={STUDENT_MARK_AVATAR.width}
      height={STUDENT_MARK_AVATAR.height}
      draggable={false}
      decoding="async"
      data-animation={playback}
      style={{ height, width: `calc(${height}px * (${STUDENT_MARK_ASPECT}))` }}
      className={cn('missout-coordinator-avatar block max-w-none shrink-0 object-contain', className)}
    />
  )
}
