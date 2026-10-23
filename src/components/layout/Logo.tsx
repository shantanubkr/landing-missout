import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { BrandWordmark } from '../brand/BrandWordmark'

type LogoLinkProps = {
  className?: string
  /** Focus ring - match marketing (`home`) vs product route accent. */
  focusAccent?: 'home' | 'product'
}

/**
 * Wordmark in the nav - uses the wordmark SVG from `/public/brand`.
 * Other brand assets: `missout_star.svg`, `missout_outline_star.svg`.
 */
export function Logo({ className, focusAccent = 'home' }: LogoLinkProps) {
  const focusRing =
    focusAccent === 'product'
      ? 'focus-visible:outline-[#006AFE]'
      : 'focus-visible:outline-[#F92C99]'

  return (
    <Link
      to="/"
      className={cn(
        'inline-flex shrink-0 items-center outline-none',
        'focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        focusRing,
        className,
      )}
      aria-label="Missout home"
    >
      <BrandWordmark size="sm" />
    </Link>
  )
}
