import { forwardRef, type ButtonHTMLAttributes, type Ref } from 'react'
import {
  getButtonClassName,
  type ButtonSize,
  type ButtonTheme,
  type ButtonVariant,
} from './buttonClasses'

export type { ButtonVariant, ButtonTheme, ButtonSize } from './buttonClasses'

export type ButtonProps = {
  /** Solid fill (brand) or pill outline. */
  variant?: ButtonVariant
  /** `home` = brand pink (#F92C99); `product` = blue (#006AFE). */
  theme?: ButtonTheme
  /** Padding and type scale. */
  size?: ButtonSize
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef(function Button(
  {
    className,
    variant = 'primary',
    theme = 'home',
    size = 'md',
    type = 'button',
    disabled,
    ...rest
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={getButtonClassName({ variant, theme, size, className })}
      {...rest}
    />
  )
})

Button.displayName = 'Button'
