import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function BentoSlotPlaceholder({
  slot,
  folder,
}: {
  slot: string
  /** Public path segment under `public/product/` */
  folder: 'manage-bento' | 'discover-bento'
}) {
  return (
    <div className="flex min-h-[120px] flex-1 flex-col items-center justify-center gap-2 bg-[#F5F5F5] px-4 py-8 md:min-h-[140px]">
      <span className="font-body text-xs font-medium text-[#9A9A9A]">Screenshot placeholder</span>
      <span className="font-body text-[10px] uppercase tracking-[0.14em] text-[#C5C5C5]">
        Slot {slot} — add image to{' '}
        <code className="rounded bg-black/[0.06] px-1 py-0.5 text-[9px] text-[#666]">
          public/product/{folder}/
        </code>
      </span>
    </div>
  )
}

export function BentoCard({
  slot,
  folder,
  className,
  children,
  variant = 'default',
}: {
  slot: string
  folder: 'manage-bento' | 'discover-bento'
  className?: string
  children?: ReactNode
  /** `default` — white fill + border + shadow. `flush` — image-only (no border/shadow). */
  variant?: 'default' | 'flush'
}) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-col overflow-hidden rounded-[22px]',
        variant === 'default' &&
          'border border-[#E8E8E8] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]',
        variant === 'flush' && 'border-0 bg-transparent shadow-none ring-0',
        className,
      )}
    >
      {children ?? <BentoSlotPlaceholder slot={slot} folder={folder} />}
    </div>
  )
}
