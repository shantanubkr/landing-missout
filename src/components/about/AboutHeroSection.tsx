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

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-[clamp(10rem,22vh,14rem)] sm:px-6">
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

      {/* Pink band — pinned to section bottom, centered with a slight right nudge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex h-[clamp(12rem,28vh,22rem)] items-end justify-center overflow-visible px-4 sm:h-[clamp(13rem,30vh,24rem)] sm:px-6 md:h-[clamp(14rem,32vh,26rem)]"
        aria-hidden
      >
        <div className="translate-x-[1.5%] sm:translate-x-[2%] md:translate-x-[2.5%]">
          <div
            ref={imageLayerRef}
            className="mx-auto flex h-[clamp(12rem,28vh,22rem)] w-[min(92vw,64rem)] origin-bottom scale-[1.14] items-end justify-center sm:h-[clamp(13rem,30vh,24rem)] sm:scale-[1.2] md:scale-[1.26]"
          >
            <img
              src={ABOUT_HERO_ASSETS.graphic}
              alt=""
              className="block h-full w-full min-w-0 max-w-none object-contain object-bottom"
              width={1240}
              height={209}
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
