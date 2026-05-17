import { useCallback, useId, useRef, useState, type CSSProperties } from 'react'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ScrollReveal } from '../motion/ScrollReveal'
import { PEOPLE_INVOLVED, peopleStackBehind, type PeopleInvolvedMember } from '../../lib/peopleInvolvedData'
import { TeamMemberCard } from './TeamMemberCard'

/** Shortest path on the carousel ring: sign of the step that reaches `to` from `from`. */
function carouselStepDir(from: number, to: number, len: number): -1 | 1 {
  if (len <= 1) return 1
  let d = to - from
  const half = len / 2
  if (d > half) d -= len
  if (d < -half) d += len
  return d >= 0 ? 1 : -1
}

const SWIPE_THRESHOLD_PX = 56
const DRAG_MAX_PX = 120

/**
 * Per-layer L/R scatter for the back stack. Seeded from `activeIndex` so it feels random per slide
 * but stable on re-renders — not tied to whose portrait is on each back card.
 */
function stackScatterSign(activeIndex: number, depthIndex: number, totalBehind: number): -1 | 1 {
  let x = Math.imul(activeIndex + 1247, 7919) ^ Math.imul(depthIndex + 1, 7937) ^ Math.imul(totalBehind, 8191)
  x = (x >>> 0) ^ (x >>> 17)
  x = Math.imul(x, 69069)
  x ^= x >>> 16
  return (x & 1) === 0 ? -1 : 1
}

type StackLayerMag = Readonly<{ r: number; x: number; y: number }>

const STACK_FAR_MAG: StackLayerMag = { r: 11, x: 9, y: 5 }
const STACK_NEAR_MAG: StackLayerMag = { r: 4, x: 3, y: 2 }

function stackBackTransformStyle(params: {
  activeIndex: number
  depthIndex: number
  totalBehind: number
}): CSSProperties {
  const { activeIndex, depthIndex, totalBehind } = params
  const mag = totalBehind === 1 ? STACK_NEAR_MAG : depthIndex === 0 ? STACK_FAR_MAG : STACK_NEAR_MAG
  const sign = stackScatterSign(activeIndex, depthIndex, totalBehind)
  return {
    transform: `rotate(${sign * mag.r}deg) translate(${sign * mag.x}px, ${mag.y}px)`,
    transformOrigin: '50% 50%',
  }
}

