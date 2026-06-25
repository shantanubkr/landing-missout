import { useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
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

export type AudienceMode = 'students' | 'organiser'

type IconId =
  | 'discover'
  | 'register'
  | 'track'
  | 'create'
  | 'manage'
  | 'control'

type KeywordCardData = {
  word: string
  features: readonly string[]
  icon: IconId
}

const AUDIENCE_CARDS: Record<AudienceMode, readonly KeywordCardData[]> = {
  students: [
    {
      word: 'Discover',
      features: [
        'Festivals, competitions & workshops near you',
        'Filter by college and category',
        'Featured and upcoming on your feed',
      ],
      icon: 'discover',
    },
    {
      word: 'Register',
      features: [
        'One-tap signup, no Google Forms',
        'Team and group registrations',
        'Tickets and confirmations in-app',
      ],
      icon: 'register',
    },
    {
      word: 'Track',
      features: [
        'Event reminders and live updates',
        'Registration and waitlist status',
        'Deadlines and schedule in one place',
      ],
      icon: 'track',
    },
  ],
  organiser: [
    {
      word: 'Create',
      features: [
        'Festivals, competitions, workshops and performances',
        'Sponsors and stalls',
      ],
      icon: 'create',
    },
    {
      word: 'Manage',
      features: [
        'QR-based check-in',
        'Member applications',
        'Contingent management',
      ],
      icon: 'manage',
    },
    {
      word: 'Control',
      features: [
        'Approval-based workflows',
        'Roles and permissions',
        'Private and public events',
      ],
      icon: 'control',
    },
  ],
}

const TOGGLE_OPTIONS: readonly { id: AudienceMode; label: string }[] = [
  { id: 'students', label: 'Students' },
  { id: 'organiser', label: 'Organiser' },
]

const TAB_ORDER: AudienceMode[] = ['students', 'organiser']

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
  variant = 'default',
  className,
}: {
  card: KeywordCardData
  reduceMotion: boolean
  deckSession: boolean
  blobParallaxY: MotionValue<number>
  cardIndex: number
  variant?: 'default' | 'compact'
  className?: string
}) {
  const [hovered, setHovered] = useState(false)
  const isCompact = variant === 'compact'

  const staggerDelay = cardIndex * 0.15
  const descriptionDelay = staggerDelay + 0.12

  const cardMotionProps = reduceMotion
    ? {}
    : isCompact
      ? {
          initial: { opacity: 0, x: 12 },
          animate: { opacity: 1, x: 0 },
          transition: {
            delay: staggerDelay,
            duration: 0.35,
            ease: easeOutSoft,
          },
        }
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
      className={cn('relative min-w-0 list-none', className)}
      style={{ listStyle: 'none' }}
    >
      <motion.div
        variants={isCompact ? undefined : cardShellVariants}
        initial={isCompact ? undefined : 'rest'}
        animate={isCompact ? undefined : hovered ? 'hover' : 'rest'}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className={isCompact ? 'h-full' : 'rounded-xl sm:rounded-2xl md:rounded-[20px]'}
      >
        <motion.article
          {...cardMotionProps}
          className={cn(
            'relative overflow-hidden border-[0.6px] border-[var(--nav-stroke)]',
            'shadow-[0_6px_28px_rgba(0,0,0,0.055)] backdrop-blur-[14px] backdrop-saturate-150',
            isCompact
              ? 'flex h-full min-h-0 items-start gap-3.5 rounded-2xl bg-white/70 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4'
              : cn(
                  'rounded-xl bg-white/50 px-3 pb-3 pt-3 text-center sm:rounded-2xl md:rounded-[20px]',
                  'sm:px-4 sm:pb-4 sm:pt-3.5',
                  reduceMotion && 'min-h-0',
                ),
          )}
        >
        {!isCompact ? (
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
        ) : (
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,44,153,0.14)_0%,transparent_70%)] blur-xl"
          />
        )}

        <div
          className={cn(
            'relative z-[1]',
            isCompact
              ? 'flex min-w-0 flex-1 items-start gap-3.5 sm:gap-4'
              : 'flex flex-col items-center gap-1.5 sm:gap-2',
          )}
        >
          <ValueCardIcon
            id={card.icon}
            className={isCompact ? 'mt-0.5 h-8 w-8 shrink-0 sm:h-9 sm:w-9' : undefined}
          />
          <div className={isCompact ? 'min-w-0 flex-1 text-left' : undefined}>
            <p
              className={cn(
                'font-display font-bold tracking-tight text-[#1A1A1A]',
                isCompact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl md:text-2xl',
              )}
            >
              {card.word}
            </p>
            {isCompact ? (
              <ul className="mt-1.5 space-y-1 font-sans text-[11px] leading-snug text-[#5A5A5A] sm:text-xs">
                {card.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="shrink-0 text-[#F92C99]" aria-hidden>
                      ·
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : reduceMotion ? (
              <p className="max-w-[16rem] px-0.5 font-sans text-[11px] leading-snug text-[#5A5A5A] sm:max-w-none sm:text-xs md:text-[13px]">
                {card.features.join(' · ')}
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
                {card.features.join(' · ')}
              </motion.p>
            )}
          </div>
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
  variant = 'default',
  className,
}: {
  card: KeywordCardData
  reduceMotion: boolean
  deckSession: boolean
  scrollYProgress: MotionValue<number>
  parallaxIndex: number
  variant?: 'default' | 'compact'
  className?: string
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
      variant={variant}
      className={className}
    />
  )
}

