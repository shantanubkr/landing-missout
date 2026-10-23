import type { ReactNode } from 'react'
import { createAvatar } from '@bible-strong/avatar-react'
import { cn } from '../../lib/cn'
import {
  MISSOUT_AVATAR_DEFAULTS,
  MISSOUT_AVATAR_SIZES,
  MISSOUT_BIBLE_STRONG_AVATARS,
  type MissoutAvatarId,
  type MissoutAvatarSize,
} from '../../lib/avatars'
import { AVATAR_EYE_PROFILES } from '../../lib/avatarEyeProfiles'
import { AvatarEyeFollowShell } from './AvatarEyeFollowShell'
import { MissoutStarAvatar } from './MissoutStarAvatar'
import { MissoutEventCoordinatorAvatar } from './MissoutEventCoordinatorAvatar'
import { MissoutArtistAvatar } from './MissoutArtistAvatar'
import { MissoutTicketAvatar } from './MissoutTicketAvatar'
import { MissoutStudentMarkAvatar } from './MissoutStudentMarkAvatar'

const AvatarGuide = createAvatar(MISSOUT_BIBLE_STRONG_AVATARS.guide)
const AvatarHost = createAvatar(MISSOUT_BIBLE_STRONG_AVATARS.host)
const AvatarStudent = createAvatar(MISSOUT_BIBLE_STRONG_AVATARS.student)

const avatarComponents = {
  guide: AvatarGuide,
  host: AvatarHost,
  student: AvatarStudent,
} as const

const framedSizeClass: Record<MissoutAvatarSize, string> = {
  xs: 'h-12 w-12',
  sm: 'h-[5.5rem] w-[5.5rem] sm:h-24 sm:w-24',
  md: 'h-32 w-32',
  lg: 'h-48 w-48',
  xl: 'h-64 w-64',
  hero: 'h-80 w-80 sm:h-96 sm:w-96',
}

export type MissoutAvatarProps = {
  avatar?: MissoutAvatarId
  size?: MissoutAvatarSize | number
  animation?: string
  expression?: string
  defaultAnimation?: string
  bodyFill?: string
  eyeFill?: string
  autoplay?: boolean
  framed?: boolean
  /** Eyes / head subtly track the cursor on fine pointers. */
  followEyes?: boolean
  className?: string
  ariaLabel?: string
}

function wrapWithEyeFollow(
  node: ReactNode,
  {
    avatar,
    size,
    framed,
    followEyes,
    className,
  }: {
    avatar: MissoutAvatarId
    size: MissoutAvatarSize | number
    framed: boolean
    followEyes: boolean
    className?: string
  },
) {
  const profile = AVATAR_EYE_PROFILES[avatar] ?? null

  const inner = framed ? (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border-2 border-[var(--fu-ink)] bg-[var(--fu-canvas)]',
        typeof size === 'string' ? framedSizeClass[size] : undefined,
        className,
      )}
    >
      {node}
    </div>
  ) : (
    node
  )

  return (
    <AvatarEyeFollowShell
      profile={profile}
      followEyes={followEyes}
      className={cn(!framed && className)}
    >
      {inner}
    </AvatarEyeFollowShell>
  )
}

export function MissoutAvatar({
  avatar = 'star',
  size = 'md',
  animation,
  expression,
  defaultAnimation,
  bodyFill,
  eyeFill,
  autoplay = true,
  framed = false,
  followEyes = true,
  className,
  ariaLabel,
}: MissoutAvatarProps) {
  const px = typeof size === 'number' ? size : MISSOUT_AVATAR_SIZES[size]
  const fallback = MISSOUT_AVATAR_DEFAULTS[avatar]

  if (avatar === 'star') {
    return wrapWithEyeFollow(
      <MissoutStarAvatar
        size={px}
        animation={animation}
        defaultAnimation={defaultAnimation ?? fallback.animation}
        bodyFill={bodyFill}
        eyeFill={eyeFill}
        ariaLabel={ariaLabel ?? fallback.label}
      />,
      { avatar, size, framed, followEyes, className },
    )
  }

  if (avatar === 'coordinator') {
    return wrapWithEyeFollow(
      <MissoutEventCoordinatorAvatar
        size={px}
        animation={animation}
        defaultAnimation={defaultAnimation ?? fallback.animation}
        ariaLabel={ariaLabel ?? fallback.label}
      />,
      { avatar, size, framed, followEyes, className },
    )
  }

  if (avatar === 'artist') {
    return wrapWithEyeFollow(
      <MissoutArtistAvatar
        size={px}
        animation={animation}
        defaultAnimation={defaultAnimation ?? fallback.animation}
        ariaLabel={ariaLabel ?? fallback.label}
      />,
      { avatar, size, framed, followEyes, className },
    )
  }

  if (avatar === 'ticket') {
    return wrapWithEyeFollow(
      <MissoutTicketAvatar
        size={px}
        animation={animation}
        defaultAnimation={defaultAnimation ?? fallback.animation}
        ariaLabel={ariaLabel ?? fallback.label}
      />,
      { avatar, size, framed, followEyes, className },
    )
  }

  if (avatar === 'studentMark') {
    return wrapWithEyeFollow(
      <MissoutStudentMarkAvatar
        size={px}
        animation={animation}
        defaultAnimation={defaultAnimation ?? fallback.animation}
        ariaLabel={ariaLabel ?? fallback.label}
      />,
      { avatar, size, framed, followEyes, className },
    )
  }

  const Component = avatarComponents[avatar]

  const playbackProps = {
    size: px,
    autoplay,
    ariaLabel: ariaLabel ?? fallback.label,
    ...(animation ? { animation: animation as never } : {}),
    ...(expression ? { expression: expression as never } : {}),
    ...(!animation && !expression
      ? { defaultAnimation: (defaultAnimation ?? fallback.animation) as never }
      : {}),
  }

  return wrapWithEyeFollow(<Component {...playbackProps} />, {
    avatar,
    size,
    framed,
    followEyes,
    className,
  })
}

export function MissoutAvatarStage({
  avatar = 'star',
  size = 'xl',
  className,
  ...props
}: MissoutAvatarProps) {
  return (
    <div
      className={cn(
        'flex h-full min-h-[18rem] w-full items-center justify-center p-8 sm:p-12 lg:p-16',
        className,
      )}
    >
      <MissoutAvatar avatar={avatar} size={size} {...props} />
    </div>
  )
}
