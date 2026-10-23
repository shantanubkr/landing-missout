import { forwardRef, type AnchorHTMLAttributes, type Ref } from 'react'
import { type ButtonClassOptions, getButtonClassName } from './buttonClasses'

export type ButtonAnchorProps = Pick<
  ButtonClassOptions,
  'variant' | 'theme' | 'size' | 'className'
> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    className?: string
  }

/** Button styling on a plain `<a>` (external product links). */
export const ButtonAnchor = forwardRef(function ButtonAnchor(
  {
    variant = 'primary',
    theme = 'home',
    size = 'md',
    className,
    ...anchorProps
  }: ButtonAnchorProps,
  ref: Ref<HTMLAnchorElement>,
) {
  return (
    <a
      ref={ref}
      className={getButtonClassName({ variant, theme, size, className })}
      {...anchorProps}
    />
  )
})

ButtonAnchor.displayName = 'ButtonAnchor'
