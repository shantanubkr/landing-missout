import { ButtonAnchor, ButtonLink } from '../ui'
import { PRODUCT_CREATE_HREF } from '../../lib/productUrls'
import {
  PRODUCT_HERO_BACKSTAGE_IMG,
  ProductGlassShell,
} from '../product/ProductGlassShell'
import { RotatingActionPill } from './RotatingActionPill'

/**
 * Organiser-led hero: copy left, Manage through Backstage screenshot right.
 */
export function HeroSection() {
  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative z-0 overflow-hidden bg-white px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="hero-bg-grid absolute inset-0 min-h-full w-full opacity-40" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
        <div>
          <h1 className="text-hero-oneliner text-balance text-left">
            <span className="inline">One place to </span>
            <RotatingActionPill className="mx-1 translate-y-[-0.05em] text-[0.72em] font-bold sm:mx-1.5 sm:text-[0.78em]" />
            <span className="inline"> events.</span>
          </h1>

          <p className="mt-4 max-w-lg text-pretty font-sans text-base font-medium leading-snug text-[#5A5A5A] sm:mt-5 sm:text-lg">
            Registrations, check-in, updates, and discovery. No spreadsheet stack.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <ButtonAnchor
              href={PRODUCT_CREATE_HREF}
              variant="primary"
              theme="home"
              size="lg"
              className="!min-h-12 !px-10 !text-base !font-semibold sm:!min-h-13 sm:!px-12 sm:!text-lg"
            >
              Let&apos;s create
            </ButtonAnchor>
            <ButtonLink
              to="/#contact"
              variant="outline"
              theme="home"
              size="lg"
              className="!min-h-12 !px-10 !text-base !font-semibold sm:!px-12 sm:!text-lg"
            >
              Request a demo
            </ButtonLink>
          </div>
        </div>

        <ProductGlassShell
          src={PRODUCT_HERO_BACKSTAGE_IMG}
          alt="Manage through Backstage"
          loading="eager"
        />
      </div>
    </section>
  )
}
