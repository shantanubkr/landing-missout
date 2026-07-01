import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { STAGE_TEASER_IMAGES } from '../../lib/stageTeaserImages'
import { Button } from '../ui'
import { WaitlistModal } from '../waitlist'

const WAITLIST_AUTO_OPEN_MS = 2000

const STACK_OFFSETS = [
  { rotate: -7, x: -10, y: 0, scale: 0.96 },
  { rotate: 4, x: 8, y: 14, scale: 0.98 },
  { rotate: -3, x: -4, y: 28, scale: 1 },
  { rotate: 6, x: 12, y: 42, scale: 1.02 },
] as const

type StageRevealTeaserProps = {
  theme?: 'home' | 'product'
  className?: string
  /** Tighter layout for product hero card slot. */
  compact?: boolean
}

function GiftBow({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none relative z-20', className)} aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-3 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FFE8A3] via-[#FFF4D6] to-[#E8C56A] shadow-[0_2px_8px_rgba(0,0,0,0.12)]" />
      <div className="absolute left-1/2 top-1/2 h-14 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#FFE8A3] via-[#FFF4D6] to-[#E8C56A] shadow-[0_2px_8px_rgba(0,0,0,0.12)]" />
      <div className="absolute left-1/2 top-[42%] h-7 w-9 -translate-x-[120%] -translate-y-1/2 rotate-[-28deg] rounded-full bg-gradient-to-br from-[#FFF8E7] to-[#E8C56A] shadow-sm" />
      <div className="absolute left-1/2 top-[42%] h-7 w-9 -translate-x-[20%] -translate-y-1/2 rotate-[28deg] rounded-full bg-gradient-to-bl from-[#FFF8E7] to-[#E8C56A] shadow-sm" />
      <div className="absolute left-1/2 top-[38%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#FFFDF5] to-[#F0D078] ring-2 ring-[#E8C56A]/40" />
    </div>
  )
}

function StackedTeaserImages({ compact }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full shrink-0',
        compact ? 'h-[10.5rem] max-w-[11rem] sm:h-[12rem] sm:max-w-[13rem]' : 'h-[14rem] max-w-[15rem] sm:h-[17rem] sm:max-w-[18rem]',
      )}
      aria-hidden
    >
      {STAGE_TEASER_IMAGES.map((src, index) => {
        const offset = STACK_OFFSETS[index] ?? STACK_OFFSETS[0]
        return (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 16, rotate: offset.rotate - 4 }}
            animate={{ opacity: 1, y: offset.y, rotate: offset.rotate, x: offset.x, scale: offset.scale }}
            transition={{ delay: 0.08 + index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-0 w-[72%] -translate-x-1/2"
            style={{ zIndex: index + 1 }}
          >
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-[0_12px_40px_rgba(26,26,26,0.14)] ring-1 ring-black/[0.06]">
              <img
                src={src}
                alt=""
                width={612}
                height={612}
                draggable={false}
                className="block aspect-square w-full object-cover opacity-100 blur-[2px]"
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function GiftWrapper({
  compact,
  onUnwrap,
  accentClass,
}: {
  compact?: boolean
  onUnwrap: () => void
  accentClass: string
}) {
  return (
    <motion.button
      type="button"
      onClick={onUnwrap}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.35 } }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      className={cn(
        'group relative w-full cursor-pointer overflow-hidden rounded-[22px] border-[0.6px] border-[var(--nav-stroke)] text-left outline-none',
        'focus-visible:ring-2 focus-visible:ring-offset-2',
        accentClass === 'product' ? 'focus-visible:ring-[#006AFE]' : 'focus-visible:ring-[#F92C99]',
        compact ? 'min-h-[12.5rem] sm:min-h-[14rem]' : 'min-h-[16rem] sm:min-h-[18rem] md:min-h-[20rem]',
      )}
      aria-label="Unwrap Stage surprise"
    >
      <div
        className={cn(
          'absolute inset-0',
          accentClass === 'product'
            ? 'bg-[linear-gradient(135deg,#006AFE_0%,#3D8FFF_45%,#0052CC_100%)]'
            : 'bg-[linear-gradient(135deg,#F92C99_0%,#FF5CB8_42%,#E11E85_100%)]',
        )}
      />
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, rgba(255,255,255,0.35) 0 10px, transparent 10px 20px)',
        }}
        aria-hidden
      />
      <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-gradient-to-b from-[#FFF4D6] via-[#FFE8A3] to-[#E8C56A] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] sm:w-12" aria-hidden />
      <div className="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 bg-gradient-to-r from-[#FFF4D6] via-[#FFE8A3] to-[#E8C56A] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] sm:h-12" aria-hidden />
      <GiftBow className="absolute inset-0" />

      <div className="relative z-10 flex h-full min-h-[inherit] flex-col items-center justify-end px-5 pb-6 pt-10 text-center sm:px-6 sm:pb-7">
        <p className="font-display text-xl font-bold tracking-tight text-white drop-shadow-sm sm:text-2xl">
          Stage
        </p>
        <p className="mt-1 font-sans text-sm font-medium text-white/90 sm:text-base">
          Something special is inside
        </p>
        <span
          className={cn(
            'mt-4 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 font-sans text-xs font-semibold text-white backdrop-blur-sm sm:text-sm',
            'motion-safe:animate-pulse motion-reduce:animate-none',
          )}
        >
          <span aria-hidden>🎁</span>
          Click to unwrap
        </span>
      </div>
    </motion.button>
  )
}

