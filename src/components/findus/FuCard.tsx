import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { FU_ELEVATION } from '../../lib/design/findus'
import { fuFocusRing, fuMotion } from '../../lib/design/findusMotion'

export type FuCardVariant =
  | 'default'
  | 'media'
  | 'quote'
  /** @deprecated Kitchen sink / accent demos only */
  | 'tint-blue'
  /** @deprecated Kitchen sink / accent demos only */
  | 'tint-pink'
  /** @deprecated Kitchen sink / accent demos only */
  | 'tint-lime'
  /** @deprecated Kitchen sink / accent demos only */
  | 'solid-blue'
  /** @deprecated Kitchen sink / accent demos only */
  | 'solid-pink'
  /** @deprecated Kitchen sink / accent demos only */
  | 'solid-lime'

export type FuCardProps<T extends ElementType = 'div'> = {
  as?: T
  variant?: FuCardVariant
  className?: string
  children?: ReactNode
  interactive?: boolean
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

const variantClass: Record<FuCardVariant, string> = {
  default: 'bg-[var(--fu-canvas)]',
  media: 'bg-[var(--fu-canvas)]',
  quote: 'bg-[var(--fu-canvas)]',
  'tint-blue': 'bg-[var(--fu-tint-blue-soft)]',
  'tint-pink': 'bg-[var(--fu-tint-pink-soft)]',
  'tint-lime': 'bg-[var(--fu-tint-lime-soft)]',
  'solid-blue': 'bg-[var(--fu-brand-blue)] text-white',
  'solid-pink': 'bg-[var(--fu-brand-pink)] text-white',
  'solid-lime': 'bg-[var(--fu-brand-lime)] text-[var(--fu-band-lime-ink)]',
}

/**
 * Marketing card surface — radius 12, hairline border, optional hover lift.
 */
export function FuCard<T extends ElementType = 'div'>({
  as,
  variant = 'default',
  className,
  children,
  interactive = false,
  ...rest
}: FuCardProps<T>) {
  const Tag = as ?? 'div'

  return (
    <Tag
      className={cn(
        'block rounded-[var(--fu-radius)] p-5 sm:p-6',
        FU_ELEVATION.card,
        variantClass[variant],
        variant === 'media' && FU_ELEVATION.media,
        interactive && [fuMotion.hoverLift, FU_ELEVATION.cardHover, fuFocusRing, 'cursor-pointer'],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
