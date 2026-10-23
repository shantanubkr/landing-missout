import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { FuBrandHue } from '../../lib/design/findus'
import type { ImageAsset } from '../../lib/productAssets'
import { FuMascot } from './FuMascot'
import { FuBody, FuMeta, FuTitle } from './FuTypography'

export type FuStageBridgeProps = {
  eyebrow?: string
  title: string
  body: string
  actions: ReactNode
  image: ImageAsset
  imageAlt: string
  mascot?: boolean
  mascotAccent?: FuBrandHue
  mascotAnimation?: string
  className?: string
}

/** Stage split band — sticky copy left, tall iPhone mockup scrolls on the right. */
export function FuStageBridge({
  eyebrow,
  title,
  body,
  actions,
  image,
  imageAlt,
  mascot = false,
  mascotAccent = 'lime',
  mascotAnimation,
  className,
}: FuStageBridgeProps) {
  return (
    <div
      className={cn(
        'grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16',
        className,
      )}
    >
      <div className="relative max-w-md lg:sticky lg:top-28 lg:self-start lg:pb-12">
        {mascot ? (
          <div className="pointer-events-none absolute -top-6 -right-2 z-10 hidden sm:block sm:-top-8 lg:-right-10">
            <FuMascot
              size="md"
              framed
              accent={mascotAccent}
              animation={mascotAnimation}
              className="shrink-0"
            />
          </div>
        ) : null}
        {eyebrow ? <FuMeta className="mb-2 normal-case">{eyebrow}</FuMeta> : null}
        <FuTitle level="h2" className="mb-3">
          {title}
        </FuTitle>
        <FuBody className="mb-6">{body}</FuBody>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>
      </div>

      <div className="flex min-w-0 justify-center lg:justify-end">
        <img
          src={image.src}
          alt={imageAlt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-auto w-full max-w-[16.5rem] sm:max-w-[20rem] lg:max-w-[24rem] xl:max-w-[26rem]"
        />
      </div>
    </div>
  )
}
