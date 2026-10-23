import { cn } from '../../lib/cn'
import { MISSOUT_STAR, MISSOUT_STAR_ASPECT } from '../../lib/brandAssets'
import type { MissoutAvatarSize } from '../../lib/avatars'
import { useAvatarEyeFollow } from './AvatarEyeFollowShell'

const STAR_ANIMATIONS = new Set(['idle', 'listening', 'happy', 'curious'])

const STAR_ANIMATION_ALIASES: Record<string, string> = {
  idle: 'idle',
  listening: 'listening',
  happy: 'happy',
  curious: 'curious',
  working: 'idle',
  thinking: 'curious',
  searching: 'curious',
  excited: 'happy',
}

export type MissoutStarAvatarProps = {
  size?: MissoutAvatarSize | number
  animation?: string
  defaultAnimation?: string
  bodyFill?: string
  eyeFill?: string
  className?: string
  ariaLabel?: string
}

function resolveAnimation(animation?: string, defaultAnimation?: string) {
  const candidate = animation ?? defaultAnimation ?? 'idle'
  const aliased = STAR_ANIMATION_ALIASES[candidate] ?? candidate
  return STAR_ANIMATIONS.has(aliased) ? aliased : 'idle'
}

function StarEyes({ mood, eyeFill }: { mood: string; eyeFill: string }) {
  if (mood === 'happy') {
    return (
      <>
        <rect x="34" y="54" width="14" height="8" rx="4" fill={eyeFill} className="missout-star-avatar__eye" />
        <rect x="64" y="54" width="14" height="8" rx="4" fill={eyeFill} className="missout-star-avatar__eye" style={{ animationDelay: '120ms' }} />
      </>
    )
  }

  if (mood === 'curious') {
    return (
      <>
        <rect x="35" y="44" width="11" height="20" rx="5" fill={eyeFill} className="missout-star-avatar__eye" />
        <rect x="66" y="50" width="9" height="14" rx="4.5" fill={eyeFill} className="missout-star-avatar__eye" style={{ animationDelay: '120ms' }} />
      </>
    )
  }

  if (mood === 'listening') {
    return (
      <>
        <rect x="35" y="44" width="11" height="26" rx="5.5" fill={eyeFill} className="missout-star-avatar__eye" />
        <rect x="66" y="44" width="11" height="26" rx="5.5" fill={eyeFill} className="missout-star-avatar__eye" style={{ animationDelay: '120ms' }} />
      </>
    )
  }

  return (
    <>
      <rect x="36" y="48" width="10" height="22" rx="5" fill={eyeFill} className="missout-star-avatar__eye" />
      <rect x="66" y="48" width="10" height="22" rx="5" fill={eyeFill} className="missout-star-avatar__eye" style={{ animationDelay: '120ms' }} />
    </>
  )
}

/** Animated mascot built from the filled MissOut star mark (not Bible Strong geometry). */
export function MissoutStarAvatar({
  size = 'md',
  animation,
  defaultAnimation,
  bodyFill = '#006afe',
  eyeFill = '#111316',
  className,
  ariaLabel = 'MissOut star',
}: MissoutStarAvatarProps) {
  const height =
    typeof size === 'number'
      ? size
      : ({ xs: 48, sm: 80, md: 128, lg: 200, xl: 288, hero: 384 } as const)[size]
  const playback = resolveAnimation(animation, defaultAnimation)
  const eyeFollow = useAvatarEyeFollow()
  const eyeShift =
    eyeFollow.active && (eyeFollow.nx !== 0 || eyeFollow.ny !== 0)
      ? `translate(${eyeFollow.nx * 4.5}, ${eyeFollow.ny * 3.5})`
      : undefined

  return (
    <svg
      viewBox={`0 0 ${MISSOUT_STAR.width} ${MISSOUT_STAR.height}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      data-animation={playback}
      style={{ height, width: `calc(${height}px * (${MISSOUT_STAR_ASPECT}))` }}
      className={cn('missout-star-avatar block max-w-none shrink-0', className)}
    >
      <style>{`
        .missout-star-avatar[data-animation='idle'] .missout-star-avatar__body {
          animation: missout-star-float 3.1s ease-in-out infinite;
        }
        .missout-star-avatar[data-animation='listening'] .missout-star-avatar__body {
          animation: missout-star-listen 3.6s ease-in-out infinite;
        }
        .missout-star-avatar[data-animation='happy'] .missout-star-avatar__body {
          animation: missout-star-happy 1.55s ease-in-out infinite;
        }
        .missout-star-avatar[data-animation='curious'] .missout-star-avatar__body {
          animation: missout-star-curious 2.35s ease-in-out infinite;
        }
        .missout-star-avatar__eye {
          transform-box: fill-box;
          transform-origin: center;
          animation: missout-star-blink 3.4s ease-in-out infinite;
        }
        @keyframes missout-star-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-3deg); }
        }
        @keyframes missout-star-listen {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          40% { transform: translateY(-2px) rotate(2deg); }
          70% { transform: translateY(2px) rotate(-2deg); }
        }
        @keyframes missout-star-happy {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          35% { transform: translateY(-6px) rotate(-4deg) scale(1.03); }
          65% { transform: translateY(-3px) rotate(3deg) scale(1.02); }
        }
        @keyframes missout-star-curious {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          45% { transform: translateY(-3px) rotate(-5deg); }
          75% { transform: translateY(0) rotate(4deg); }
        }
        @keyframes missout-star-blink {
          0%, 46%, 50%, 100% { transform: scaleY(1); }
          48% { transform: scaleY(0.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .missout-star-avatar[data-animation] .missout-star-avatar__body,
          .missout-star-avatar__eye {
            animation: none;
          }
        }
      `}</style>
      <g className="missout-star-avatar__body" style={{ transformOrigin: '56px 63px' }}>
        <path d={MISSOUT_STAR.path} fill={bodyFill} />
        <g
          className="missout-star-avatar__eyes"
          style={{
            transform: eyeShift,
            transformBox: 'fill-box',
            transformOrigin: 'center',
            transition: eyeFollow.active ? 'transform 120ms ease-out' : undefined,
          }}
        >
          <StarEyes mood={playback} eyeFill={eyeFill} />
        </g>
      </g>
    </svg>
  )
}
