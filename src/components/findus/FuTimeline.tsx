import { useRef } from 'react'
import { cn } from '../../lib/cn'
import { useScrollActiveIndex } from '../../hooks/useScrollActiveIndex'
import { FuTitle } from './FuTypography'

export type FuTimelineItem = {
  title: string
  body?: string
  index?: number
}

export type FuTimelineProps = {
  steps: readonly FuTimelineItem[]
  /** Wrap steps in a white inset panel (Notion-style on canvas sections). */
  inset?: boolean
  /** Horizontal connected rail with scroll-driven active step. */
  rail?: boolean
  className?: string
}

/**
 * Lifecycle steps — quiet editorial numbering, optional lime marker on active step.
 */
export function FuTimeline({ steps, inset = false, rail = false, className }: FuTimelineProps) {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])
  const activeIndex = useScrollActiveIndex(stepRefs, steps.length)

  const list = (
    <ol
      className={cn(
        'm-0 grid list-none gap-8 p-0',
        rail ? 'md:grid-cols-4 md:gap-0' : 'md:grid-cols-4 md:gap-6',
        inset && !rail && 'md:gap-8',
        className,
      )}
    >
      {steps.map((step, i) => {
        const active = rail && activeIndex === i

        return (
          <li
            key={step.title}
            ref={(el) => {
              stepRefs.current[i] = el
            }}
            className={cn(
              'relative flex gap-4 md:flex-col md:gap-3',
              rail && 'md:px-4 md:pb-0',
              rail && i < steps.length - 1 && 'md:border-r md:border-[var(--fu-hairline)]',
            )}
          >
            <div className="flex shrink-0 items-center gap-2">
              <span
                className={cn(
                  'fu-type-meta tabular-nums transition-colors',
                  active ? 'text-[var(--fu-ink)]' : 'text-[var(--fu-ink-subtle)]',
                )}
              >
                {String(step.index ?? i + 1).padStart(2, '0')}
              </span>
              {active ? (
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--fu-brand-lime)] motion-safe:transition-transform motion-safe:duration-300"
                  aria-hidden
                />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--fu-hairline-strong)]" aria-hidden />
              )}
            </div>
            <div>
              <FuTitle
                level="h3"
                className={cn(
                  'mb-0 transition-colors',
                  active ? 'text-[var(--fu-ink)]' : 'text-[var(--fu-ink-secondary)]',
                )}
              >
                {step.title}
              </FuTitle>
              {step.body && !rail ? <p className="fu-type-body-sm m-0 mt-2 text-[var(--fu-ink-muted)]">{step.body}</p> : null}
            </div>
          </li>
        )
      })}
    </ol>
  )

  if (!inset) return list

  return (
    <div className="rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-surface)] p-6 sm:p-8">
      {list}
    </div>
  )
}
