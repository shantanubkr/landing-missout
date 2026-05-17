import { useId, useRef } from 'react'
import { PEOPLE_INVOLVED } from '../../lib/peopleInvolvedData'
import { useFaqOutlineDecorMotion } from '../../hooks/useFaqOutlineDecorMotion'
import { ScrollReveal } from '../motion/ScrollReveal'
import { TeamMemberCard } from '../people-involved/TeamMemberCard'

const OUTLINE_STAR = '/brand/missout_outline_star.svg'

export function AboutTeamSection() {
  const headingId = useId()

  const scopeRef = useRef<HTMLDivElement | null>(null)
  const starLeftRef = useRef<HTMLDivElement | null>(null)
  const starRightRef = useRef<HTMLDivElement | null>(null)
  useFaqOutlineDecorMotion(scopeRef, starLeftRef, starRightRef)

  return (
    <section
      id="about-team"
      className="bg-white py-16 sm:py-20 md:py-24"
      aria-labelledby={headingId}
    >
      {/* Full-viewport-width scope so stars can peek from edges, exactly as in FaqSection */}
      <div
        ref={scopeRef}
        className="relative right-1/2 left-1/2 -mx-[50vw] w-screen max-w-[100vw] overflow-x-clip"
      >
        {/* Left star */}
        <div
          ref={starLeftRef}
          aria-hidden
          className="pointer-events-none absolute top-48 left-0 z-0 hidden h-[min(28rem,50vh)] md:block sm:top-52 md:top-60 lg:top-72"
        >
          <img
            src={OUTLINE_STAR}
            alt=""
            className="h-[min(28rem,50vh)] w-auto max-w-none -translate-x-[58%] -translate-y-1/2 scale-x-[-1] select-none sm:h-[min(30rem,54vh)] md:h-[min(32rem,56vh)] lg:h-[min(34rem,58vh)]"
            width={718}
            height={735}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        {/* Right star */}
        <div
          ref={starRightRef}
          aria-hidden
          className="pointer-events-none absolute top-48 right-0 z-0 hidden h-[min(28rem,50vh)] md:block sm:top-52 md:top-60 lg:top-72"
        >
          <img
            src={OUTLINE_STAR}
            alt=""
            className="h-[min(28rem,50vh)] w-auto max-w-none translate-x-[58%] -translate-y-1/2 select-none sm:h-[min(30rem,54vh)] md:h-[min(32rem,56vh)] lg:h-[min(34rem,58vh)]"
            width={718}
            height={735}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        {/* Content — sits above stars via z-10 */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-center font-sans text-sm font-medium tracking-normal text-[#F92C99] sm:text-base">
              Our story
            </p>
            <h2
              id={headingId}
              className="font-display mt-4 text-center text-3xl font-bold tracking-tight text-[#1A1A1A] sm:mt-5 sm:text-4xl md:text-5xl"
            >
              Built by students, for students
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-base text-[#5A5A5A] sm:mt-5 sm:text-lg">
              Four students studying at BITS Pilani, Mumbai who believed every campus event deserves to
              be found.
            </p>
          </ScrollReveal>

          <ScrollReveal delayMs={90}>
            <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-5 md:mt-14 lg:grid-cols-3">
              {PEOPLE_INVOLVED.map((member) => (
                <li key={member.id} className="min-w-0">
                  <TeamMemberCard member={member} />
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