/** Stacked deck: real teammate cards behind + animated top card. */
function PeopleDeck({
  activeIndex,
  current,
  leaving,
  onExitLayerDone,
  dragX,
  isDragging,
  instantDragReset,
  prefersReducedMotion,
  pointerHandlers,
  exitLayerClass,
}: {
  activeIndex: number
  current: PeopleInvolvedMember
  leaving: PeopleInvolvedMember | null
  onExitLayerDone: (e: React.AnimationEvent<HTMLDivElement>) => void
  dragX: number
  isDragging: boolean
  instantDragReset: boolean
  prefersReducedMotion: boolean
  pointerHandlers: {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void
    onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void
    onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => void
  }
  exitLayerClass: 'people-card-exit--next' | 'people-card-exit--prev' | null
}) {
  const behind = peopleStackBehind(activeIndex)
  const inTransition = leaving != null
  const dragTransform =
    !inTransition && !prefersReducedMotion
      ? `translate3d(${dragX}px, 0, 0)`
      : !inTransition
        ? 'translate3d(0,0,0)'
        : undefined
  const dragTransition =
    isDragging || instantDragReset
      ? 'none'
      : prefersReducedMotion
        ? 'transform 0.1s ease-out'
        : 'transform 0.4s cubic-bezier(0.22, 0.8, 0.2, 1)'

  return (
    <div
      className="mx-auto w-[min(28rem,82vw)] max-w-full px-2 pb-4 pt-3 sm:w-[min(30rem,88vw)] sm:px-4 sm:pb-6 sm:pt-5 md:w-[min(32rem,92vw)]"
      style={{ perspective: '1200px' }}
    >
      <div className="relative mx-auto aspect-[504/630] w-full">
        {behind.map((member, i) => {
          const transformStyle = stackBackTransformStyle({
            activeIndex,
            depthIndex: i,
            totalBehind: behind.length,
          })
          return (
            <div
              key={`${member.id}-stack-${i}`}
              className={cn(
                'pointer-events-none absolute inset-0 flex items-center justify-center',
                i === 0 ? 'z-[1]' : 'z-[2]',
              )}
              style={transformStyle}
              aria-hidden
            >
              <TeamMemberCard member={member} variant="fill" />
            </div>
          )
        })}

        <div
          className="absolute inset-0 z-10"
          style={{ transformOrigin: '50% 50%' }}
        >
          {/* New top card: sits under the outgoing layer during a transition, then “rises” into place. */}
          <div
            className={cn(
              'absolute inset-0 z-20 h-full w-full',
              !inTransition && 'cursor-grab touch-none active:cursor-grabbing',
            )}
            style={
              inTransition
                ? undefined
                : {
                    transform: dragTransform,
                    transition: dragTransition,
                  }
            }
            {...(inTransition ? {} : pointerHandlers)}
          >
            <TeamMemberCard
              member={current}
              variant="fill"
              className={cn(inTransition && !prefersReducedMotion && 'people-card-rise')}
            />
          </div>

          {leaving && exitLayerClass && (
            <div
              key={leaving.id}
              className={cn(
                'pointer-events-none absolute inset-0 z-30 h-full w-full will-change-transform',
                exitLayerClass,
              )}
              onAnimationEnd={onExitLayerDone}
            >
              <TeamMemberCard member={leaving} variant="fill" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M12.5 5L7.5 10L12.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PeopleInvolvedSection() {
  const headingId = useId()
  const n = PEOPLE_INVOLVED.length
  const [active, setActive] = useState(0)
  const [leaving, setLeaving] = useState<PeopleInvolvedMember | null>(null)
  const [slideDir, setSlideDir] = useState<1 | -1>(1)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [instantDragReset, setInstantDragReset] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const startX = useRef(0)
  const activePointer = useRef<number | null>(null)

  const onExitLayerDone = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return
      setLeaving(null)
    },
    [],
  )

  const go = useCallback(
    (dir: -1 | 1) => {
      if (n < 1 || leaving) return
      if (prefersReducedMotion) {
        setActive((i) => (i + dir + n) % n)
        return
      }
      setDragX(0)
      setSlideDir(dir)
      setLeaving(PEOPLE_INVOLVED[active]!)
      setActive((i) => (i + dir + n) % n)
    },
    [n, active, leaving, prefersReducedMotion],
  )

  const goToIndex = useCallback(
    (i: number) => {
      if (n < 1 || i === active || leaving) return
      if (prefersReducedMotion) {
        setActive(i)
        return
      }
      setDragX(0)
      setSlideDir(carouselStepDir(active, i, n))
      setLeaving(PEOPLE_INVOLVED[active]!)
      setActive(i)
    },
    [active, n, leaving, prefersReducedMotion],
  )

  const currentMember = PEOPLE_INVOLVED[active]!

  const pointerHandlers = {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 || n < 2 || leaving) return
      e.currentTarget.setPointerCapture(e.pointerId)
      activePointer.current = e.pointerId
      startX.current = e.clientX
      setIsDragging(true)
    },
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      if (activePointer.current !== e.pointerId) return
      const raw = e.clientX - startX.current
      setDragX(
        Math.max(-DRAG_MAX_PX, Math.min(DRAG_MAX_PX, raw)),
      )
    },
    onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => {
      if (activePointer.current !== e.pointerId) return
      const raw = e.clientX - startX.current
      const dx = Math.max(-DRAG_MAX_PX, Math.min(DRAG_MAX_PX, raw))
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
      activePointer.current = null
      setIsDragging(false)
      if (n > 1 && Math.abs(dx) > SWIPE_THRESHOLD_PX) {
        if (prefersReducedMotion) {
          setActive((a) => (a + (dx > 0 ? -1 : 1) + n) % n)
        } else {
          setInstantDragReset(true)
          setDragX(0)
          setSlideDir(dx > 0 ? -1 : 1)
          setLeaving(PEOPLE_INVOLVED[active]!)
          setActive((a) => (a + (dx > 0 ? -1 : 1) + n) % n)
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setInstantDragReset(false)
            })
          })
        }
      } else {
        setDragX(0)
      }
    },
    onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => {
      if (activePointer.current !== e.pointerId) return
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
      activePointer.current = null
      setIsDragging(false)
      setDragX(0)
    },
  }

  return (
    <section
      id="people"
      className="bg-white px-4 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-12 md:pt-24 md:pb-14"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-6xl text-center">
        <ScrollReveal>
          <p className="font-sans text-sm font-medium tracking-normal text-[#F92C99] sm:text-base">
            Who are we
          </p>
          <h2
            id={headingId}
            className="font-display mt-4 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:mt-5 sm:text-4xl md:text-5xl"
          >
            People Involved
          </h2>
          <p className="font-sans mt-3 text-base text-[#5A5A5A] sm:mt-4 sm:text-lg">
            Meet the people behind Missout.
          </p>
        </ScrollReveal>
      </div>

      {n > 0 && (
        <div
          className="mx-auto mt-10 max-w-4xl min-w-0 overflow-visible sm:mt-12 md:mt-16"
          role="region"
          aria-roledescription="carousel"
          aria-label="People"
        >
          <div className="flex items-center justify-center gap-2 overflow-visible sm:gap-4 md:gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={!!leaving}
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C5C5C5] bg-white text-[#9A9A9A] shadow-sm',
                'transition-[color,background-color,border-color] duration-200',
                'hover:border-[#F92C99]/30 hover:text-[#F92C99]',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]',
                'motion-reduce:transition-none',
                leaving && 'pointer-events-none opacity-50',
              )}
              aria-label="Previous person"
            >
              <ChevronLeft />
            </button>

            <div className="min-w-0 flex-1 select-none overflow-visible" aria-live="polite">
              <PeopleDeck
                activeIndex={active}
                current={currentMember}
                leaving={leaving}
                onExitLayerDone={onExitLayerDone}
                dragX={dragX}
                isDragging={isDragging}
                instantDragReset={instantDragReset}
                prefersReducedMotion={prefersReducedMotion}
                pointerHandlers={pointerHandlers}
                exitLayerClass={
                  leaving
                    ? slideDir > 0
                      ? 'people-card-exit--next'
                      : 'people-card-exit--prev'
                    : null
                }
              />
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              disabled={!!leaving}
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C5C5C5] bg-white text-[#9A9A9A] shadow-sm',
                'transition-[color,background-color,border-color] duration-200',
                'hover:border-[#F92C99]/30 hover:text-[#F92C99]',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]',
                'motion-reduce:transition-none',
                leaving && 'pointer-events-none opacity-50',
              )}
              aria-label="Next person"
            >
              <ChevronRight />
            </button>
          </div>

          {n > 1 && (
            <div
              className="mt-6 flex justify-center gap-2 sm:mt-8"
              role="tablist"
              aria-label="People slides"
            >
              {PEOPLE_INVOLVED.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  disabled={!!leaving}
                  aria-selected={active === i}
                  aria-label={`${p.name}, ${i + 1} of ${n}`}
                  onClick={() => goToIndex(i)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors duration-200',
                    active === i
                      ? 'bg-[#F92C99]'
                      : 'bg-[#1A1A1A]/20 ring-1 ring-inset ring-[#1A1A1A]/10 hover:bg-[#1A1A1A]/30',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]',
                    'motion-reduce:transition-none',
                    leaving && 'pointer-events-none opacity-50',
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
