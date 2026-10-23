import type { FuLogoStripItem } from './FuLogoStrip'
import { FuMeta } from './FuTypography'

export type FuLogoMarqueeProps = {
  label?: string
  logos: readonly FuLogoStripItem[]
  className?: string
}

const logoImageClass =
  'block max-h-20 max-w-[11rem] object-contain object-center sm:max-h-24 sm:max-w-[12rem] md:max-h-28 md:max-w-[13rem]'

const logoTileClass =
  'inline-flex shrink-0 items-center justify-center rounded-[var(--fu-radius-sm)] bg-white p-3 sm:p-4 md:p-5'

/** Auto-scrolling partner logo strip with edge fade. */
export function FuLogoMarquee({ label, logos, className }: FuLogoMarqueeProps) {
  if (logos.length === 0) return null

  const loop = [...logos, ...logos]

  return (
    <div className={className}>
      {label ? <FuMeta className="mb-6 text-center">{label}</FuMeta> : null}
      <div className="partner-marquee-fade w-full overflow-hidden" aria-label="Partner colleges">
        <ul className="partner-marquee-track partner-marquee-track--fast m-0 flex w-max list-none items-center gap-12 py-2 sm:gap-16 md:gap-20">
          {loop.map((item, index) => (
            <li
              key={`${item.name}-${item.src ?? 'placeholder'}-${index}`}
              className="[list-style:none]"
              aria-hidden={index >= logos.length}
            >
              <div className={logoTileClass}>
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.name}
                    className={logoImageClass}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
