import { cn } from '../../lib/cn'
import { MISSOUT_WORDMARK, MISSOUT_WORDMARK_ASPECT } from '../../lib/brandAssets'

export type BrandWordmarkSize = 'sm' | 'md' | 'lg'

const heightClass: Record<BrandWordmarkSize, string> = {
  sm: 'h-[1.1875rem] md:h-[1.425rem]',
  md: 'h-7 sm:h-8',
  lg: 'h-8 sm:h-9',
}

export type BrandWordmarkProps = {
  className?: string
  size?: BrandWordmarkSize
  /** Invert for dark band backgrounds (header uses CSS filter instead). */
  invertOnDark?: boolean
}

/** Site wordmark — always preserves the SVG’s intrinsic aspect ratio. */
export function BrandWordmark({
  className,
  size = 'md',
  invertOnDark = false,
}: BrandWordmarkProps) {
  return (
    <img
      src={MISSOUT_WORDMARK.src}
      alt=""
      width={MISSOUT_WORDMARK.width}
      height={MISSOUT_WORDMARK.height}
      decoding="async"
      draggable={false}
      style={{ aspectRatio: MISSOUT_WORDMARK_ASPECT }}
      className={cn(
        heightClass[size],
        'w-auto max-w-none shrink-0 object-contain object-left',
        invertOnDark && 'dark:brightness-0 dark:invert',
        className,
      )}
    />
  )
}
