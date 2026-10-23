import { cn } from '../../lib/cn'
import { RECRUIT_TEAM_SCREENS } from '../../lib/productAssets'
import { MissoutAvatar } from '../avatars'
import { FuBody, FuTitle } from './FuTypography'

export type FuRecruitYourTeamSectionProps = {
  className?: string
}

const sectionTitleClass =
  'text-[clamp(1.5rem,4.2vw,2.75rem)] leading-[1.08] tracking-[-0.03em]'

/** Product page band — student mascot beside overlapping members + recruitment mockups. */
export function FuRecruitYourTeamSection({ className }: FuRecruitYourTeamSectionProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start lg:gap-10">
        <FuTitle level="h2" className={sectionTitleClass}>
          Recruit your team
        </FuTitle>
        <FuBody className="max-w-md text-base sm:text-lg lg:ml-auto lg:text-right">
          Open recruitment cycles, collect applications, review candidates, assign departments, and
          build your team from one place.
        </FuBody>
      </div>

      <div className="mt-8 overflow-x-clip sm:mt-10 lg:mt-14 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8 lg:overflow-visible xl:gap-x-12">
        <div className="hidden justify-center lg:col-span-4 lg:flex lg:justify-start lg:self-end">
          <MissoutAvatar
            avatar="studentMark"
            size="hero"
            animation="happy"
            ariaLabel="Stage student"
          />
        </div>

        <div className="lg:col-span-8 lg:col-start-5">
          <div className="relative mx-auto h-[15.5rem] w-full max-w-[19rem] sm:h-[21rem] sm:max-w-[26rem] lg:mx-0 lg:h-[28rem] lg:max-w-none xl:h-[30rem]">
            <img
              src={RECRUIT_TEAM_SCREENS.members.src}
              alt="Members list with roles and department assignments in Backstage"
              width={RECRUIT_TEAM_SCREENS.members.width}
              height={RECRUIT_TEAM_SCREENS.members.height}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="fu-iphone-mockup-shadow absolute left-0 top-0 z-0 h-auto w-[10rem] -translate-y-3 rounded-[1rem] sm:w-[14rem] sm:-translate-y-5 lg:w-[20rem] lg:-translate-y-10 xl:w-[21rem] xl:-translate-y-12"
            />
            <img
              src={RECRUIT_TEAM_SCREENS.recruitment.src}
              alt="New recruitment cycle form in Backstage"
              width={RECRUIT_TEAM_SCREENS.recruitment.width}
              height={RECRUIT_TEAM_SCREENS.recruitment.height}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="fu-iphone-mockup-shadow absolute left-[16%] top-4 z-10 h-auto w-[15rem] rounded-[1rem] sm:left-[22%] sm:top-7 sm:w-[21rem] lg:left-[20%] lg:top-12 lg:w-[32rem] xl:top-14"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
