import { cn } from '../../lib/cn'

/** Card screenshots in `public/product/`. */
export const PRODUCT_HERO_STAGE_IMG = '/product/Stage.webp'
export const PRODUCT_HERO_BACKSTAGE_IMG = '/product/backstage.webp'

/** Pixel star used in waitlist modal — reused as soft corner decor. */
export const PRODUCT_CORNER_VECTOR_SRC = '/waitlist/side_vector.svg'

/** Design proportions: outer frame and inner image slot. */
const PRODUCT_GLASS_OUTER = { w: 736, h: 578 } as const

export type ProductCornerDecor = {
  corner: string
  flip?: boolean
}

type ProductGlassShellProps = {
  src: string
  alt: string
  loading?: 'eager' | 'lazy'
  cornerDecor?: readonly ProductCornerDecor[]
  shellGlowShadow?: string
  label?: string
}

const cornerDecorBase =
  'pointer-events-none absolute z-0 h-[3.75rem] w-auto select-none opacity-[0.42] blur-[8px] sm:h-[4.25rem] sm:blur-[10px]'

/** Outer shell radius; inner clip uses inset padding so curves stay parallel. */
const SHELL_RADIUS = 'rounded-[20px] md:rounded-[22px]'
const SHELL_INSET = 'p-2 md:p-2.5'
const IMAGE_RADIUS = 'rounded-[12px] md:rounded-[14px]'

/** Shared product preview frame — white fill, stroke border, inner screenshot. */
export function ProductGlassShell({
  src,
  alt,
  loading = 'lazy',
  cornerDecor,
  shellGlowShadow,
  label,
}: ProductGlassShellProps) {
  const o = PRODUCT_GLASS_OUTER

  return (
    <div className="w-full">
      <div
        className={cn(
          'relative overflow-hidden border-[0.6px] border-solid border-[var(--nav-stroke)] bg-white',
          SHELL_RADIUS,
          SHELL_INSET,
          shellGlowShadow,
        )}
        style={{ aspectRatio: `${o.w} / ${o.h}` }}
      >
        {cornerDecor?.map((decor, index) => (
          <img
            key={index}
            src={PRODUCT_CORNER_VECTOR_SRC}
            alt=""
            aria-hidden
            draggable={false}
            className={cn(cornerDecorBase, decor.corner, decor.flip && '-scale-x-100')}
          />
        ))}
        <div className={cn('relative z-[1] h-full min-h-0 overflow-hidden', IMAGE_RADIUS)}>
          {label ? (
            <span className="absolute left-3 top-3 z-10 rounded-full border border-[#F92C99]/20 bg-white px-3 py-1 font-sans text-xs font-semibold text-[#F92C99] shadow-sm md:left-3.5 md:top-3.5">
              {label}
            </span>
          ) : null}
          <img
            src={src}
            alt={alt}
            decoding="async"
            loading={loading}
            draggable={false}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  )
}
