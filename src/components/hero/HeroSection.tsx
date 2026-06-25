import { useState } from 'react'
import { HERO_ASSETS } from '../../lib/heroAssets'
import { cn } from '../../lib/cn'
import { useHeroParallax } from '../../hooks/useHeroParallax'
import { Button } from '../ui'
import { WaitlistModal } from '../waitlist'
import { CountdownLaunch } from './CountdownLaunch'
import { FloatingProductPill } from './FloatingProductPill'

export function HeroSection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const {
    sectionRef,
    gridLayerRef,
    imageLayerRef,
    stagePillRef,
    backstagePillRef,
    stagePillMobileRef,
    backstagePillMobileRef,
  } = useHeroParallax()

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Hero"
      className="relative z-0 flex min-h-dvh flex-col overflow-hidden bg-white pt-20 sm:pt-24"
    >
      <div
        ref={gridLayerRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden min-h-full w-full"
        aria-hidden
      >
        <div className="hero-bg-grid absolute inset-0 min-h-full w-full" />
      </div>

      {/* Zone 1 — copy + CTA (always on white, never overlaps the graphic) */}
      <div className="relative z-10 w-full shrink-0 px-4 pb-2 sm:px-6 sm:pb-3 md:pb-4">
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 md:left-0 md:mt-8 md:flex lg:-left-1 xl:-left-3">
            <div ref={stagePillRef}>
              <FloatingProductPill label="Stage" className="relative" />
            </div>
          </div>
          <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 md:right-0 md:-mt-16 md:flex lg:-right-1 xl:-right-3">
            <div ref={backstagePillRef}>
              <FloatingProductPill label="Backstage" align="right" className="relative" />
            </div>
          </div>

          <div className="mx-auto w-full max-w-4xl text-center sm:max-w-5xl">
            <CountdownLaunch className="mb-6 mt-2 sm:mb-7 sm:mt-3" />

            <h1 className="text-hero-headline">
              Missout,
              <br />
              no more.
            </h1>

            <p className="text-hero-subhead mx-auto mt-3 max-w-2xl text-balance text-[#5A5A5A] sm:mt-4">
              Handle registrations, teams, and updates
              <br />
              No back and forth
            </p>

            <div className="mt-5 flex flex-col items-center sm:mt-6">
              <Button
                type="button"
                variant="primary"
                theme="home"
                size="lg"
                onClick={() => setWaitlistOpen(true)}
                className="!min-h-12 !px-10 !py-3 !text-lg !font-bold sm:!min-h-14 sm:!px-14 sm:!py-3.5 sm:!text-xl"
              >
                Join the Waitlist
              </Button>
            </div>

            <div className="mt-10 flex justify-center gap-10 sm:mt-12 md:mt-10 md:hidden">
              <div ref={stagePillMobileRef}>
                <FloatingProductPill label="Stage" className="relative" />
              </div>
              <div ref={backstagePillMobileRef}>
                <FloatingProductPill label="Backstage" align="right" className="relative" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone 2 — hero graphic fills remaining viewport height, shifted up toward copy */}
      <div
        className="pointer-events-none relative z-[1] -mt-[9.5rem] flex min-h-[min(22vh,380px)] w-full flex-1 flex-col justify-end max-sm:overflow-visible sm:-mt-[20.35rem] sm:min-h-[min(21vh,420px)] md:-mt-[23.34rem] md:min-h-0 lg:-mt-[29.25rem] xl:-mt-[32.5rem]"
        aria-hidden
      >
        <div
          ref={imageLayerRef}
          className="flex h-full w-full min-h-[inherit] items-end justify-center"
        >
          <div className="flex h-full w-full origin-bottom -translate-y-[7.5rem] scale-[1.06] items-end justify-center sm:-translate-y-[17.36rem] sm:scale-[0.92] md:-translate-y-[20.35rem] md:scale-[0.94] lg:-translate-y-[23.34rem] lg:scale-[0.96] xl:-translate-y-[8.45rem] xl:scale-[0.98]">
            <img
              src={HERO_ASSETS.graphic}
              className={cn(
                'h-full w-full max-w-none object-contain object-bottom',
              )}
              alt=""
              width={1458}
              height={995}
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </section>
  )
}
