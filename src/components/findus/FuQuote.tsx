import { cn } from '../../lib/cn'
import { FuCard } from './FuCard'
import { FuMeta, FuTitle } from './FuTypography'

export type FuQuoteProps = {
  quote: string
  name: string
  role?: string
  org?: string
  avatar?: string
  accent?: 'pink' | 'lime'
  className?: string
}

/** Testimonial block — Argent-friendly quote with brand accent mark. */
export function FuQuote({
  quote,
  name,
  role,
  org,
  avatar,
  accent = 'pink',
  className,
}: FuQuoteProps) {
  const markColor =
    accent === 'pink' ? 'text-[var(--fu-brand-pink)]' : 'text-[var(--fu-brand-lime)]'

  return (
    <FuCard variant="quote" className={cn('relative', className)}>
      <span
        className={cn('absolute left-5 top-3 text-5xl leading-none text-[var(--fu-ink-subtle)]', markColor)}
        aria-hidden
      >
        “
      </span>
      <blockquote className="m-0 pt-6">
        <p className="fu-type-title m-0 mb-5 pl-2 text-2xl leading-snug sm:text-3xl">{quote}</p>
        <footer className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt=""
              className="h-11 w-11 rounded-[var(--fu-radius)] object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--fu-radius)] bg-[var(--fu-surface)] fu-type-meta">
              PL
            </div>
          )}
          <div>
            <FuTitle level="h3" className="text-base">
              {name}
            </FuTitle>
            <FuMeta className="normal-case">
              {[role, org].filter(Boolean).join(' · ')}
            </FuMeta>
          </div>
        </footer>
      </blockquote>
    </FuCard>
  )
}
