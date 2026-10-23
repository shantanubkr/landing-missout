import { useId, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { MissoutIcon } from '../icons'
import { fuFocusRing } from '../../lib/design/findusMotion'
import { FuBody, FuTitle } from './FuTypography'

export type FuFaqItem = {
  id: string
  question: string
  answer: ReactNode
}

export type FuFaqProps = {
  heading?: string
  items: readonly FuFaqItem[]
  className?: string
}

/** Accessible accordion FAQ — blue open indicator. */
export function FuFaq({ heading = 'FAQ', items, className }: FuFaqProps) {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className={className}>
      <FuTitle level="h2" className="mb-6">
        {heading}
      </FuTitle>
      <div className="divide-y divide-[var(--fu-hairline)] rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-canvas)]">
        {items.map((item) => {
          const panelId = `${baseId}-${item.id}`
          const isOpen = openId === item.id

          return (
            <div key={item.id}>
              <button
                type="button"
                id={`${panelId}-button`}
                className={cn(
                  'flex w-full items-center justify-between gap-4 px-5 py-4 text-left fu-type-body-sm font-semibold text-[var(--fu-ink)]',
                  fuFocusRing,
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                <MissoutIcon
                  name="chevronDown"
                  size={16}
                  className={cn(
                    'shrink-0 text-[var(--fu-ink-muted)] transition-transform duration-150',
                    isOpen && 'rotate-180 text-[var(--fu-brand-blue)]',
                  )}
                />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={`${panelId}-button`}
                hidden={!isOpen}
                className="px-5 pb-4"
              >
                <FuBody size="sm">{item.answer}</FuBody>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
