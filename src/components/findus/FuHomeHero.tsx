import { Link } from 'react-router-dom'
import { MissoutOutlineStar } from '../brand/MissoutOutlineStar'
import { MissoutIcon } from '../icons'
import {
  GET_STARTED_HREF,
  GET_STARTED_LABEL,
  REQUEST_DEMO_HREF,
  REQUEST_DEMO_LABEL,
} from '../../lib/ctas'
import type { ProductShot } from '../../lib/productAssets'
import { cn } from '../../lib/cn'
import { FuButtonAnchor, FuButtonLink } from './FuButton'
import { FuContainer } from './FuContainer'
import type { FuLogoStripItem } from './FuLogoStrip'
import { FuLogoMarquee } from './FuLogoMarquee'
import { FuProductShot } from './FuProductShot'
import { FuTitle } from './FuTypography'

export type FuHomeHeroProps = {
  title?: string
  shot: ProductShot
  shotAlt: string
  logos?: readonly FuLogoStripItem[]
  className?: string
}

/**
 * Home hero — centered headline, Get started + demo CTAs, wide Backstage shot below.
 * Layout matched to marketing reference: flanking outline stars, blue primary left.
 */
export function FuHomeHero({
  title = 'Everything behind a successful event.',
  shot,
  shotAlt,
  logos,
  className,
}: FuHomeHeroProps) {
  const outlineStarShell =
    'h-[min(34rem,56vh)] w-auto max-w-none select-none sm:h-[min(38rem,60vh)] lg:h-[min(44rem,64vh)]'

  return (
    <section
      aria-label="Home hero"
      className={cn(
        'relative overflow-hidden bg-[var(--fu-canvas)] pt-8 sm:pt-12 lg:pt-14',
        logos && logos.length > 0 ? 'pb-8 sm:pb-10 lg:pb-12' : 'pb-0',
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] left-0 hidden md:block lg:top-[7%]">
          <MissoutOutlineStar
            stroke="var(--fu-brand-pink)"
            strokeWidth={3}
            className={cn(
              outlineStarShell,
              'origin-center -translate-x-[58%] scale-y-[-1] -rotate-[34deg]',
            )}
          />
        </div>
        <div className="absolute top-[10%] right-0 hidden md:block lg:top-[7%]">
          <MissoutOutlineStar
            stroke="var(--fu-brand-lime)"
            strokeWidth={3}
            className={cn(
              outlineStarShell,
              'origin-center translate-x-[58%] scale-y-[-1] rotate-[34deg]',
            )}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[920px] px-4 text-center sm:px-6">
        <h1 className="fu-font-sans m-0 text-[clamp(2.5rem,6.8vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[var(--fu-ink)]">
          {title}
        </h1>

        <div className="mt-6 flex flex-col items-stretch justify-center gap-2.5 sm:mt-7 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
          <FuButtonAnchor
            href={GET_STARTED_HREF}
            variant="primary"
            size="lg"
            className="sm:min-w-[11.5rem]"
          >
            {GET_STARTED_LABEL}
          </FuButtonAnchor>
          <FuButtonLink
            to={REQUEST_DEMO_HREF}
            variant="secondary"
            size="lg"
            className="border-[var(--fu-ink)] bg-[var(--fu-canvas)] hover:border-[var(--fu-ink)] hover:bg-[var(--fu-surface)] sm:min-w-[11.5rem]"
          >
            {REQUEST_DEMO_LABEL}
          </FuButtonLink>
        </div>
      </div>

      <div className="relative z-[1] mx-auto mt-8 w-full max-w-[1400px] px-3 sm:mt-10 sm:px-4 lg:mt-12 lg:px-5">
        <div className="max-h-[clamp(14rem,54vw,42rem)] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgb(0_0_0/0.08),0_8px_24px_rgb(0_0_0/0.05)] dark:shadow-[0_20px_50px_rgb(0_0_0/0.32),0_8px_24px_rgb(0_0_0/0.18)] sm:max-h-[clamp(18rem,54vw,42rem)]">
          <FuProductShot
            shot={shot}
            alt={shotAlt}
            loading="eager"
            presentation="flush"
            className="rounded-2xl"
          />
        </div>
      </div>

      {logos && logos.length > 0 ? (
        <FuContainer className="relative z-10 mt-12 sm:mt-14 lg:mt-16">
          <FuTitle level="h2" className="mx-auto mb-8 max-w-xl text-center">
            Trusted by the best events in town.
          </FuTitle>
          <FuLogoMarquee logos={logos} />
          <p className="fu-type-body-sm m-0 mt-8">
            <Link
              to="/partners"
              className="inline-flex items-center gap-1 font-semibold text-[var(--fu-brand-blue)] no-underline hover:opacity-80"
            >
              See partners
              <MissoutIcon name="chevronRight" size={14} className="text-current" />
            </Link>
          </p>
        </FuContainer>
      ) : null}
    </section>
  )
}
