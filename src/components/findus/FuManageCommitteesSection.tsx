import { cn } from '../../lib/cn'
import { MANAGE_COMMITTEES_SCREEN } from '../../lib/productAssets'
import { MissoutAvatar } from '../avatars'
import { FuBody, FuTitle } from './FuTypography'

export type FuManageCommitteesSectionProps = {
  className?: string
}

/** Product page band — copy top-left, screenshot bottom-right, artist avatar peeking behind. */
export function FuManageCommitteesSection({ className }: FuManageCommitteesSectionProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="max-w-2xl">
        <FuTitle
          level="h2"
          className="text-[clamp(1.5rem,4.2vw,2.75rem)] leading-[1.08] tracking-[-0.03em]"
        >
          Manage entire committees
        </FuTitle>
        <FuBody className="mt-4 text-base sm:text-lg">
          Create departments, assign heads and volunteers, define responsibilities, and organize
          your committee from one place.
        </FuBody>
      </div>

      <div className="relative mt-10 overflow-x-clip sm:mt-12 lg:mt-14">
        <div className="relative ml-auto w-full max-w-[min(100%,52rem)]">
          <div className="relative pt-12 sm:pt-16 lg:pt-20">
            <MissoutAvatar
              avatar="artist"
              size={440}
              animation="happy"
              ariaLabel="Artist"
              className="pointer-events-none absolute right-0 top-0 z-0 block origin-top-right -scale-x-[0.4] scale-y-[0.4] translate-x-[6%] sm:max-lg:-scale-x-[0.48] sm:max-lg:scale-y-[0.48] lg:-scale-x-100 lg:scale-y-100 lg:translate-x-[10%] lg:-translate-y-[14%] xl:translate-x-[8%] xl:-translate-y-[18%]"
            />

            <div className="relative z-10 overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] lg:rounded-[2rem]">
              <img
                src={MANAGE_COMMITTEES_SCREEN.src}
                alt="Add department modal in Backstage for committee management"
                width={MANAGE_COMMITTEES_SCREEN.width}
                height={MANAGE_COMMITTEES_SCREEN.height}
                loading="eager"
                decoding="async"
                draggable={false}
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
