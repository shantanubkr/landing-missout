import type { IconName } from '../icons'
import { cn } from '../../lib/cn'
import { FuIconChip } from './FuIconChip'
import { FuBody, FuTitle } from './FuTypography'

export type FuProblemTile = {
  icon: IconName
  label: string
}

export type FuProblemVisualProps = {
  title: string
  subtitle?: string
  tiles: readonly FuProblemTile[]
  className?: string
}

const MESS_FRAGMENTS = ['Google Forms', 'Sheets', 'WhatsApp', 'Clipboard'] as const

/** Problem band — short H2, visual tiles, optional mess strip. No essay body. */
export function FuProblemVisual({ title, subtitle, tiles, className }: FuProblemVisualProps) {
  return (
    <div className={cn('max-w-4xl', className)}>
      <FuTitle level="h2" className="mb-3 max-w-xl">
        {title}
      </FuTitle>
      {subtitle ? <FuBody className="mb-8 max-w-lg">{subtitle}</FuBody> : null}

      <div className="mb-8 flex flex-wrap gap-2">
        {MESS_FRAGMENTS.map((label) => (
          <span
            key={label}
            className="rounded-[var(--fu-radius-sm)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-surface)] px-3 py-2 fu-type-body-sm text-[var(--fu-ink-muted)] line-through decoration-[var(--fu-hairline-strong)]"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="flex flex-col items-start gap-3 rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-surface)] p-5"
          >
            <FuIconChip name={tile.icon} tint="neutral" />
            <p className="fu-type-h3 m-0 text-base">{tile.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