function RevealedContent({
  compact,
  theme,
  onJoinWaitlist,
}: {
  compact?: boolean
  theme: 'home' | 'product'
  onJoinWaitlist: () => void
}) {
  const isProduct = theme === 'product'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'flex w-full flex-col items-center gap-6 rounded-[22px] border-[0.6px] border-[var(--nav-stroke)] bg-white px-4 py-6 shadow-[0_16px_48px_rgba(26,26,26,0.08)] sm:px-6 sm:py-7',
        compact ? 'sm:flex-row sm:items-center sm:gap-5' : 'md:flex-row md:items-center md:gap-10 md:px-8 md:py-8',
      )}
    >
      <StackedTeaserImages compact={compact} />

      <div className={cn('min-w-0 flex-1 text-center', compact ? 'sm:text-left' : 'md:text-left')}>
        <p
          className={cn(
            'font-sans text-xs font-semibold uppercase tracking-[0.14em]',
            isProduct ? 'text-[#006AFE]' : 'text-[#F92C99]',
          )}
        >
          Coming soon
        </p>
        <h3
          className={cn(
            'font-display mt-2 text-balance font-bold tracking-tight text-[#1A1A1A]',
            compact ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl',
          )}
        >
          Join the waitlist, your student life is about to get a lot more interesting
        </h3>
        <div className={cn('mt-5 flex justify-center', compact ? 'sm:justify-start' : 'md:justify-start')}>
          <Button
            type="button"
            variant="primary"
            theme={theme}
            size={compact ? 'md' : 'lg'}
            onClick={onJoinWaitlist}
            className={compact ? undefined : '!px-8'}
          >
            Join the Waitlist
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export function StageRevealTeaser({
  theme = 'home',
  className,
  compact = false,
}: StageRevealTeaserProps) {
  const [revealed, setRevealed] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const autoOpenedRef = useRef(false)

  function unwrap() {
    setRevealed(true)
  }

  function openWaitlist() {
    setWaitlistOpen(true)
  }

  useEffect(() => {
    if (!revealed || autoOpenedRef.current) return

    const timer = window.setTimeout(() => {
      autoOpenedRef.current = true
      setWaitlistOpen(true)
    }, WAITLIST_AUTO_OPEN_MS)

    return () => window.clearTimeout(timer)
  }, [revealed])

  return (
    <>
      <div className={cn('w-full', className)}>
        <AnimatePresence mode="wait" initial={false}>
          {!revealed ? (
            <GiftWrapper key="gift" compact={compact} onUnwrap={unwrap} accentClass={theme} />
          ) : (
            <RevealedContent
              key="revealed"
              compact={compact}
              theme={theme}
              onJoinWaitlist={openWaitlist}
            />
          )}
        </AnimatePresence>
      </div>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  )
}
