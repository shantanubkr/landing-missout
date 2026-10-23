import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export type HeroAction = {
  label: string
  /** Short accessible name for the live region */
  srLabel?: string
}

const DEFAULT_ACTIONS: readonly HeroAction[] = [
  { label: 'create' },
  { label: 'register' },
  { label: 'check in' },
  { label: 'update' },
]

const ROTATE_MS = 2400

type RotatingActionPillProps = {
  actions?: readonly HeroAction[]
  className?: string
  /** Interval between action changes */
  intervalMs?: number
}

/**
 * Notion-style inline action pill - cycles verbs inside the hero one-liner.
 * Brand tint uses Missout pink instead of Notion purple.
 */
export function RotatingActionPill({
  actions = DEFAULT_ACTIONS,
  className,
  intervalMs = ROTATE_MS,
}: RotatingActionPillProps) {
  const reduceMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const current = actions[index] ?? actions[0]

  useEffect(() => {
    if (reduceMotion || actions.length < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % actions.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [actions, intervalMs, reduceMotion])

  if (!current) return null

  return (
    <span
      className={cn(
        'relative inline-flex max-w-full align-middle',
        'rounded-full bg-[#F92C99]/12',
        'px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2',
        className,
      )}
    >
      <span className="inline-flex max-w-full items-center gap-2 sm:gap-2.5">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#F92C99] sm:h-3 sm:w-3"
          aria-hidden
        />
          <span className="relative inline-grid min-w-0 text-left" aria-hidden>
          {/* Width reserve: longest label so the line doesn’t jump */}
          <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
            {[...actions].sort((a, b) => b.label.length - a.label.length)[0]?.label}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={current.label}
              className="col-start-1 row-start-1 whitespace-nowrap text-[#1A1A1A]"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.label}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
      <span className="sr-only" aria-live="polite">
        {current.srLabel ?? current.label}
      </span>
    </span>
  )
}
