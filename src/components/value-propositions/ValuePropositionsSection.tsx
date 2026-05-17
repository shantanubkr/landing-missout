import { useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion'
import { cn } from '../../lib/cn'
import { ScrollReveal } from '../motion/ScrollReveal'

type AudienceMode = 'students' | 'organiser' | 'campus'

type IconId =
  | 'discover'
  | 'register'
  | 'track'
  | 'create'
  | 'manage'
  | 'control'
  | 'monitor'
  | 'unify'
  | 'scale'

type KeywordCardData = {
  word: string
  description: string
  icon: IconId
}

const AUDIENCE_CARDS: Record<AudienceMode, readonly KeywordCardData[]> = {
  students: [
    {
      word: 'Discover',
      description: 'Find events that match your vibe',
      icon: 'discover',
    },
    {
      word: 'Register',
      description: 'One-tap sign up, no friction',
      icon: 'register',
    },
    {
      word: 'Track',
      description: 'Never miss updates or deadlines',
      icon: 'track',
    },
  ],
  organiser: [
    {
      word: 'Create',
      description: 'Launch events in minutes',
      icon: 'create',
    },
    {
      word: 'Manage',
      description: 'Handle registrations effortlessly',
      icon: 'manage',
    },
    {
      word: 'Control',
      description: 'Set rules, roles, and access',
      icon: 'control',
    },
  ],
  campus: [
    {
      word: 'Monitor',
      description: 'Live dashboards across campus',
      icon: 'monitor',
    },
    {
      word: 'Unify',
      description: 'One platform, every club',
      icon: 'unify',
    },
    {
      word: 'Scale',
      description: 'Grow without the chaos',
      icon: 'scale',
    },
  ],
}

const TOGGLE_OPTIONS: readonly { id: AudienceMode; label: string }[] = [
  { id: 'students', label: 'Students' },
  { id: 'organiser', label: 'Organiser' },
  { id: 'campus', label: 'Campus' },
]

const TAB_ORDER: AudienceMode[] = ['students', 'organiser', 'campus']

function tabSlideIndex(mode: AudienceMode): number {
  return TAB_ORDER.indexOf(mode)
}

const easeOutSoft = [0.22, 1, 0.36, 1] as const
const easeOutSharp = [0.4, 0, 1, 1] as const

const indicatorVariants: Variants = {
  slide: (i: number) => ({
    x: `${i * 100}%`,
    transition: { type: 'spring', stiffness: 380, damping: 32 },
  }),
}

/** Viewport list — per-card motion uses whileInView inside KeywordCard */
function viewportListVariants(reduceMotion: boolean): Variants {
  return {
    initial: {},
    animate: { opacity: 1 },
    exit: reduceMotion
      ? { opacity: 0, transition: { duration: 0.2 } }
      : {
          opacity: 0,
          x: -56,
          transition: { duration: 0.28, ease: easeOutSharp },
        },
  }
}

/** After intro — horizontal deck swap (no child stagger; cards handle their own entrance) */
function slideListVariants(reduceMotion: boolean): Variants {
  return {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, x: 56 },
    animate: {
      opacity: 1,
      x: 0,
      transition: reduceMotion ? { duration: 0.2 } : { duration: 0.38, ease: easeOutSoft },
    },
    exit: reduceMotion
      ? { opacity: 0, transition: { duration: 0.18 } }
      : {
          opacity: 0,
          x: -56,
          transition: { duration: 0.28, ease: easeOutSharp },
        },
  }
}

function cardItemVariants(deckSession: boolean, reduceMotion: boolean): Variants {
  if (!deckSession) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: reduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: -40,
            transition: { duration: 0.22 },
          },
    }
  }
  return {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 },
    animate: {
      opacity: 1,
      x: 0,
      transition: reduceMotion ? { duration: 0.18 } : { duration: 0.35, ease: easeOutSoft },
    },
    exit: reduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          x: -24,
          transition: { duration: 0.2 },
        },
  }
}

const cardShellVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { type: 'spring', stiffness: 460, damping: 30 },
  },
}

const glowBlobVariants: Variants = {
  rest: { scale: 1, opacity: 0.85 },
  hover: {
    scale: 1.08,
    opacity: 1,
    transition: { duration: 0.35, ease: easeOutSoft },
  },
}

