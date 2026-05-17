import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type FloatingProductPillProps = {
  label: 'Missout' | 'Backnd'
  className?: string
  /** Slight vertical offset (right tile sits a bit higher in the comp) */
  align?: 'left' | 'right'
}

/**
 * Thin pink ring + square icon, pastel pill with brand-pink bold label — product page link.
 */
export function FloatingProductPill({
  label,
  className,
  align = 'left',
}: FloatingProductPillProps) {
  const to =
    label === 'Missout' ? '/product#discover-events' : '/product#manage-backnd'
  const ariaLabel =
    label === 'Missout'
      ? 'Missout — discover events'
      : 'Backnd — manage your event'

  return (
    <Link
      to={to}
      className={cn(
        'group flex flex-col items-center gap-3 no-underline outline-none',
        'focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#F92C99] focus-visible:ring-offset-2',
        align === 'right' && 'md:-translate-y-2',
        className,
      )}
      aria-label={ariaLabel}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#F92C99] bg-white transition-transform duration-200 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]">
        <span className="h-4 w-4 bg-[#F92C99] sm:h-4 sm:w-4" aria-hidden />
      </span>
      <span
        className="rounded-full bg-[#FCE8F2] px-5 py-2 text-center font-sans text-sm font-bold leading-snug tracking-tight text-[#F92C99] sm:px-6 sm:py-2.5 sm:text-[15px]"
        aria-hidden
      >
        {label}
      </span>
    </Link>
  )
}
