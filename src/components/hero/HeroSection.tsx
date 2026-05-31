import { HERO_ASSETS } from '../../lib/heroAssets'
import { cn } from '../../lib/cn'
import { useHeroParallax } from '../../hooks/useHeroParallax'
import { ButtonLink } from '../ui'
import { CountdownLaunch } from './CountdownLaunch'
import { FloatingProductPill } from './FloatingProductPill'

export function HeroSection() {
  const {
    sectionRef,
    gridLayerRef,
    imageLayerRef,
    missoutPillRef,
    backstagePillRef,
    missoutPillMobileRef,
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
          <div className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 md:left-0 md:flex lg:-left-1 xl:-left-3">
            <div ref={missoutPillRef}>
              <FloatingProductPill label="Missout" className="relative" />
            </div>
          </div>
          <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 md:right-0 md:flex lg:-right-1 xl:-right-3">
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
              Backstage for the ones running the show
            </p>

            <div className="mt-5 flex flex-col items-center sm:mt-6">
              <ButtonLink
                to="/#contact"
                variant="outline"
                theme="home"
                size="lg"
                className="!min-h-12 !px-10 !py-3 !text-lg !font-bold sm:!min-h-14 sm:!px-14 sm:!py-3.5 sm:!text-xl"
              >
                Partner with us
              </ButtonLink>
            </div>

            <div className="mt-10 flex justify-center gap-10 sm:mt-12 md:mt-10 md:hidden">
              <div ref={missoutPillMobileRef}>
                <FloatingProductPill label="Missout" className="relative" />
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
        className="pointer-events-none relative z-[1] -mt-[8rem] flex min-h-[min(22vh,380px)] w-full flex-1 flex-col justify-end max-sm:overflow-visible sm:-mt-[11.4rem] sm:min-h-[min(21vh,420px)] md:-mt-[13.7rem] md:min-h-0 lg:-mt-[18.25rem] xl:-mt-[20.5rem]"
        aria-hidden
      >
        <div
          ref={imageLayerRef}
          className="flex h-full w-full min-h-[inherit] items-end justify-center"
        >
          <div className="flex h-full w-full origin-bottom -translate-y-[6.85rem] scale-[1.14] items-end justify-center sm:-translate-y-[9.1rem] sm:scale-100 md:-translate-y-[11.4rem] lg:-translate-y-[13.7rem] xl:-translate-y-16">
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
    </section>
  )
}
