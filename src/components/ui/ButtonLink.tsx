import { forwardRef, type Ref } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { type ButtonClassOptions, getButtonClassName } from './buttonClasses'

type ButtonStyleProps = Pick<
  ButtonClassOptions,
  'variant' | 'theme' | 'size' | 'className'
>

export type ButtonLinkProps = ButtonStyleProps &
  Omit<LinkProps, 'className'> & { className?: string }

/**
 * `Button` styling on a React Router `Link` (e.g. nav CTAs that route instead of `submit`).
 */
export const ButtonLink = forwardRef(function ButtonLink(
  {
    variant = 'primary',
    theme = 'home',
    size = 'md',
    className,
    ...linkProps
  }: ButtonLinkProps,
  ref: Ref<HTMLAnchorElement>,
) {
  return (
    <Link
      ref={ref}
      className={getButtonClassName({ variant, theme, size, className })}
      {...linkProps}
    />
  )
})

ButtonLink.displayName = 'ButtonLink'
