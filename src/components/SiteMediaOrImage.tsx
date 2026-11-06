import { shouldUsePlaceholder } from '../lib/mediaPlaceholders'
import { SiteMediaPlaceholder } from './SiteMediaPlaceholder'

type SiteMediaOrImageProps = {
  src?: string
  alt: string
  seed?: string
  aspect?: string
  className?: string
  imgClassName?: string
  showLabel?: boolean
  loading?: 'eager' | 'lazy'
  fit?: 'cover' | 'contain'
  /** `fill` — single img (absolute / sized parents). `aspect` — ratio box wrapper. */
  layout?: 'aspect' | 'fill'
}

export function SiteMediaOrImage({
  src,
  alt,
  seed,
  aspect = '16/10',
  className = '',
  imgClassName = '',
  showLabel = false,
  loading = 'lazy',
  fit = 'cover',
  layout = 'aspect',
}: SiteMediaOrImageProps) {
  if (shouldUsePlaceholder({ seed, src })) {
    return (
      <SiteMediaPlaceholder
        seed={seed ?? alt}
        label={alt}
        aspect={aspect}
        className={className}
        showLabel={showLabel}
      />
    )
  }

  const objectClass =
    fit === 'contain' ? 'object-contain object-center' : 'object-cover object-left-top'

  if (layout === 'fill') {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={[className, objectClass, imgClassName].filter(Boolean).join(' ')}
      />
    )
  }

  return (
    <div className={className} style={{ aspectRatio: aspect }}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={['size-full', objectClass, imgClassName].filter(Boolean).join(' ')}
      />
    </div>
  )
}
