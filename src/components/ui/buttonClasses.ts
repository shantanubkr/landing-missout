import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'outline'
export type ButtonTheme = 'home' | 'product'
export type ButtonSize = 'sm' | 'md' | 'lg'

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-9',
  md: 'px-7 py-2.5 text-base min-h-11',
  lg: 'px-9 py-3 text-lg min-h-12',
}

const baseClass =
  'inline-flex items-center justify-center font-sans font-medium rounded-full border-0 transition-[color,background-color,border-color,transform,opacity] duration-200 ease-out select-none outline-none ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none '

const focusRing: Record<ButtonTheme, string> = {
  home: 'focus-visible:outline-[#F92C99]',
  product: 'focus-visible:outline-[#006AFE]',
}

const primaryClass: Record<ButtonTheme, string> = {
  home:
    'bg-[#F92C99] text-white ' +
    'hover:bg-[#E11E85] ' +
    'active:bg-[#C91872] active:scale-[0.98] motion-reduce:active:scale-100 ' +
    'disabled:bg-[#F92C99] disabled:opacity-50 disabled:scale-100',
  product:
    'bg-[#006AFE] text-white ' +
    'hover:bg-[#0056E0] ' +
    'active:bg-[#0047B8] active:scale-[0.98] motion-reduce:active:scale-100 ' +
    'disabled:bg-[#006AFE] disabled:opacity-50 disabled:scale-100',
}

const outlineClass: Record<ButtonTheme, string> = {
  home:
    'bg-transparent text-[#F92C99] border-2 border-[#F92C99] ' +
    'hover:bg-[#F92C99]/6 hover:border-[#E11E85] hover:text-[#E11E85] ' +
    'active:bg-[#F92C99]/10 active:scale-[0.98] motion-reduce:active:scale-100 ' +
    'disabled:border-[#F92C99] disabled:text-[#F92C99] disabled:opacity-50 disabled:scale-100',
  product:
    'bg-transparent text-[#006AFE] border-2 border-[#006AFE] ' +
    'hover:bg-[#006AFE]/6 hover:border-[#0056E0] hover:text-[#0056E0] ' +
    'active:bg-[#006AFE]/10 active:scale-[0.98] motion-reduce:active:scale-100 ' +
    'disabled:border-[#006AFE] disabled:text-[#006AFE] disabled:opacity-50 disabled:scale-100',
}

export type ButtonClassOptions = {
  variant?: ButtonVariant
  theme?: ButtonTheme
  size?: ButtonSize
  className?: string
}

export function getButtonClassName({
  variant = 'primary',
  theme = 'home',
  size = 'md',
  className,
}: ButtonClassOptions = {}) {
  return cn(
    baseClass,
    focusRing[theme],
    sizeClass[size],
    variant === 'primary' ? primaryClass[theme] : outlineClass[theme],
    'cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none',
    className,
  )
}
