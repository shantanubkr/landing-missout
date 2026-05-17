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
    backndPillRef,
    missoutPillMobileRef,
    backndPillMobileRef,
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

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 z-[1] w-full max-w-none -translate-x-1/2 select-none"
        aria-hidden
      >
        <div ref={imageLayerRef} className="flex w-full justify-center">
          <img
            src={HERO_ASSETS.graphic}
            className={cn(
              'w-full max-w-none',
              'h-auto max-h-[min(82vh,960px)] sm:max-h-[min(88vh,1080px)] md:max-h-[min(92vh,1180px)] lg:max-h-[min(96vh,1320px)]',
              'object-contain object-bottom',
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

      <div
        className="relative z-10 flex flex-1 flex-col items-center justify-start px-4 pb-20 pt-0 sm:px-6"
      >
        <div className="relative w-full max-w-7xl">
          <div className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 md:left-0 md:flex lg:-left-1 xl:-left-3">
            <div ref={missoutPillRef}>
              <FloatingProductPill label="Missout" className="relative" />
            </div>
          </div>
          <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 md:right-0 md:flex lg:-right-1 xl:-right-3">
            <div ref={backndPillRef}>
              <FloatingProductPill label="Backnd" align="right" className="relative" />
            </div>
          </div>

          <div className="mx-auto w-full max-w-4xl text-center sm:max-w-5xl">
            <CountdownLaunch className="mb-6 mt-2 sm:mb-7 sm:mt-3" />

            <h1 className="text-hero-headline">
              Missout,
              <br />
              no more.
            </h1>

            <p className="text-hero-subhead mx-auto mt-3 max-w-2xl text-[#5A5A5A] sm:mt-4">
              Handle registrations, teams, and updates
              <br />
              No back and forth
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
              <div ref={backndPillMobileRef}>
                <FloatingProductPill label="Backnd" align="right" className="relative" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
