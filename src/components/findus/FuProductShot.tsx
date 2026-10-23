import { cn } from '../../lib/cn'
import type { ProductShot } from '../../lib/productAssets'
import {
  fuFlushImageClass,
  fuInlineImageClass,
  fuMediaFrameImageClass,
  FuMediaFrame,
} from './FuMediaFrame'
import { ThemedProductImage } from './ThemedProductImage'

export type FuProductPresentation = 'framed' | 'flush' | 'inline'

export type FuProductShotProps = {
  shot: ProductShot
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  /**
   * `framed` — surface + white inset (default).
   * `flush` — no frame/radius, for bento tiles with baked-in chrome.
   * `inline` — no outer frame; use inside FuMediaFrame or cards.
   */
  presentation?: FuProductPresentation
  /** @deprecated Use `presentation`. */
  framed?: boolean
  fit?: 'natural' | 'cover'
}

const presentationClass: Record<FuProductPresentation, string> = {
  framed: fuMediaFrameImageClass,
  flush: fuFlushImageClass,
  inline: fuInlineImageClass,
}

function resolvePresentation(
  presentation: FuProductPresentation | undefined,
  framed: boolean | undefined,
): FuProductPresentation {
  if (presentation) return presentation
  if (framed === false) return 'flush'
  return 'framed'
}

/** Product screenshot — aspect ratio from registry; presentation controls frame chrome. */
export function FuProductShot({
  shot,
  alt,
  className,
  loading = 'lazy',
  presentation,
  framed,
  fit = 'natural',
}: FuProductShotProps) {
  const mode = resolvePresentation(presentation, framed)

  const image = (
    <ThemedProductImage
      shot={shot}
      alt={alt}
      loading={loading}
      fit={fit}
      className={cn(fit === 'cover' ? undefined : presentationClass[mode], className)}
    />
  )

  if (mode === 'framed') {
    return <FuMediaFrame>{image}</FuMediaFrame>
  }

  return image
}
