import { cn } from '../../lib/cn'
import { FuCard } from './FuCard'
import { FuMeta, FuTitle } from './FuTypography'

export type FuPersonCardProps = {
  name: string
  role: string
  className?: string
}

/** Team member tile — photo placeholder until assets ship. */
export function FuPersonCard({ name, role, className }: FuPersonCardProps) {
  return (
    <FuCard variant="default" className={cn('h-full', className)}>
      <div
        className="mb-4 flex aspect-[4/5] items-center justify-center rounded-[var(--fu-radius-sm)] bg-[var(--fu-surface)]"
        aria-hidden
      >
        <FuMeta className="normal-case">Photo later</FuMeta>
      </div>
      <FuTitle level="h3" className="mb-1 text-lg">
        {name}
      </FuTitle>
      <p className="fu-type-body-sm m-0 text-[var(--fu-ink-muted)]">{role}</p>
    </FuCard>
  )
}

export type FuBulletListProps = {
  items: readonly string[]
  className?: string
}

export function FuBulletList({ items, className }: FuBulletListProps) {
  return (
    <ul className={cn('m-0 grid max-w-2xl list-none gap-3 p-0', className)}>
      {items.map((item) => (
        <li
          key={item}
          className="fu-type-body-sm relative pl-5 text-[var(--fu-ink-secondary)] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--fu-ink-subtle)] before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
