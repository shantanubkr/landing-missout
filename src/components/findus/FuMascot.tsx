import { MissoutAvatar } from '../avatars'
import type { MissoutAvatarSize } from '../../lib/avatars'
import type { FuBrandHue } from '../../lib/design/findus'
import { MASCOT_BY_ACCENT } from '../../lib/mascotThemes'
import { cn } from '../../lib/cn'

export type FuMascotProps = {
  size?: MissoutAvatarSize
  animation?: string
  accent?: FuBrandHue
  bodyFill?: string
  eyeFill?: string
  framed?: boolean
  className?: string
  ariaLabel?: string
}

/** Site mascot — animated MissOut star with optional accent color and motion. */
export function FuMascot({
  size = 'md',
  animation,
  accent,
  bodyFill,
  eyeFill,
  framed = false,
  className,
  ariaLabel,
}: FuMascotProps) {
  const accentTheme = accent ? MASCOT_BY_ACCENT[accent] : null
  const resolvedAnimation = animation ?? accentTheme?.animation ?? 'idle'

  return (
    <MissoutAvatar
      size={size}
      framed={framed}
      defaultAnimation={resolvedAnimation}
      bodyFill={bodyFill ?? accentTheme?.bodyFill}
      eyeFill={eyeFill ?? accentTheme?.eyeFill}
      ariaLabel={ariaLabel}
      className={cn('shrink-0', className)}
    />
  )
}
