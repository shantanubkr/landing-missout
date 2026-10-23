import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import type { IconName } from '../icons'
import { fuFocusRing, fuMotion } from '../../lib/design/findusMotion'
import { MissoutIcon } from '../icons'
import { FuMeta } from './FuTypography'

export type FuLinkCardAccent = {
  chip: string
  ink: string
  wash: string
}

/** Varied chip fills — cycled per card when `accent` is omitted. */
export const FU_LINK_CARD_ACCENTS: readonly FuLinkCardAccent[] = [
  { chip: 'var(--fu-blue-tint-1)', ink: 'var(--fu-brand-blue)', wash: 'var(--fu-blue-tint-0)' },
  { chip: 'var(--fu-pink-tint-2)', ink: 'var(--fu-brand-pink)', wash: 'var(--fu-pink-tint-0)' },
  { chip: 'var(--fu-lime-tint-1)', ink: 'var(--fu-ink-secondary)', wash: 'var(--fu-lime-tint-0)' },
  { chip: 'var(--fu-blue-tint-2)', ink: 'var(--fu-brand-blue)', wash: 'var(--fu-blue-tint-0)' },
  { chip: 'var(--fu-pink-tint-1)', ink: 'var(--fu-brand-pink)', wash: 'var(--fu-pink-tint-0)' },
  { chip: 'var(--fu-lime-tint-2)', ink: 'var(--fu-ink-secondary)', wash: 'var(--fu-lime-tint-0)' },
] as const

export type FuLinkCardItem = {
  title: string
  href: string
  iconName: IconName
  accent?: FuLinkCardAccent
}

export type FuLinkCardStripProps = {
  label?: string
  items: readonly FuLinkCardItem[]
  className?: string
}

function resolveAccent(item: FuLinkCardItem, index: number): FuLinkCardAccent {
  return item.accent ?? FU_LINK_CARD_ACCENTS[index % FU_LINK_CARD_ACCENTS.length]
}

function LinkCardIcon({ name, accent }: { name: IconName; accent: FuLinkCardAccent }) {
  return (
    <span
      className="relative z-[1] inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10"
      style={{ backgroundColor: accent.chip, color: accent.ink }}
    >
      <MissoutIcon name={name} size={18} className="fu-icon-ink-stroke text-current" />
    </span>
  )
}

/** Notion “See what Notion can do” — portrait cards, tinted icon wells, gradient hover. */
export function FuLinkCardStrip({ label, items, className }: FuLinkCardStripProps) {
  return (
    <div className={className}>
      {label ? <FuMeta className="mb-4 normal-case tracking-normal">{label}</FuMeta> : null}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {items.map((item, index) => {
          const accent = resolveAccent(item, index)

          return (
            <Link
              key={item.href}
              to={item.href}
              style={
                {
                  '--fu-link-card-chip': accent.chip,
                  '--fu-link-card-ink': accent.ink,
                  '--fu-link-card-wash': accent.wash,
                } as CSSProperties
              }
              className={cn(
                'fu-link-card group relative flex min-h-[6.5rem] flex-col justify-between overflow-hidden sm:min-h-[7rem]',
                'rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-hairline-strong)]',
                'bg-[var(--fu-canvas)] p-3.5 sm:p-4',
                'no-underline text-inherit',
                fuMotion.hoverLift,
                fuFocusRing,
              )}
            >
              <LinkCardIcon name={item.iconName} accent={accent} />
              <span className="fu-type-body-sm relative z-[1] font-bold leading-snug text-[var(--fu-ink)]">
                {item.title}
                <MissoutIcon
                  name="chevronRight"
                  size={14}
                  className="ml-1 inline-block align-middle text-[var(--fu-ink-muted)] motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
