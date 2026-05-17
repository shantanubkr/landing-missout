import { useId } from 'react'
import { ScrollReveal } from '../motion/ScrollReveal'

export function AboutMissionSection() {
  const headingId = useId()

  return (
    <section
      id="about-mission"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="font-sans text-sm font-medium tracking-normal text-[#F92C99] sm:text-base">
            What we&apos;re building
          </p>
          <h2
            id={headingId}
            className="font-display mt-4 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:mt-5 sm:text-4xl md:text-5xl"
          >
            One clean, unified system.
          </h2>

          <div className="mt-8 space-y-6 sm:mt-10">
            <p className="font-sans text-base leading-relaxed text-[#5A5A5A] sm:text-lg">
              Missout is a college event discovery and participation platform built for students and the
              people who organise for them. We sit between fragmented WhatsApp groups, scattered PDFs,
              and word-of-mouth — and replace all of it with one clean, unified system.
            </p>

            <blockquote className="border-l-[3px] border-[#F92C99]/40 py-1 pl-5 font-display text-xl font-semibold leading-snug tracking-tight text-[#1A1A1A] sm:text-2xl">
              Your campus never stops. Now you won&apos;t either.
            </blockquote>

            <p className="font-sans text-base font-semibold leading-relaxed text-[#1A1A1A] sm:text-lg">
              Students find what&apos;s happening. Organisers get the infrastructure to manage and control
              which they never had.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
