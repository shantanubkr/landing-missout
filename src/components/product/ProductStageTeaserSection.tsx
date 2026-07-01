import { StageRevealTeaser } from './StageRevealTeaser'

/**
 * Stage discover headline + prominent gift unwrap teaser.
 * Replaces the discover bento until Stage relaunch.
 */
export function ProductStageTeaserSection() {
  return (
    <section
      id="discover-events"
      aria-labelledby="discover-events-heading"
      className="bg-white pb-16 pt-10 sm:pb-20 sm:pt-12 md:pb-24 md:pt-16"
    >
      <div className="mx-auto flex w-full max-w-[min(100%,48rem)] flex-col px-4 sm:px-6 lg:max-w-5xl lg:px-8">
        <header className="flex flex-col items-center gap-4 text-center md:gap-5">
          <p className="font-sans text-base font-medium tracking-normal text-[#006AFE] sm:text-lg md:text-xl">
            What are we solving?
          </p>
          <h2
            id="discover-events-heading"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#1A1A1A]"
          >
            Discover Events through Stage
          </h2>
        </header>

        <div className="mt-10 sm:mt-12 md:mt-14">
          <StageRevealTeaser theme="product" />
        </div>
      </div>
    </section>
  )
}
