import { ScrollReveal } from '../motion/ScrollReveal'
import { CreateChoiceDemo } from './CreateChoiceDemo'

export function CreateForkSection() {
  return (
    <section
      id="create"
      aria-labelledby="create-fork-heading"
      className="relative bg-white px-4 py-14 sm:px-6 sm:py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="max-w-xl">
            <h2
              id="create-fork-heading"
              className="text-balance font-sans text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl"
            >
              Start with create.
            </h2>
            <p className="mt-3 font-sans text-base leading-relaxed text-[#5A5A5A] sm:text-lg">
              Events get a type. Festivals get their own path. Same product, two different
              jobs.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <div className="mt-8 sm:mt-10">
            <CreateChoiceDemo />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
