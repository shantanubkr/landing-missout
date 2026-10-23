import { cn } from '../../lib/cn'
import { SEND_UPDATE_BAND_SCREEN } from '../../lib/productAssets'
import { FuBody, FuTitle } from './FuTypography'

export type FuSendUpdatesSectionProps = {
  className?: string
}

/** Product page band — send-update card mockup beside editorial copy. */
export function FuSendUpdatesSection({ className }: FuSendUpdatesSectionProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16',
        className,
      )}
    >
      <div className="flex justify-center lg:justify-start">
        <img
          src={SEND_UPDATE_BAND_SCREEN.src}
          alt="Send update card with compose action in Backstage"
          width={SEND_UPDATE_BAND_SCREEN.width}
          height={SEND_UPDATE_BAND_SCREEN.height}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-auto w-full max-w-[min(100%,36rem)]"
        />
      </div>

      <div className="max-w-md lg:ml-auto lg:max-w-lg lg:text-right">
        <FuTitle
          level="h2"
          className="text-[clamp(1.5rem,4.2vw,2.75rem)] leading-[1.08] tracking-[-0.03em]"
        >
          Send updates
        </FuTitle>
        <FuBody className="mt-4 text-base sm:text-lg">
          Send targeted updates to participants, accepted recruits, rejected applicants, and your
          teams without chasing people across WhatsApp.
        </FuBody>
      </div>
    </div>
  )
}
