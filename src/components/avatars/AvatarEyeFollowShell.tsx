import { createContext, useContext, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { usePointerFollow, type PointerFollowOffset } from '../../hooks/usePointerFollow'
import type { AvatarEyeProfile } from '../../lib/avatarEyeProfiles'

const defaultOffset: PointerFollowOffset = { x: 0, y: 0, nx: 0, ny: 0, active: false }

export const AvatarEyeFollowContext = createContext<PointerFollowOffset>(defaultOffset)

export function useAvatarEyeFollow() {
  return useContext(AvatarEyeFollowContext)
}

export type AvatarEyeFollowShellProps = {
  profile?: AvatarEyeProfile | null
  followEyes?: boolean
  className?: string
  children: ReactNode
}

/** Wraps avatars — eyes / head subtly track the cursor on fine pointers. */
export function AvatarEyeFollowShell({
  profile,
  followEyes = true,
  className,
  children,
}: AvatarEyeFollowShellProps) {
  const [ref, offset] = usePointerFollow<HTMLDivElement>(followEyes, 7)
  const tiltX = offset.active ? offset.x * 4.5 : 0
  const tiltY = offset.active ? -offset.y * 3.5 : 0
  const useParallax = profile?.mode !== 'svg'
  const parallaxX = offset.active && useParallax ? offset.x * 0.45 : 0
  const parallaxY = offset.active && useParallax ? offset.y * 0.4 : 0

  return (
    <AvatarEyeFollowContext.Provider value={offset}>
      <div
        ref={ref}
        className={cn(
          'relative inline-flex max-w-none shrink-0 [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out',
          className,
        )}
        style={
          offset.active
            ? { transform: `perspective(900px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)` }
            : undefined
        }
      >
        <div
          className="relative inline-flex max-w-none shrink-0 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out"
          style={
            useParallax && offset.active
              ? { transform: `translate(${parallaxX}px, ${parallaxY}px)` }
              : undefined
          }
        >
          {children}
        </div>
      </div>
    </AvatarEyeFollowContext.Provider>
  )
}
