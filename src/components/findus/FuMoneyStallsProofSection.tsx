import { cn } from '../../lib/cn'
import { BACKSTAGE_FEATURE_SCREENS } from '../../lib/productAssets'
import { mascotThemeForFeature } from '../../lib/mascotThemes'
import { FuFeatureShowcaseShot } from './FuMediaFrame'
import { FuMascot } from './FuMascot'
import { FuBody, FuTitle } from './FuTypography'

export type FuMoneyStallsProofSectionProps = {
  className?: string
}

const screens = BACKSTAGE_FEATURE_SCREENS.moneyProof
const mascotTheme = mascotThemeForFeature('lime', 'moneyProof')

/** Product page band — metrics + ticketing mockups without tinted stage background. */
export function FuMoneyStallsProofSection({ className }: FuMoneyStallsProofSectionProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <div className="flex items-start justify-between gap-6 lg:gap-10">
          <FuTitle
            level="h2"
            className="max-w-2xl text-[clamp(1.5rem,4.2vw,2.75rem)] leading-[1.08] tracking-[-0.03em]"
          >
            Paid events, stalls, sponsors, and a clear picture after.
          </FuTitle>
          <FuMascot
            size="md"
            animation={mascotTheme.animation}
            bodyFill={mascotTheme.bodyFill}
            eyeFill={mascotTheme.eyeFill}
            className="hidden shrink-0 sm:inline-flex"
          />
        </div>
        <FuBody className="mt-4 max-w-2xl text-base sm:text-lg">
          Commercial side next to ops, then participation/outcomes without three spreadsheet
          exports.
        </FuBody>
      </div>

      <FuFeatureShowcaseShot
        shot={screens.primary}
        alt={screens.primaryAlt}
        secondaryShot={screens.secondary}
        secondaryAlt={screens.secondaryAlt}
        placement="spotlight"
        loading="lazy"
      />
    </div>
  )
}
