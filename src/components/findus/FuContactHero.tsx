import { FuMascot } from './FuMascot'
import { REQUEST_DEMO_HREF, REQUEST_DEMO_LABEL } from '../../lib/ctas'
import { FuButtonLink } from './FuButton'
import { FuBody, FuDisplay, FuEyebrow } from './FuTypography'

/** Contact page intro — split copy + animated host avatar. */
export function FuContactHero() {
  return (
    <section className="border-b border-[var(--fu-hairline)] bg-[var(--fu-canvas)]">
      <div className="grid lg:min-h-[24rem] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-12 sm:px-8 lg:px-16 xl:px-20">
          <FuEyebrow tone="blue" className="mb-3">
            Contact
          </FuEyebrow>
          <FuDisplay className="max-w-xl text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
            Talk to us.
          </FuDisplay>
          <FuBody className="mt-4 max-w-md text-base sm:text-lg">
            Walkthrough of Backstage, or message direct. Same team.
          </FuBody>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <FuButtonLink to={REQUEST_DEMO_HREF} variant="primary" size="lg">
              {REQUEST_DEMO_LABEL}
            </FuButtonLink>
            <FuMascot
              size="sm"
              framed
              accent="blue"
              animation="listening"
              className="sm:hidden"
            />
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="flex h-full min-h-[18rem] w-full items-center justify-center p-8 sm:p-12 lg:p-16">
            <FuMascot size="xl" accent="blue" animation="listening" />
          </div>
        </div>
      </div>
    </section>
  )
}
