import { ABOUT_HERO_ASSETS } from '../../lib/heroAssets'
import { useAboutHeroParallax } from '../../hooks/useAboutHeroParallax'

export function AboutHeroSection() {
  const { sectionRef, gridLayerRef, imageLayerRef } = useAboutHeroParallax()

  return (
    <section
      ref={sectionRef}
      id="about-top"
      aria-label="About Missout"
      className="relative z-0 flex min-h-[min(85dvh,920px)] flex-col overflow-x-clip bg-white pt-20 sm:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden min-h-full w-full"
        aria-hidden
      >
        <div
          ref={gridLayerRef}
          className="hero-bg-grid absolute inset-0 min-h-full w-full will-change-transform"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-[clamp(11rem,30vh,16rem)] sm:px-6">
        <div className="mx-auto w-full max-w-4xl text-center sm:max-w-5xl">
          <p className="font-sans text-sm font-medium tracking-wide text-[#F92C99] sm:text-base">
            About us
          </p>

          <h1 className="text-about-hero-headline mt-6 sm:mt-8">
            <span className="block whitespace-nowrap">Every event deserves</span>
            <span className="block whitespace-nowrap">a full house</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-hero-subhead text-[#5A5A5A] sm:mt-6">
            One platform. Every event. Zero excuses to miss out.
          </p>
        </div>
      </div>

      {/* Decorative pixel graphic — parallax via `imageLayerRef` */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex translate-y-8 items-end justify-center overflow-visible px-4 pb-0 sm:translate-y-12 sm:px-6 md:translate-y-16"
        aria-hidden
      >
        <div
          ref={imageLayerRef}
          className="mx-auto flex w-full max-w-[min(100%,94rem)] origin-bottom items-end justify-center will-change-transform"
        >
          <img
            src={ABOUT_HERO_ASSETS.graphic}
            alt=""
            className="block h-auto w-full min-w-0 object-contain object-bottom"
            width={ABOUT_HERO_ASSETS.graphicSize.w}
            height={ABOUT_HERO_ASSETS.graphicSize.h}
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
