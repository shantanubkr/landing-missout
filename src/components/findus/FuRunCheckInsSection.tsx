import { cn } from '../../lib/cn'
import { CHECKIN_BAND_SCREEN } from '../../lib/productAssets'
import { MissoutAvatar } from '../avatars'
import { FuBody, FuTitle } from './FuTypography'

export type FuRunCheckInsSectionProps = {
  className?: string
}

/** Product page band — split headline, centered phone, ticket overlapped at bottom-left. */
export function FuRunCheckInsSection({ className }: FuRunCheckInsSectionProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start lg:gap-10">
        <FuTitle
          level="h2"
          className="text-[clamp(1.5rem,4.2vw,2.75rem)] leading-[1.08] tracking-[-0.03em]"
        >
          Run check-ins
        </FuTitle>
        <FuBody className="max-w-md text-base sm:text-lg lg:ml-auto lg:text-right">
          Scan attendees, handle walk-ins and guests, track attendance, and see who&apos;s checked
          in as your event runs.
        </FuBody>
      </div>

      <div className="relative mt-8 min-h-[18rem] overflow-x-clip sm:mt-10 sm:min-h-[22rem] lg:mt-14 lg:min-h-[32rem] lg:overflow-visible xl:min-h-[36rem]">
        <MissoutAvatar
          avatar="ticket"
          size={560}
          animation="happy"
          ariaLabel="Admission ticket"
          className="pointer-events-none absolute bottom-0 -left-2 z-10 max-w-[min(78vw,16rem)] -rotate-6 origin-bottom-left sm:-left-8 sm:max-w-[min(88vw,20rem)] lg:-left-12 lg:max-w-none xl:-left-16"
        />

        <div className="relative z-20 flex justify-center">
          <img
            src={CHECKIN_BAND_SCREEN.src}
            alt="Check-in guest list and QR scan in Backstage on mobile"
            width={CHECKIN_BAND_SCREEN.width}
            height={CHECKIN_BAND_SCREEN.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="fu-iphone-mockup-shadow h-auto w-full max-w-[min(100%,24rem)] lg:max-w-[26rem] xl:max-w-[28rem]"
          />
        </div>
      </div>
    </div>
  )
}
