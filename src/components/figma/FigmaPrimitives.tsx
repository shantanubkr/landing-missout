import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { GET_STARTED_HREF } from '../../lib/siteRoutes'
import { AnimatedText } from '../motion/AnimatedText'
import { RollText } from '../motion/RollText'

export function FigmaSection({
  children,
  className = '',
  tone = 'white',
  id,
}: {
  children: ReactNode
  className?: string
  tone?: 'white' | 'gray'
  id?: string
}) {
  return (
    <section
      id={id}
      className={`border-b border-line ${tone === 'gray' ? 'bg-[#f4f4f4]' : 'bg-white'} ${className}`}
    >
      {children}
    </section>
  )
}

const H1_SIZES = {
  xl: 'text-[clamp(44px,4.63vw,80px)]',
  lg: 'text-[clamp(38px,3.7vw,64px)]',
} as const

/** Page headline. Pass a string to get the word-rise animation. */
export function FigmaH1({
  children,
  className = '',
  size = 'lg',
  trigger = 'load',
  id,
}: {
  children: string
  className?: string
  size?: keyof typeof H1_SIZES
  trigger?: 'load' | 'view'
  id?: string
}) {
  return (
    <AnimatedText
      as="h1"
      text={children}
      trigger={trigger}
      delay={120}
      id={id}
      className={`font-display m-0 leading-[0.9] tracking-[0.01em] text-balance text-black ${H1_SIZES[size]} ${className}`}
    />
  )
}

export function FigmaH2({ children, className = '', id }: { children: string; className?: string; id?: string }) {
  return (
    <AnimatedText
      as="h2"
      text={children}
      id={id}
      className={`font-display m-0 text-[clamp(30px,3.01vw,52px)] leading-[0.95] tracking-[0.01em] text-balance text-black ${className}`}
    />
  )
}

export function FigmaBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`font-display m-0 text-[clamp(17px,1.27vw,22px)] leading-[1.35] tracking-[0.01em] text-pretty text-[#333] ${className}`}
    >
      {children}
    </p>
  )
}

const BUTTON_BASE =
  'anim-btn group font-display inline-flex h-[clamp(48px,3.53vw,61px)] min-w-[clamp(148px,10.5vw,182px)] shrink-0 items-center justify-center rounded-[6px] px-[clamp(20px,1.85vw,32px)] text-[clamp(18px,1.35vw,23px)] tracking-[0.01em] no-underline'

type ButtonLinkProps = {
  href?: string
  to?: string
  className: string
  children: ReactNode
  ariaLabel?: string
  onClick?: () => void
}

function ButtonLink({ href, to, className, children, ariaLabel, onClick }: ButtonLinkProps) {
  const content = typeof children === 'string' ? <RollText>{children}</RollText> : children
  if (to) {
    return (
      <Link to={to} className={className} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    )
  }
  const external = href?.startsWith('http')
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  )
}

export function FigmaButtonPrimary({
  href,
  to,
  children,
  className = '',
  onClick,
}: {
  href?: string
  to?: string
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <ButtonLink
      href={href ?? (to ? undefined : GET_STARTED_HREF)}
      to={to}
      onClick={onClick}
      className={`${BUTTON_BASE} bg-black text-white hover:bg-[#222] ${className}`}
    >
      {children}
    </ButtonLink>
  )
}

/** The Figma "outline" button: off-white tile, text colour varies. */
export function FigmaButtonSecondary({
  href,
  to,
  children,
  className = '',
  tone = 'pink',
  ariaLabel,
  onClick,
}: {
  href?: string
  to?: string
  children: ReactNode
  className?: string
  tone?: 'pink' | 'black'
  ariaLabel?: string
  onClick?: () => void
}) {
  return (
    <ButtonLink
      href={href}
      to={to}
      ariaLabel={ariaLabel}
      onClick={onClick}
      className={`${BUTTON_BASE} ${
        tone === 'pink'
          ? 'bg-brand-pink text-white hover:bg-[#e0258a]'
          : 'border border-line bg-[#fbfbfb] text-black hover:border-brand-pink/30 hover:bg-[#fff5fa]'
      } ${className}`}
    >
      {children}
    </ButtonLink>
  )
}

export function FigmaEyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-display m-0 text-[clamp(14px,1.04vw,18px)] uppercase tracking-[0.2em] text-[#666] ${className}`}>
      {children}
    </p>
  )
}
