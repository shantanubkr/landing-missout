import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { fuFocusRing, fuFocusRingOnDark, fuMotion } from '../../lib/design/findusMotion'

export type FuButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'lime'
export type FuButtonSize = 'md' | 'lg'

export type FuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: FuButtonVariant
  size?: FuButtonSize
  children?: ReactNode
}

type FuButtonLinkProps = LinkProps & {
  variant?: FuButtonVariant
  size?: FuButtonSize
  className?: string
  children?: ReactNode
}

type FuButtonAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: FuButtonVariant
  size?: FuButtonSize
  children?: ReactNode
}

const sizeClass: Record<FuButtonSize, string> = {
  md: 'fu-type-button min-h-11 px-5 py-2.5 sm:min-h-10',
  lg: 'fu-type-button min-h-11 px-6 py-3 text-base sm:min-h-11 sm:px-8',
}

const variantClass: Record<FuButtonVariant, string> = {
  primary:
    'border border-transparent bg-[var(--fu-brand-blue)] text-white hover:opacity-90 ' + fuFocusRing,
  secondary:
    'border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-transparent text-[var(--fu-ink)] hover:border-[var(--fu-card-border-hover)] hover:bg-[var(--fu-surface)] ' +
    fuFocusRing,
  ghost:
    'border border-transparent bg-transparent text-[var(--fu-ink-secondary)] hover:bg-[var(--fu-surface)] ' +
    fuFocusRing,
  inverse:
    'border border-white/30 bg-white text-[var(--fu-ink)] hover:bg-white/90 ' + fuFocusRingOnDark,
  lime:
    'border border-transparent bg-[var(--fu-brand-lime)] text-[var(--fu-band-lime-ink)] hover:opacity-90 ' +
    fuFocusRing,
}

function baseButtonClass(variant: FuButtonVariant, size: FuButtonSize, className?: string) {
  return cn(
    'inline-flex items-center justify-center rounded-[var(--fu-radius)] no-underline',
    fuMotion.ui,
    fuMotion.hoverLift,
    fuMotion.chipPress,
    fuMotion.reduced,
    sizeClass[size],
    variantClass[variant],
    className,
  )
}

/** Shared CTA button — min 44px touch on phone. Radius 12px. */
export function FuButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}: FuButtonProps) {
  return (
    <button type={type} className={baseButtonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}

export function FuButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: FuButtonLinkProps) {
  return (
    <Link className={baseButtonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  )
}

export function FuButtonAnchor({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: FuButtonAnchorProps) {
  return (
    <a className={baseButtonClass(variant, size, className)} {...rest}>
      {children}
    </a>
  )
}
