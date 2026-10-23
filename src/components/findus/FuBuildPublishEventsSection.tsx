import { cn } from '../../lib/cn'
import { BUILD_PUBLISH_EVENT_SCREENS } from '../../lib/productAssets'
import { FuBody, FuTitle } from './FuTypography'

export type FuBuildPublishEventsSectionProps = {
  className?: string
}

/** Product page band — right-aligned copy + review checklist beside live event page. */
export function FuBuildPublishEventsSection({ className }: FuBuildPublishEventsSectionProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="mb-8 max-w-3xl text-left sm:mb-10 lg:mb-12 lg:ml-auto lg:text-right">
        <FuTitle
          level="h2"
          className="text-[clamp(1.5rem,4.2vw,2.75rem)] leading-[1.08] tracking-[-0.03em]"
        >
          Build and Publish Events
        </FuTitle>
        <FuBody className="mt-4 text-base sm:text-lg">
          Create festivals, competitions, performances, and workshops, set up details and
          registration forms, and publish them when you&apos;re ready.
        </FuBody>
      </div>

      <div className="grid grid-cols-1 items-end gap-4 sm:gap-5 lg:grid-cols-[586fr_1888fr]">
        <div className="overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem]">
          <img
            src={BUILD_PUBLISH_EVENT_SCREENS.review.src}
            alt="Review and publish readiness checklist in Backstage"
            width={BUILD_PUBLISH_EVENT_SCREENS.review.width}
            height={BUILD_PUBLISH_EVENT_SCREENS.review.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="block h-auto w-full"
          />
        </div>
        <div className="overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] lg:rounded-[2rem]">
          <img
            src={BUILD_PUBLISH_EVENT_SCREENS.eventPage.src}
            alt="Cedar Stage Live event overview in Backstage"
            width={BUILD_PUBLISH_EVENT_SCREENS.eventPage.width}
            height={BUILD_PUBLISH_EVENT_SCREENS.eventPage.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  )
}
