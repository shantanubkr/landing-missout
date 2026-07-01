import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { getSiteUrl } from '../../lib/siteUrl'

const STAGE_HREF = getSiteUrl() ?? 'https://missout.in'

type FloatingProductPillProps = {
  label: 'Stage' | 'Backstage'
  className?: string
  /** Slight vertical offset (right tile sits a bit higher in the comp) */
  align?: 'left' | 'right'
  /** When set on Stage, opens waitlist instead of linking out */
  onClick?: () => void
}

function NowLiveBadge() {
  return (
    <span
      className={cn(
        'absolute -top-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap',
        'rounded-full border border-white/90 bg-gradient-to-r from-[#F92C99] via-[#FF5CB8] to-[#E11E85]',
        'px-2.5 py-1 shadow-[0_3px_14px_rgba(249,44,153,0.34)]',
        'sm:-top-3 sm:gap-2 sm:px-3 sm:py-1.5',
      )}
      aria-hidden
    >
      <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-80" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2" />
      </span>
      <span className="font-sans text-[9px] font-bold uppercase leading-none tracking-[0.1em] text-white sm:text-[10px]">
        Now live
      </span>
    </span>
  )
}

const pillLinkClassName = cn(
  'group flex flex-col items-center gap-3 no-underline outline-none',
  'focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#F92C99] focus-visible:ring-offset-2',
)

/**
 * Thin pink ring + square icon, pastel pill with brand-pink bold label — product page link.
 */
export function FloatingProductPill({
  label,
  className,
  align = 'left',
  onClick,
}: FloatingProductPillProps) {
  const isBackstage = label === 'Backstage'
  const ariaLabel = isBackstage
    ? 'Backstage: manage your event, now live'
    : onClick
      ? 'Stage: join the waitlist'
      : 'Stage: open missout.in'

  const content = (
    <>
      <span className="relative">
        {isBackstage ? <NowLiveBadge /> : null}
        <span
          className={cn(
            'flex h-16 w-16 items-center justify-center rounded-full border bg-white transition-transform duration-200 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]',
            isBackstage
              ? 'border-[#F92C99] shadow-[0_0_0_4px_rgba(252,232,242,0.9)]'
              : 'border-[#F92C99]',
          )}
        >
          <span className="h-4 w-4 bg-[#F92C99] sm:h-4 sm:w-4" aria-hidden />
        </span>
      </span>
      <span
        className={cn(
          'rounded-full px-5 py-2 text-center font-sans text-sm font-bold leading-snug tracking-tight sm:px-6 sm:py-2.5 sm:text-[15px]',
          isBackstage
            ? 'border border-[#F92C99]/20 bg-gradient-to-b from-white to-[#FCE8F2] text-[#F92C99] shadow-[0_4px_18px_rgba(249,44,153,0.12)]'
            : 'bg-[#FCE8F2] text-[#F92C99]',
        )}
        aria-hidden
      >
        {label}
      </span>
    </>
  )

  if (isBackstage) {
    return (
      <Link
        to="/product#manage-backstage"
        className={cn(pillLinkClassName, align === 'right' && 'md:-translate-y-2', className)}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          pillLinkClassName,
          'cursor-pointer border-0 bg-transparent p-0',
          align === 'right' && 'md:-translate-y-2',
          className,
        )}
        aria-label={ariaLabel}
      >
        {content}
      </button>
    )
  }

  return (
    <a
      href={STAGE_HREF}
      className={cn(pillLinkClassName, align === 'right' && 'md:-translate-y-2', className)}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  )
}
