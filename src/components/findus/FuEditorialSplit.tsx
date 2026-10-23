import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { FuBody, FuTitle } from './FuTypography'

export type FuEditorialSplitProps = {
  title: string
  body: ReactNode
  aside?: ReactNode
  className?: string
}

/** Notion-style two-column editorial block — headline left, prose right on desktop. */
export function FuEditorialSplit({ title, body, aside, className }: FuEditorialSplitProps) {
  return (
    <div className={className}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:items-start">
        <FuTitle level="h2" className="lg:sticky lg:top-24">
          {title}
        </FuTitle>
        <div>
          {typeof body === 'string' ? <FuBody>{body}</FuBody> : body}
          {aside ? <div className="mt-10">{aside}</div> : null}
        </div>
      </div>
    </div>
  )
}

export type FuInsetPanelProps = {
  children?: ReactNode
  className?: string
}

/** White inset panel on surface sections — card-within-section. */
export function FuInsetPanel({ children, className }: FuInsetPanelProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-canvas)] p-6 sm:p-8 lg:p-10',
        className,
      )}
    >
      {children}
    </div>
  )
}
