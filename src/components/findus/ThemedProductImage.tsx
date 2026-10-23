import { cn } from '../../lib/cn'
import { resolveImageAsset, type ProductShot } from '../../lib/productAssets'
import { useColorTheme } from './ColorThemeProvider'

export type ThemedProductImageProps = {
  shot: ProductShot
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  fit?: 'natural' | 'cover' | 'contain'
}

/**
 * Renders one screenshot for the active site theme using the asset's intrinsic ratio.
 */
export function ThemedProductImage({
  shot,
  alt,
  className,
  loading = 'lazy',
  fit = 'natural',
}: ThemedProductImageProps) {
  const { theme } = useColorTheme()
  const asset = resolveImageAsset(shot, theme)
  const aspectRatio = `${asset.width} / ${asset.height}`

  if (fit === 'cover') {
    return (
      <div className={cn('h-full w-full overflow-hidden', className)}>
        <img
          src={asset.src}
          alt={alt}
          width={asset.width}
          height={asset.height}
          loading={loading}
          decoding="async"
          draggable={false}
          className="block h-full w-full object-cover object-top"
        />
      </div>
    )
  }

  if (fit === 'contain') {
    return (
      <img
        src={asset.src}
        alt={alt}
        width={asset.width}
        height={asset.height}
        loading={loading}
        decoding="async"
        draggable={false}
        className={cn('block h-full w-full object-contain object-top', className)}
      />
    )
  }

  return (
    <img
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      loading={loading}
      decoding="async"
      draggable={false}
      style={{ aspectRatio }}
      className={cn('block h-auto w-full max-w-full', className)}
    />
  )
}
