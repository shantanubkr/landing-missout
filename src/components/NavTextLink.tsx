import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

type NavTextLinkProps = {
  to: string
  children: string
  className?: string
  style?: CSSProperties
}

/** GitHub-style nav label: fade + underline grow on hover/focus. */
export function NavTextLink({ to, children, className = '', style }: NavTextLinkProps) {
  return (
    <Link
      to={to}
      className={`nav-text-link group relative inline-block text-black no-underline ${className}`}
      style={style}
    >
      <span className="nav-text-link-inner relative inline-block overflow-hidden">
        <span className="nav-text-link-line block group-hover:-translate-y-full group-focus-visible:-translate-y-full">
          {children}
        </span>
        <span
          className="nav-text-link-line absolute left-0 top-full block text-[#f92c99] group-hover:-translate-y-full group-focus-visible:-translate-y-full"
          aria-hidden
        >
          {children}
        </span>
      </span>
    </Link>
  )
}

type NavTextButtonProps = {
  children: string
  className?: string
  style?: CSSProperties
  onClick?: () => void
  expanded?: boolean
  hasPopup?: boolean
}

export function NavTextButton({
  children,
  className = '',
  style,
  onClick,
  expanded,
  hasPopup,
}: NavTextButtonProps) {
  return (
    <button
      type="button"
      className={`nav-text-link group relative inline-flex items-center gap-1 border-0 bg-transparent p-0 font-display text-[18px] tracking-[0.18px] text-black ${className}`}
      style={style}
      onClick={onClick}
      aria-expanded={expanded}
      aria-haspopup={hasPopup}
    >
      <span className="nav-text-link-inner relative inline-block overflow-hidden">
        <span className="nav-text-link-line block group-hover:-translate-y-full group-focus-visible:-translate-y-full">
          {children}
        </span>
        <span
          className="nav-text-link-line absolute left-0 top-full block text-[#f92c99] group-hover:-translate-y-full group-focus-visible:-translate-y-full"
          aria-hidden
        >
          {children}
        </span>
      </span>
    </button>
  )
}
