import { cn } from '../../lib/cn'
import type { ProductShot } from '../../lib/productAssets'
import { LEGACY_HERO_FALLBACKS } from '../../lib/productAssets'
import { FuProductShot } from '../findus/FuProductShot'

/** Card screenshots — resolved from unified asset registry. */
export const PRODUCT_HERO_STAGE_IMG = LEGACY_HERO_FALLBACKS.stage
export const PRODUCT_HERO_BACKSTAGE_IMG = LEGACY_HERO_FALLBACKS.backstage

/** Intrinsic pixel size of hero screenshots (keep in sync with assets). */
export const PRODUCT_CARD_IMG_SIZE = { w: 1991, h: 1385 } as const

/** Pixel star used in waitlist modal - reused as soft corner decor. */
export const PRODUCT_CORNER_VECTOR_SRC = '/waitlist/side_vector.svg'

export type ProductCornerDecor = {
  corner: string
  flip?: boolean
}

type ProductGlassShellProps = {
  src: ProductShot
  alt: string
  loading?: 'eager' | 'lazy'
  cornerDecor?: readonly ProductCornerDecor[]
  shellGlowShadow?: string
}

const cornerDecorBase =
  'pointer-events-none absolute z-0 h-[3.75rem] w-auto select-none opacity-[0.42] blur-[8px] sm:h-[4.25rem] sm:blur-[10px]'

/** Shared product preview — FuMediaFrame + optional corner decor. */
export function ProductGlassShell({
  src,
  alt,
  loading = 'lazy',
  cornerDecor,
  shellGlowShadow,
}: ProductGlassShellProps) {
  return (
    <div className="relative w-full">
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
      <FuProductShot
        shot={src}
        alt={alt}
        loading={loading}
        presentation="framed"
        className={cn('relative z-[1]', shellGlowShadow)}
      />
    </div>
  )
}
