import { useId } from 'react'
import { ScrollReveal } from '../motion/ScrollReveal'
import { PeopleTeamCarousel } from './PeopleTeamCarousel'

export function PeopleInvolvedSection() {
  const headingId = useId()

  return (
    <section
      id="people"
      className="bg-white px-4 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-12 md:pt-24 md:pb-14"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-6xl text-center">
        <ScrollReveal>
          <p className="font-sans text-sm font-medium tracking-normal text-[#F92C99] sm:text-base">
            Who are we
          </p>
          <h2
            id={headingId}
            className="font-display mt-4 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:mt-5 sm:text-4xl md:text-5xl"
          >
            People Involved
          </h2>
          <p className="font-sans mt-3 text-base text-[#5A5A5A] sm:mt-4 sm:text-lg">
            Meet the people behind Missout.
          </p>
        </ScrollReveal>
      </div>

      <PeopleTeamCarousel className="mt-10 sm:mt-12 md:mt-16" ariaLabel="People" />
    </section>
  )
}
