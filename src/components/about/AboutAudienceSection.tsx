import { useId, useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { cn } from '../../lib/cn'

type AudienceCard = {
  key: string
  pill: string
  headlineWords: readonly [string, string, string]
  body: string
}

const AUDIENCE_CARDS: readonly AudienceCard[] = [
  {
    key: 'students',
    pill: 'For Students',
    headlineWords: ['Discover', 'Register', 'Track'],
    body: 'Discover, register, and keep track of everything happening in colleges at one place.',
  },
  {
    key: 'organisers',
    pill: 'For Organisers',
    headlineWords: ['Create', 'Manage', 'Control'],
    body: 'A clean dashboard to manage your event registrations, updates, and authority without the chaos.',
  },
  {
    key: 'campuses',
    pill: 'For Campuses',
    headlineWords: ['Unify', 'Organise', 'Surface'],
    body: 'One platform that brings every club, fest, and event under a single discoverable system.',
  },
]

const INFLUENCE_W = 0.82

function influenceForCard(scrollProgress: number, index: number): number {
  const focus = scrollProgress * 2
  const d = Math.abs(index - focus)
  return Math.max(0, Math.min(1, 1 - d / INFLUENCE_W))
}

function PinnedAudienceCard({
  card,
  index,
  scrollYProgress,
  reduceMotion,
}: {
  card: AudienceCard
  index: number
  scrollYProgress: MotionValue<number>
  reduceMotion: boolean
}) {
  const scale = useTransform(scrollYProgress, (p) => {
    if (reduceMotion) return 1
    const inf = influenceForCard(p, index)
    return 0.88 + inf * 0.12
  })

  const opacity = useTransform(scrollYProgress, (p) => {
    if (reduceMotion) return 1
    const inf = influenceForCard(p, index)
    return 0.4 + inf * 0.6
  })

  const blurPx = useTransform(scrollYProgress, (p) => {
    if (reduceMotion) return 0
    const inf = influenceForCard(p, index)
    return (1 - inf) * 1
  })

  const glowOpacity = useTransform(scrollYProgress, (p) => {
    if (reduceMotion) return 0.22
    const inf = influenceForCard(p, index)
    return 0.1 + inf * 0.38
  })

  const filter = useMotionTemplate`blur(${blurPx}px)`

  return (
    <motion.div
      data-audience-card
      style={{
        scale,
        opacity,
        filter: reduceMotion ? undefined : filter,
      }}
      className={cn(
        'relative w-[min(85vw,26rem)] shrink-0 snap-center',
        reduceMotion && 'blur-none',
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] z-0 h-[min(11rem,120%)] w-[min(13rem,95%)] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: glowOpacity,
        }}
      >
        <div
          className={cn(
            'h-full w-full rounded-[28px]',
            'bg-[radial-gradient(ellipse_at_center,rgba(249,44,153,0.55)_0%,rgba(249,44,153,0.18)_45%,transparent_72%)]',
            'blur-[36px]',
          )}
        />
      </motion.div>

      <div
        className={cn(
          'relative z-[1] flex min-h-[16rem] flex-col items-center gap-3 rounded-[20px] border-[0.6px] border-[var(--nav-stroke)]',
          'bg-white/55 px-5 pb-5 pt-4 text-center shadow-[0_12px_48px_rgba(0,0,0,0.07)]',
          'backdrop-blur-[16px] backdrop-saturate-150 sm:min-h-[17rem] sm:gap-4 sm:px-6 sm:pb-6 sm:pt-5',
        )}
      >
        <span className="inline-flex rounded-full bg-[#F92C99]/12 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wide text-[#F92C99] sm:text-xs">
          {card.pill}
        </span>

        <h3 className="font-display flex flex-wrap items-baseline justify-center gap-x-0 text-center text-xl font-bold leading-tight tracking-tight text-[#1A1A1A] sm:text-2xl md:text-[1.65rem]">
          {card.headlineWords.map((word, i) => (
            <span key={word} className="inline-flex items-baseline">
              {i > 0 && (
                <span className="select-none px-1.5 text-[#1A1A1A]/38 sm:px-2" aria-hidden>
                  ·
                </span>
              )}
              {word}
            </span>
          ))}
        </h3>

        <p className="font-sans text-sm leading-relaxed text-[#5A5A5A] sm:text-base">{card.body}</p>
      </div>
    </motion.div>
  )
}

