import { cn } from '../../lib/cn'
import type { FuBrandHue } from '../../lib/design/findus'
import type { ImageAsset } from '../../lib/productAssets'
import { FuMascot } from './FuMascot'
import { FuContainer } from './FuContainer'
import { FuSection } from './FuSection'

const titleGradientClass = {
  pink: 'fu-product-headline-gradient fu-product-headline-gradient--pink',
  lime: 'fu-product-headline-gradient fu-product-headline-gradient--lime',
  blue: 'fu-product-headline-gradient fu-product-headline-gradient--blue',
} as const satisfies Record<FuBrandHue, string>

export type FuIphoneStickyBridgeProps = {
  title: string
  tagline: string
  image: ImageAsset
  imageAlt?: string
  accent?: FuBrandHue
  /** Star mascot fill — typically the complementary accent (Backstage lime, Stage pink). */
  mascotAccent?: FuBrandHue
  mascotAnimation?: string
  /** `image-left` — mockup left, sticky copy right (Backstage). `image-right` — copy left, mockup right (Stage). */
  layout?: 'image-left' | 'image-right'
  className?: string
}

/** Tall iPhone mockup scrolls; gradient product headline sticks on the opposite side (desktop). */
export function FuIphoneStickyBridge({
  title,
  tagline,
  image,
  imageAlt,
  accent = 'pink',
  mascotAccent,
  mascotAnimation = 'happy',
  layout = 'image-left',
  className,
}: FuIphoneStickyBridgeProps) {
  const imageOnRight = layout === 'image-right'

  const imageCell = (
    <div
      className={cn(
        'order-2 flex min-w-0 justify-center lg:order-none',
        imageOnRight ? 'lg:justify-end' : 'lg:justify-start',
      )}
    >
      <img
        src={image.src}
        alt={imageAlt ?? `${title} mobile app on iPhone`}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="fu-iphone-mockup-shadow h-auto w-full max-w-[15.5rem] sm:max-w-[19rem] lg:max-w-[28rem] xl:max-w-[32rem]"
      />
    </div>
  )

  const textCell = (
    <div className="order-1 flex min-w-0 items-start overflow-x-clip lg:sticky lg:top-[18vh] lg:order-none lg:overflow-visible lg:self-start lg:pb-16 lg:pt-6 xl:top-[22vh]">
      <div className="w-full min-w-0 overflow-visible">
        <h2
          className={cn(
            'fu-font-sans m-0 text-[clamp(2.25rem,12vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em] sm:text-[clamp(2.75rem,14vw,6.5rem)]',
            titleGradientClass[accent],
          )}
        >
          {title}
        </h2>
        <p className="fu-font-sans m-0 mt-2 max-w-[16rem] text-[clamp(0.9375rem,3.8vw,1.5rem)] font-bold leading-snug tracking-[-0.02em] text-[var(--fu-ink)] sm:mt-3 sm:max-w-none sm:leading-none">
          {tagline}
        </p>
        {mascotAccent ? (
          <div
            className={cn(
              'mt-6 hidden origin-top-left lg:block',
              imageOnRight ? 'rotate-6' : '-rotate-8',
            )}
          >
            <FuMascot
              size="xl"
              accent={mascotAccent}
              animation={mascotAnimation}
              ariaLabel={`${title} mascot`}
            />
          </div>
        ) : null}
      </div>
    </div>
  )

  return (
    <FuSection tone="default" padding="lg" className={cn('max-lg:!py-10 sm:max-lg:!py-12', className)}>
      <FuContainer width="wide">
        <div
          className={cn(
            'grid items-start gap-5 sm:gap-6 lg:gap-16 xl:gap-20',
            imageOnRight
              ? 'lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]'
              : 'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]',
          )}
        >
          {imageOnRight ? (
            <>
              {textCell}
              {imageCell}
            </>
          ) : (
            <>
              {imageCell}
              {textCell}
            </>
          )}
        </div>
      </FuContainer>
    </FuSection>
  )
}

/** @deprecated Use `FuIphoneStickyBridge` with Backstage copy. */
export function FuBackstageBridge(
  props: Omit<FuIphoneStickyBridgeProps, 'title' | 'tagline' | 'accent' | 'mascotAccent'>,
) {
  return (
    <FuIphoneStickyBridge
      title="Backstage"
      tagline="Made for you to run the show."
      accent="pink"
      mascotAccent="lime"
      mascotAnimation="happy"
      imageAlt="Backstage mobile app showing event operations on iPhone"
      {...props}
    />
  )
}