type ValuePropositionsPanelProps = {
  showEyebrow?: boolean
  embedded?: boolean
  layout?: 'default' | 'bento'
  scrollTargetRef: RefObject<HTMLElement | null>
  className?: string
  renderProduct?: (mode: AudienceMode) => ReactNode
}

export function ValuePropositionsPanel({
  showEyebrow = true,
  embedded = false,
  layout = 'default',
  scrollTargetRef,
  className,
  renderProduct,
}: ValuePropositionsPanelProps) {
  const [mode, setMode] = useState<AudienceMode>('students')
  /** After first tab change, deck uses horizontal slide; before that, first Students grid uses viewport stagger. */
  const [deckSession, setDeckSession] = useState(false)
  const reduceMotion = useReducedMotion() ?? false

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
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
    <div id="value" className={cn('mx-auto max-w-6xl text-center', className)}>
      <ScrollReveal>
        {showEyebrow ? (
          <p className="font-sans text-base font-medium tracking-normal text-[#F92C99] sm:text-lg md:text-xl">
            What are we solving?
          </p>
        ) : null}

          <div
            className={cn(showEyebrow ? 'mt-6 sm:mt-7' : 'mt-0')}
            role="tablist"
            aria-label="Audience"
          >
            <div className="missout-glass relative inline-grid max-w-full grid-cols-2 rounded-full border-[0.6px] border-[var(--nav-stroke)] bg-[var(--nav-surface)] p-1">
              <motion.div
                aria-hidden
                custom={slideI}
                variants={indicatorVariants}
                animate="slide"
                initial={false}
                style={{
                  width: 'calc((100% - 0.5rem) / 2)',
                }}
                className={cn(
                  'pointer-events-none absolute inset-y-1 left-1 z-0 rounded-full',
                  'bg-gradient-to-r from-[#F92C99] via-[#FF5CB8] to-[#E11E85]',
                  'shadow-[0_4px_20px_rgba(249,44,153,0.35)]',
                )}
              />

              {TOGGLE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  aria-selected={mode === opt.id}
                  onClick={() => selectTab(opt.id)}
                  className={cn(
                    'relative z-10 min-w-0 rounded-full px-3 py-2 text-[11px] font-medium sm:min-w-[5.5rem] sm:px-5 sm:py-2.5 sm:text-sm md:min-w-[7rem]',
                    'transition-colors duration-200 motion-reduce:transition-none',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]',
                    mode === opt.id ? 'text-white' : 'text-[#1A1A1A] hover:text-[#F92C99]',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {layout === 'bento' && renderProduct ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              role="tabpanel"
              aria-label={`${TOGGLE_OPTIONS.find((o) => o.id === mode)?.label ?? ''} offer`}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: easeOutSoft }}
              className={cn('mt-8 lg:mt-9', embedded && 'mt-7 sm:mt-8')}
            >
              <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-3 lg:items-stretch lg:gap-4">
                <div className="flex min-h-0 items-center justify-center lg:col-span-7 lg:row-span-3 lg:min-h-[22rem]">
                  {renderProduct(mode)}
                </div>
                <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:gap-3 lg:contents">
                  {cards.map((card, index) => (
                    <KeywordCardWithParallax
                      key={`${mode}-${card.word}`}
                      card={card}
                      reduceMotion={reduceMotion}
                      deckSession={deckSession}
                      scrollYProgress={scrollYProgress}
                      parallaxIndex={index}
                      variant="compact"
                      className={cn(
                        'lg:col-span-5',
                        index === 0 && 'lg:row-start-1',
                        index === 1 && 'lg:row-start-2',
                        index === 2 && 'lg:row-start-3',
                      )}
                    />
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            {renderProduct ? (
              <div className={cn(embedded ? 'mt-8 sm:mt-9' : 'mt-10 sm:mt-12')}>
                <AnimatePresence mode="wait" initial={false}>
                  {renderProduct(mode)}
                </AnimatePresence>
              </div>
            ) : null}

            <div
              className={cn(
                'relative',
                embedded
                  ? renderProduct
                    ? 'mt-6 sm:mt-7'
                    : 'mt-8 sm:mt-9'
                  : 'mt-10 sm:mt-12 md:mt-14',
              )}
            >
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
          </>
        )}
    </div>
  )
}

export function ValuePropositionsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      aria-label="What are we solving?"
      className="bg-white px-2 pt-16 pb-7 sm:px-6 sm:pt-20 sm:pb-9 md:pt-24 md:pb-11"
    >
      <ValuePropositionsPanel showEyebrow scrollTargetRef={sectionRef} />
    </section>
  )
}
