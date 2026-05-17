import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

/** Full wordmark (124×27) — `public/brand/missout_horizontal.svg` */
const LOGO_HORIZONTAL_SRC = '/brand/missout_horizontal.svg'

type LogoLinkProps = {
  className?: string
  /** Focus ring — match marketing (`home`) vs product route accent. */
  focusAccent?: 'home' | 'product'
}

/**
 * Wordmark in the nav — uses the horizontal SVG from `/public/brand`.
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
      {/* Logo height 5% under previous h-5 (1.25rem) / md:h-6 (1.5rem) */}
      <img
        src={LOGO_HORIZONTAL_SRC}
        alt=""
        width={124}
        height={27}
        className="h-[1.1875rem] w-auto select-none md:h-[1.425rem]"
        decoding="async"
        draggable={false}
      />
    </Link>
  )
}
