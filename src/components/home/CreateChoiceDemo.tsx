import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EVENT_TYPES } from '../../lib/productArchitecture'
import { ProductDemoFrame } from './ProductDemoFrame'

const TYPE_DETAIL: Record<string, string> = {
  competition: 'Rounds, teams, and registrations.',
  workshop: 'Sessions, capacity, and signups.',
  performance: 'Lineups, timing, and doors.',
  seminar: 'Talks, speakers, and RSVPs.',
}

/**
 * Create Event and Host a Festival as two separate light windows - same theme, different jobs.
 */
export function CreateChoiceDemo({ className }: { className?: string }) {
  const reduceMotion = usePrefersReducedMotion()
  const [eventType, setEventType] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setEventType((i) => (i + 1) % EVENT_TYPES.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  const selectedType = EVENT_TYPES[eventType]!

  return (
    <div
      className={cn(
        'grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-5',
        className,
      )}
    >
      {/* Create Event */}
      <ProductDemoFrame title="Backstage · Create Event">
        <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="border-b border-[#E8E8E8] p-5 sm:border-b-0 sm:border-r sm:p-6">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-[#9A9A9A]">
              Everyday path
            </p>
            <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-[#5A5A5A]">
              Pick a type, then build the event. This is what organisers use most.
            </p>

            <ul className="mt-4 divide-y divide-[#EFEFEF] border-y border-[#EFEFEF]">
              {EVENT_TYPES.map((type, i) => {
                const selected = i === eventType
                return (
                  <li key={type.id}>
                    <button
                      type="button"
                      onClick={() => setEventType(i)}
                      className={cn(
                        'flex w-full items-center gap-3 py-3 text-left transition-colors',
                        'active:scale-[0.995] motion-reduce:active:scale-100',
                        selected ? 'bg-[#FDF2F8]' : 'bg-transparent hover:bg-[#FAFAFA]',
                      )}
                    >
                      <span
                        className={cn(
                          'ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                          selected
                            ? 'border-[#F92C99] bg-[#F92C99]'
                            : 'border-[#C5C5C5] bg-white',
                        )}
                        aria-hidden
                      >
                        {selected ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        ) : null}
                      </span>
                      <span
                        className={cn(
                          'font-sans text-sm font-semibold',
                          selected ? 'text-[#1A1A1A]' : 'text-[#5A5A5A]',
                        )}
                      >
                        {type.label}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex flex-col justify-between bg-[#FAFAFA] p-5 sm:p-6">
            <div>
              <p className="font-sans text-xs font-medium text-[#9A9A9A]">Selected</p>
              <p className="mt-1 font-sans text-xl font-bold tracking-tight text-[#1A1A1A] sm:text-2xl">
                {selectedType.label}
              </p>
              <p className="mt-2 font-sans text-sm text-[#5A5A5A]">
                {TYPE_DETAIL[selectedType.id]}
              </p>

              <div className="mt-5 space-y-2.5">
                <div className="h-10 rounded-xl border border-[#E8E8E8] bg-white px-3 font-sans text-xs leading-10 text-[#9A9A9A]">
                  Event name
                </div>
                <div className="h-10 rounded-xl border border-[#E8E8E8] bg-white px-3 font-sans text-xs leading-10 text-[#9A9A9A]">
                  Date · venue
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F92C99] px-4 py-3 font-sans text-sm font-semibold text-white transition-transform active:scale-[0.96] sm:w-auto sm:self-end"
            >
              Create {selectedType.label}
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </ProductDemoFrame>

      {/* Host a Festival - separate window, same light theme */}
      <ProductDemoFrame title="Backstage · Host a Festival">
        <div className="flex h-full flex-col justify-between p-5 sm:p-6">
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-[#9A9A9A]">
              Separate path
            </p>
            <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-[#5A5A5A]">
              Rare, heavier ops. Parent structure first, then child events underneath.
            </p>

            <div className="mt-5 space-y-2.5">
              <div className="rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] px-4 py-3">
                <p className="font-sans text-xs font-medium text-[#9A9A9A]">Festival</p>
                <p className="mt-0.5 font-sans text-sm font-semibold text-[#1A1A1A]">
                  Parent container
                </p>
              </div>
              <div className="ml-3 space-y-2 border-l-2 border-[#F92C99]/30 pl-3">
                {['Competition', 'Workshop', 'Performance'].map((child) => (
                  <div
                    key={child}
                    className="rounded-lg border border-[#E8E8E8] bg-white px-3 py-2"
                  >
                    <p className="font-sans text-sm font-medium text-[#1A1A1A]">{child}</p>
                    <p className="font-sans text-[11px] text-[#9A9A9A]">Child event</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F92C99] px-4 py-3 font-sans text-sm font-semibold text-white transition-transform active:scale-[0.96] sm:w-auto sm:self-start"
          >
            Create festival
            <span aria-hidden>→</span>
          </button>
        </div>
      </ProductDemoFrame>
    </div>
  )
}
