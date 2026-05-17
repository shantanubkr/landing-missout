import { cn } from '../../lib/cn'
import { BentoCard } from './BentoPrimitives'

/** Shared helper: full column width with no extra centering margin. */
export const BENTO_IMG_FULL = 'w-full'

export function BentoImageTile({
  folder,
  slot,
  src,
  alt,
  className,
  imgClassName,
  fill,
  fitRowMd,
  variant = 'default',
}: {
  folder: 'discover-bento' | 'manage-bento'
  slot: string
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** Absolute-fill mode: image covers entire card (`object-cover`). Card must have a known height. */
  fill?: boolean
  /**
   * Discover bottom row: mobile = intrinsic `w-full`; md+ = fill grid cell height, `object-contain`
   * (cell aspect matches asset when grid cols follow intrinsic width ratios).
   */
  fitRowMd?: boolean
  variant?: 'default' | 'flush'
}) {
  if (fitRowMd) {
    return (
      <BentoCard
        slot={slot}
        folder={folder}
        variant={variant}
        className={cn('relative min-h-0 w-full md:h-full', className)}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={cn(
            'block h-auto w-full max-w-full align-middle',
            imgClassName,
            'md:absolute md:inset-0 md:h-full md:w-full md:object-contain',
          )}
        />
      </BentoCard>
    )
  }

  if (fill) {
    return (
      <BentoCard
        slot={slot}
        folder={folder}
        variant={variant}
        className={cn('relative', className)}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={cn(
            'absolute inset-0 h-full w-full',
            imgClassName ?? 'object-cover object-center',
          )}
        />
      </BentoCard>
    )
  }

  return (
    <BentoCard slot={slot} folder={folder} variant={variant} className={className}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn('block max-w-full align-middle', imgClassName ?? 'h-auto w-full')}
      />
    </BentoCard>
  )
}
