import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type FuEyebrowProps = {
  tone?: 'neutral' | 'blue' | 'pink' | 'lime'
  className?: string
  children?: ReactNode
}

export function FuEyebrow({ tone = 'neutral', className, children }: FuEyebrowProps) {
  const toneClass = {
    neutral: 'text-[var(--fu-ink-muted)]',
    blue: 'text-[var(--fu-brand-blue)]',
    pink: 'text-[var(--fu-brand-pink)]',
    lime: 'text-[var(--fu-ink-secondary)]',
  }[tone]

  return (
    <p className={cn('fu-type-meta m-0 normal-case tracking-[0.06em]', toneClass, className)}>
      {children}
    </p>
  )
}

export type FuDisplayProps<T extends ElementType = 'h1'> = {
  as?: T
  className?: string
  children?: ReactNode
}

/** Page hero H1 — Polymath semibold only. */
export function FuDisplay<T extends ElementType = 'h1'>({
  as,
  className,
  children,
}: FuDisplayProps<T>) {
  const Tag = as ?? 'h1'
  return <Tag className={cn('fu-type-display', className)}>{children}</Tag>
}

export type FuTitleProps<T extends ElementType = 'h2'> = {
  as?: T
  level?: 'title' | 'h2' | 'h3'
  className?: string
  children?: ReactNode
}

export function FuTitle<T extends ElementType = 'h2'>({
  as,
  level = 'h2',
  className,
  children,
}: FuTitleProps<T>) {
  const Tag = as ?? 'h2'
  const levelClass = {
    title: 'fu-type-title',
    h2: 'fu-type-h2',
    h3: 'fu-type-h3',
  }[level]

  return <Tag className={cn(levelClass, className)}>{children}</Tag>
}

export type FuBodyProps = {
  size?: 'default' | 'sm'
  muted?: boolean
  className?: string
  children?: ReactNode
}

export function FuBody({ size = 'default', muted = false, className, children }: FuBodyProps) {
  return (
    <p
      className={cn(
        size === 'sm' ? 'fu-type-body-sm' : 'fu-type-body',
        muted ? 'text-[var(--fu-ink-muted)]' : 'text-[var(--fu-ink-secondary)]',
        'm-0',
        className,
      )}
    >
      {children}
    </p>
  )
}

export type FuMetaProps = {
  className?: string
  children?: ReactNode
}

export function FuMeta({ className, children }: FuMetaProps) {
  return (
    <p className={cn('fu-type-meta m-0 normal-case text-[var(--fu-ink-subtle)]', className)}>
      {children}
    </p>
  )
}
