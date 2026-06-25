import { cn } from '../../lib/cn'

/** Card screenshots in `public/product/`. */
export const PRODUCT_HERO_STAGE_IMG = '/product/Stage.webp'
export const PRODUCT_HERO_BACKSTAGE_IMG = '/product/backstage.webp'

/** Pixel star used in waitlist modal — reused as soft corner decor. */
export const PRODUCT_CORNER_VECTOR_SRC = '/waitlist/side_vector.svg'

/** Design proportions: outer glass frame and inner image slot. */
const PRODUCT_GLASS_OUTER = { w: 736, h: 578 } as const
const PRODUCT_GLASS_INNER = { w: 712, h: 496 } as const

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

const shellFrameClass =
  'overflow-hidden rounded-[20px] border-[0.6px] border-solid border-[var(--nav-stroke)] md:rounded-[22px]'

function ProductGlassImage({
  src,
  alt,
  loading,
  innerWidthPct,
}: {
  src: string
  alt: string
  loading: 'eager' | 'lazy'
  innerWidthPct: number
}) {
  const i = PRODUCT_GLASS_INNER
  return (
    <div
      className="relative mx-auto min-h-0 w-full shrink-0 overflow-hidden rounded-[14px] ring-1 ring-white/[0.10] md:rounded-[16px]"
      style={{
        width: `${innerWidthPct}%`,
        aspectRatio: `${i.w} / ${i.h}`,
      }}
    >
      <img
        src={src}
        alt={alt}
        decoding="async"
        loading={loading}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}

/** Shared glass shell + inner image (`missout-glass`, `--nav-surface`). */
export function ProductGlassShell({
  src,
  alt,
  loading = 'lazy',
  cornerDecor,
  shellGlowShadow,
  label,
}: ProductGlassShellProps) {
  const o = PRODUCT_GLASS_OUTER
  const innerWidthPct = (PRODUCT_GLASS_INNER.w / o.w) * 100
  const hasCornerDecor = Boolean(cornerDecor?.length)

  if (hasCornerDecor) {
    return (
      <div className="w-full">
        <div
          className={cn('relative', shellFrameClass, shellGlowShadow)}
          style={{ aspectRatio: `${o.w} / ${o.h}` }}
        >
          {cornerDecor!.map((decor, index) => (
            <img
              key={index}
              src={PRODUCT_CORNER_VECTOR_SRC}
              alt=""
              aria-hidden
              draggable={false}
              className={cn(cornerDecorBase, decor.corner, decor.flip && '-scale-x-100')}
            />
          ))}
          <div
            className={cn(
              'missout-glass pointer-events-none absolute inset-0 z-[1]',
              shellFrameClass,
              'bg-[var(--nav-surface)]',
            )}
            aria-hidden
          />
          <div className="relative z-[2] flex h-full flex-col justify-end pb-2 md:pb-2.5">
            {label ? (
              <span className="absolute left-3 top-3 z-10 rounded-full border border-[#F92C99]/20 bg-white/90 px-3 py-1 font-sans text-xs font-semibold text-[#F92C99] shadow-sm backdrop-blur-sm md:left-3.5 md:top-3.5">
                {label}
              </span>
            ) : null}
            <ProductGlassImage
              src={src}
              alt={alt}
              loading={loading}
              innerWidthPct={innerWidthPct}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          'missout-glass relative flex w-full flex-col justify-end pb-2 md:pb-2.5',
          shellFrameClass,
          'bg-[var(--nav-surface)] shadow-[0_16px_48px_rgba(26,26,26,0.08)]',
        )}
        style={{ aspectRatio: `${o.w} / ${o.h}` }}
      >
        {label ? (
          <span className="absolute left-3 top-3 z-10 rounded-full border border-[#F92C99]/20 bg-white/90 px-3 py-1 font-sans text-xs font-semibold text-[#F92C99] shadow-sm backdrop-blur-sm md:left-3.5 md:top-3.5">
            {label}
          </span>
        ) : null}
        <ProductGlassImage
          src={src}
          alt={alt}
          loading={loading}
          innerWidthPct={innerWidthPct}
        />
      </div>
    </div>
  )
}