function ProgressDots({
  scrollYProgress,
  reduceMotion,
}: {
  scrollYProgress: MotionValue<number>
  reduceMotion: boolean
}) {
  return (
    <div className="pointer-events-none flex items-center justify-center gap-2 pt-4 pb-0 sm:gap-2.5 sm:pt-5">
      {[0, 1, 2].map((i) => (
        <Dot key={i} index={i} scrollYProgress={scrollYProgress} reduceMotion={reduceMotion} />
      ))}
    </div>
  )
}

function Dot({
  index,
  scrollYProgress,
  reduceMotion,
}: {
  index: number
  scrollYProgress: MotionValue<number>
  reduceMotion: boolean
}) {
  const focus = useTransform(scrollYProgress, (p) => p * 2)
  const width = useTransform(focus, (f) => {
    if (reduceMotion) return index === 1 ? 22 : 8
    const inf = Math.max(0, 1 - Math.abs(f - index) / 0.55)
    return 8 + inf * 18
  })

  const opacity = useTransform(focus, (f) => {
    if (reduceMotion) return 0.45
    const inf = Math.max(0, 1 - Math.abs(f - index) / 0.75)
    return 0.35 + inf * 0.65
  })

  return (
    <motion.span
      style={{ width, opacity }}
      className="h-2 shrink-0 rounded-full bg-[#F92C99]"
    />
  )
}

export function AboutAudienceSection() {
  const headingId = useId()
  const reduceMotion = useReducedMotion() ?? false

  const scrollSectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [metrics, setMetrics] = useState({ padLeft: 0, step: 360 })

  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ['start start', 'end end'],
  })

  useLayoutEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current
      const track = trackRef.current
      const card = track?.querySelector('[data-audience-card]') as HTMLElement | null
      if (!viewport || !track || !card) return

      const vw = viewport.clientWidth
      const cw = card.getBoundingClientRect().width
      const gs = getComputedStyle(track)
      const gap = Number.parseFloat(gs.columnGap || gs.gap || '32') || 32

      setMetrics({
        padLeft: Math.max(0, vw / 2 - cw / 2),
        step: cw + gap,
      })
    }

    measure()
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    if (viewportRef.current) ro.observe(viewportRef.current)
    if (trackRef.current) ro.observe(trackRef.current)

    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [])

  const trackX = useTransform(scrollYProgress, [0, 1], [0, -2 * metrics.step])

  const trackPaddingLeft = metrics.padLeft

  return (
    <section
      ref={scrollSectionRef}
      id="about-audiences"
      className="relative bg-white"
      style={{ height: reduceMotion ? 'auto' : '300vh' }}
      aria-labelledby={headingId}
    >
      <div
        ref={viewportRef}
        className={cn(
          'sticky top-0 flex flex-col overflow-hidden pb-8 sm:pb-12 md:pb-16',
          reduceMotion && 'relative',
        )}
      >
        <div className="shrink-0 px-4 pb-2 pt-14 text-center sm:px-6 sm:pb-3 sm:pt-16 md:pt-18">
          <p className="font-sans text-sm font-medium tracking-normal text-[#F92C99] sm:text-base">
            Who it&apos;s for
          </p>
          <h2
            id={headingId}
            className="font-display mx-auto mt-3 max-w-4xl text-3xl font-bold tracking-tight text-[#1A1A1A] sm:mt-3.5 sm:text-4xl md:text-5xl"
          >
            One platform, three sides of campus
          </h2>
        </div>

        <div className="relative flex shrink-0 flex-col justify-start pt-2">
          <motion.div
            ref={trackRef}
            style={{
              x: reduceMotion ? 0 : trackX,
              paddingLeft: reduceMotion ? undefined : trackPaddingLeft,
              paddingRight: reduceMotion ? undefined : trackPaddingLeft,
            }}
            className={cn(
              'flex w-max flex-row items-center gap-8',
              reduceMotion && 'mx-auto w-full max-w-6xl flex-col px-4 pb-12 sm:px-6',
            )}
          >
            {AUDIENCE_CARDS.map((card, index) => (
              <PinnedAudienceCard
                key={card.key}
                card={card}
                index={index}
                scrollYProgress={scrollYProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.div>
        </div>

        {!reduceMotion && (
          <ProgressDots scrollYProgress={scrollYProgress} reduceMotion={reduceMotion} />
        )}
      </div>
    </section>
  )
}