/** Card art lives in `public/value_propositions/{id}.svg` (discover, register, … scale). */
function ValueCardIcon({ id, className }: { id: IconId; className?: string }) {
  /** Pixel SVGs ship with white fills — mask them so `bg` becomes the glyph color (#F92C99 matches headline accents). */
  const maskUrl = `url("/value_propositions/${id}.svg")`
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block shrink-0 bg-[#F92C99]',
        'h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10',
        className,
      )}
      style={{
        WebkitMaskImage: maskUrl,
        maskImage: maskUrl,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}

const CARD_VIEWPORT = { once: true as const, amount: 0.35 as const }

function KeywordCard({
  card,
  reduceMotion,
  deckSession,
  blobParallaxY,
  cardIndex,
}: {
  card: KeywordCardData
  reduceMotion: boolean
  deckSession: boolean
  blobParallaxY: MotionValue<number>
  cardIndex: number
}) {
  const [hovered, setHovered] = useState(false)

  const staggerDelay = cardIndex * 0.15
  const descriptionDelay = staggerDelay + 0.12

  const cardMotionProps = reduceMotion
    ? {}
    : {
        initial: { height: 80, opacity: 0.6 },
        whileInView: {
          height: 'auto',
          opacity: 1,
          transition: {
            delay: staggerDelay,
            duration: 0.5,
            ease: easeOutSoft,
          },
        },
        viewport: CARD_VIEWPORT,
      }

  return (
    <motion.li
      variants={cardItemVariants(deckSession, reduceMotion)}
      className="relative min-w-0 list-none"
      style={{ listStyle: 'none' }}
    >
      <motion.div
        variants={cardShellVariants}
        initial="rest"
        animate={hovered ? 'hover' : 'rest'}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="rounded-xl sm:rounded-2xl md:rounded-[20px]"
      >
        <motion.article
          {...cardMotionProps}
          className={cn(
            'relative overflow-hidden rounded-xl border-[0.6px] border-[var(--nav-stroke)]',
            'bg-white/50 px-3 pb-3 pt-3 text-center shadow-[0_6px_28px_rgba(0,0,0,0.055)]',
            'backdrop-blur-[14px] backdrop-saturate-150 sm:rounded-2xl md:rounded-[20px]',
            'sm:px-4 sm:pb-4 sm:pt-3.5',
            reduceMotion && 'min-h-0',
          )}
        >
        {/*
          Centering lives on a non-motion wrapper so Framer's translateY (scroll parallax + hover scale)
          never overrides Tailwind translateX(-50%).
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[48%] z-0 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            variants={reduceMotion ? undefined : glowBlobVariants}
            initial="rest"
            animate={hovered ? 'hover' : 'rest'}
            style={reduceMotion ? undefined : { y: blobParallaxY }}
            className="h-[min(10rem,135%)] w-[min(12rem,145%)] will-change-transform"
          >
            <div
              className={cn(
                'h-full w-full rounded-full',
                'bg-[radial-gradient(ellipse_at_center,rgba(249,44,153,0.42)_0%,rgba(249,44,153,0.14)_40%,transparent_72%)]',
                'blur-[44px]',
              )}
            />
          </motion.div>
        </div>

        <div className="relative z-[1] flex flex-col items-center gap-1.5 sm:gap-2">
          <ValueCardIcon id={card.icon} />
          <p className="font-display text-lg font-bold tracking-tight text-[#1A1A1A] sm:text-xl md:text-2xl">
            {card.word}
          </p>
          {reduceMotion ? (
            <p className="max-w-[16rem] px-0.5 font-sans text-[11px] leading-snug text-[#5A5A5A] sm:max-w-none sm:text-xs md:text-[13px]">
              {card.description}
            </p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={CARD_VIEWPORT}
              transition={{
                delay: descriptionDelay,
                duration: 0.4,
                ease: easeOutSoft,
              }}
              className="max-w-[16rem] px-0.5 font-sans text-[11px] leading-snug text-[#5A5A5A] sm:max-w-none sm:text-xs md:text-[13px]"
            >
              {card.description}
            </motion.p>
          )}
        </div>
      </motion.article>
      </motion.div>
    </motion.li>
  )
}

function KeywordCardWithParallax({
  card,
  reduceMotion,
  deckSession,
  scrollYProgress,
  parallaxIndex,
}: {
  card: KeywordCardData
  reduceMotion: boolean
  deckSession: boolean
  scrollYProgress: MotionValue<number>
  parallaxIndex: number
}) {
  /** Stronger range + per-card multiplier so movement reads clearly while scrolling */
  const mult = 1 + parallaxIndex * 0.28

  const blobParallaxY = useTransform(scrollYProgress, [0, 1], [-36 * mult, 36 * mult])

  return (
    <KeywordCard
      card={card}
      reduceMotion={reduceMotion}
      deckSession={deckSession}
      blobParallaxY={blobParallaxY}
      cardIndex={parallaxIndex}
    />
  )
}

export function ValuePropositionsSection() {
  const [mode, setMode] = useState<AudienceMode>('students')
  /** After first tab change, deck uses horizontal slide; before that, first Students grid uses viewport stagger. */
  const [deckSession, setDeckSession] = useState(false)
  const reduceMotion = useReducedMotion() ?? false

  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    /** Narrower band so progress moves more while the section crosses the viewport */
    offset: ['start 0.92', 'end 0.08'],
  })

  const cards = AUDIENCE_CARDS[mode]
  const slideI = tabSlideIndex(mode)

  const listVariants = useMemo(
    () =>
      deckSession || mode !== 'students'
        ? slideListVariants(reduceMotion)
        : viewportListVariants(reduceMotion),
    [deckSession, mode, reduceMotion],
  )

  function selectTab(next: AudienceMode) {
    if (next !== mode) setDeckSession(true)
    setMode(next)
  }

  return (
    <section
      ref={sectionRef}
      id="value"
      aria-label="What are we solving?"
      className="bg-white px-2 pt-16 pb-7 sm:px-6 sm:pt-20 sm:pb-9 md:pt-24 md:pb-11"
    >
      <div className="mx-auto max-w-6xl text-center">
        <ScrollReveal>
          <p className="font-sans text-base font-medium tracking-normal text-[#F92C99] sm:text-lg md:text-xl">
            What are we solving?
          </p>

          <div className="mt-6 sm:mt-7" role="tablist" aria-label="Audience">
            <div className="missout-glass relative inline-grid max-w-full grid-cols-3 rounded-full border-[0.6px] border-[var(--nav-stroke)] bg-[var(--nav-surface)] p-1">
              <motion.div
                aria-hidden
                custom={slideI}
                variants={indicatorVariants}
                animate="slide"
                initial={false}
                style={{
                  width: 'calc((100% - 0.5rem) / 3)',
                }}
                className={cn(
                  'pointer-events-none absolute inset-y-1 left-1 z-0 rounded-full',
                  'bg-gradient-to-r from-[#F92C99] via-[#FF5CB8] to-[#E11E85]',
                  'shadow-[0_4px_20px_rgba(249,44,153,0.35)]',
                )}
              />

              {TOGGLE_OPTIONS.map((opt, col) => (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  aria-selected={mode === opt.id}
                  onClick={() => selectTab(opt.id)}
                  className={cn(
                    'relative z-10 min-w-0 rounded-full px-2 py-2 text-[11px] font-medium sm:min-w-[5.25rem] sm:px-4 sm:py-2.5 sm:text-sm md:min-w-[6.5rem]',
                    'transition-colors duration-200 motion-reduce:transition-none',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]',
                    col === 1 && 'col-start-2',
                    col === 2 && 'col-start-3',
                    mode === opt.id ? 'text-white' : 'text-[#1A1A1A] hover:text-[#F92C99]',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="relative mt-10 sm:mt-12 md:mt-14">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={mode}
              role="tabpanel"
              aria-label={`${TOGGLE_OPTIONS.find((o) => o.id === mode)?.label ?? ''} keywords`}
              variants={listVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3 sm:gap-2 md:gap-4 lg:gap-5"
            >
              {cards.map((card, index) => (
                <KeywordCardWithParallax
                  key={`${mode}-${card.word}`}
                  card={card}
                  reduceMotion={reduceMotion}
                  deckSession={deckSession}
                  scrollYProgress={scrollYProgress}
                  parallaxIndex={index}
                />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
