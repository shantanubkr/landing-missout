import { useAboutHeroParallax } from '../../hooks/useAboutHeroParallax'

export function AboutHeroSection() {
  const { sectionRef, gridLayerRef } = useAboutHeroParallax()

  return (
    <section
      ref={sectionRef}
      id="about-top"
      aria-label="About Missout"
      className="relative z-0 flex min-h-[min(85dvh,920px)] flex-col overflow-hidden bg-white pt-20 sm:pt-24"
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

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-6 sm:px-6 sm:pb-28">
        <div className="mx-auto w-full max-w-4xl text-center sm:max-w-5xl">
          <p className="font-sans text-sm font-medium tracking-wide text-[#F92C99] sm:text-base">
            About us
          </p>

          <h1 className="text-about-hero-headline mt-6 sm:mt-8">
            <span className="block whitespace-nowrap">Every event deserves</span>
            <span className="block whitespace-nowrap">a full house</span>
          </h1>

          <p className="text-hero-subhead mx-auto mt-5 max-w-2xl text-[#5A5A5A] sm:mt-6">
            One platform. Every event. Zero excuses to miss out.
          </p>
        </div>
      </div>
    </section>
  )
}
