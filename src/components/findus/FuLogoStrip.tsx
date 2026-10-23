import { FuMeta } from './FuTypography'
import { cn } from '../../lib/cn'

export type FuLogoStripItem = {
  name: string
  src?: string
  href?: string
}

export type FuLogoStripProps = {
  label?: string
  logos: readonly FuLogoStripItem[]
  /** `default` for compact rows; `lg` for home / partners sponsor sections. */
  size?: 'default' | 'lg'
  className?: string
}

const logoImageClass = {
  default: 'block max-h-14 max-w-[8.5rem] object-contain object-center sm:max-h-16 sm:max-w-[9.5rem]',
  lg: 'block max-h-20 max-w-[11rem] object-contain object-center sm:max-h-24 sm:max-w-[12rem] md:max-h-28 md:max-w-[13rem]',
} as const

const logoTileClass = {
  default: 'inline-flex items-center justify-center rounded-[var(--fu-radius-sm)] bg-white p-2.5 sm:p-3',
  lg: 'inline-flex items-center justify-center rounded-[var(--fu-radius-sm)] bg-white p-3 sm:p-4 md:p-5',
} as const

function LogoBlock({ item, size }: { item: FuLogoStripItem; size: 'default' | 'lg' }) {
  const inner = item.src ? (
    <img
      src={item.src}
      alt={item.name}
      className={logoImageClass[size]}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  ) : (
    <span className="fu-type-body-sm inline-flex min-h-10 min-w-[7rem] items-center justify-center rounded-[var(--fu-radius)] border border-dashed border-[var(--fu-hairline-strong)] bg-[var(--fu-surface)] px-3 text-[var(--fu-ink-muted)]">
      PLACEHOLDER
    </span>
  )

  const wrapClass = logoTileClass[size]

  if (item.href) {
    return (
      <a
        href={item.href}
        className={cn(wrapClass, 'no-underline')}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    )
  }

  return <div className={wrapClass}>{inner}</div>
}

/** Partner / logo row — placeholders allowed. */
export function FuLogoStrip({ label, logos, size = 'lg', className }: FuLogoStripProps) {
  return (
    <div className={className}>
      {label ? <FuMeta className="mb-4 text-center">{label}</FuMeta> : null}
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-12">
        {logos.map((item) => (
          <LogoBlock key={`${item.name}-${item.src ?? 'placeholder'}`} item={item} size={size} />
        ))}
      </div>
    </div>
  )
}
