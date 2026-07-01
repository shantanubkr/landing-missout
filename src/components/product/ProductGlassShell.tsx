import { cn } from '../../lib/cn'

/** Card screenshots in `public/product/`. */
export const PRODUCT_HERO_STAGE_IMG = '/product/Stage.webp'
export const PRODUCT_HERO_BACKSTAGE_IMG = '/product/backstage.webp'

/** Intrinsic pixel size of `Stage.webp` / `backstage.webp` (keep in sync with assets). */
export const PRODUCT_CARD_IMG_SIZE = { w: 1991, h: 1385 } as const

/** Pixel star used in waitlist modal — reused as soft corner decor. */
export const PRODUCT_CORNER_VECTOR_SRC = '/waitlist/side_vector.svg'

/** Design proportions: outer frame and inner image slot. */
const PRODUCT_GLASS_OUTER = PRODUCT_CARD_IMG_SIZE

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
}: ProductGlassShellProps) {
  const o = PRODUCT_GLASS_OUTER

  return (
    <div className="w-full">
      <div
        className={cn(
          'relative border-[0.6px] border-solid border-[var(--nav-stroke)] bg-white',
          SHELL_RADIUS,
          SHELL_INSET,
          shellGlowShadow,
        )}
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
        <div className={cn('relative z-[1]', IMAGE_RADIUS)}>
          <img
            src={src}
            alt={alt}
            width={o.w}
            height={o.h}
            decoding="async"
            loading={loading}
            draggable={false}
            className="block h-auto w-full rounded-[12px] md:rounded-[14px]"
          />
        </div>
      </div>
    </div>
  )
}
