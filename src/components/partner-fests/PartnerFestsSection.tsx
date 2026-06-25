import { useId, useRef } from 'react'
import { ButtonLink } from '../ui'
import { usePartnerFestParallax } from '../../hooks/usePartnerFestParallax'
import { ScrollReveal } from '../motion/ScrollReveal'
import {
  type PartnerCollege,
  PARTNER_COLLEGES,
  partnerFestLogoPath,
} from '../../lib/partnerFestsData'

const PARTNER_CTA_GRAPHIC = '/partner_fests/background_graphic.webp'

function PartnerStripItem({ p }: { p: PartnerCollege }) {
  return (
    <img
      src={partnerFestLogoPath(p.logoFile)}
      alt={p.college}
      className="h-40 w-40 shrink-0 object-contain sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-52 lg:w-52"
      width={208}
      height={208}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )
}

function PartnerStrip({ partners }: { partners: readonly PartnerCollege[] }) {
  if (partners.length === 0) return null

  return (
    <ul
      className="m-0 flex list-none flex-wrap items-center justify-center gap-x-10 gap-y-8 px-4 py-3 sm:gap-x-12 md:gap-x-16 lg:gap-x-20"
      aria-label="Partner colleges"
    >
      {partners.map((p) => (
        <li key={p.id} className="[list-style:none]">
          <PartnerStripItem p={p} />
        </li>
      ))}
    </ul>
  )
}

export function PartnerFestsSection() {
  const headingId = useId()
  const partners = PARTNER_COLLEGES
  const sectionRef = useRef<HTMLElement | null>(null)
  const cardsStripRef = useRef<HTMLDivElement | null>(null)
  const graphicRef = useRef<HTMLDivElement | null>(null)
  const ctaTextRef = useRef<HTMLDivElement | null>(null)

  usePartnerFestParallax(sectionRef, graphicRef, ctaTextRef, cardsStripRef)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip bg-white pb-14 pt-8 sm:pb-16 sm:pt-10 md:pb-20 md:pt-12"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <ScrollReveal>
          <p className="font-sans text-base font-medium tracking-normal text-[#F92C99] sm:text-lg md:text-xl">
            Who we are working with?
          </p>
          <h2
            id={headingId}
            className="font-display mt-4 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:mt-5 sm:text-4xl md:text-5xl"
          >
            Missout Partners
          </h2>
        </ScrollReveal>
      </div>

      {partners.length > 0 && (
        <div ref={cardsStripRef} className="mt-8 w-full sm:mt-10" aria-label="Partner fests">
          <PartnerStrip partners={partners} />
        </div>
      )}

      <div className="relative mx-auto mt-14 w-full max-w-[min(100%,92rem)] translate-y-8 overflow-visible px-0 pb-6 pt-12 sm:mt-16 sm:translate-y-10 sm:px-3 sm:pb-8 sm:pt-12 md:mt-20 md:translate-y-12 md:px-4 md:pb-10 md:pt-14 lg:mt-24 lg:max-w-[58rem] lg:translate-y-14 lg:px-4 lg:pb-12 lg:pt-16 xl:max-w-[64rem]">
        <div className="relative mx-auto w-full overflow-visible">
          <div className="-translate-y-3 translate-x-3 sm:-translate-y-4 sm:translate-x-4 md:-translate-y-5 md:translate-x-5 lg:-translate-y-6 lg:translate-x-7">
            <div ref={graphicRef} className="relative w-full will-change-transform">
            <div className="w-full origin-bottom scale-[1.28] sm:scale-[1.1] md:scale-[1.12] lg:scale-[1.2] xl:scale-[1.26]">
              <img
                src={PARTNER_CTA_GRAPHIC}
                alt=""
                className="block h-auto w-full min-w-0 max-w-none select-none object-contain object-bottom"
                width={1240}
                height={381}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
            </div>
          </div>
          <div
            ref={ctaTextRef}
            className="pointer-events-none absolute inset-x-0 top-0 bottom-[8%] z-10 flex flex-col items-center justify-end pb-[2%] px-4 text-center will-change-transform sm:bottom-[30%] sm:justify-center sm:pb-0 sm:px-6 md:bottom-[28%]"
          >
            <ScrollReveal
              delayMs={120}
              className="pointer-events-auto mx-auto w-full max-w-lg translate-y-10 sm:-translate-y-12 md:-translate-y-14"
            >
                <p className="font-display text-balance text-xl font-bold leading-[1.08] text-white drop-shadow-sm sm:text-3xl sm:leading-tight md:text-4xl lg:text-5xl">
                  <span className="block">Want to be one</span>
                  <span className="block">of them?</span>
                </p>
                <p className="mt-1.5 font-sans text-sm font-semibold leading-snug text-white sm:mt-2 sm:text-base md:text-lg">
                  Handle registrations, teams, and updates.
                </p>
                <div className="mt-2 flex justify-center sm:mt-2.5">
                  <ButtonLink
                    to="/#contact"
                    variant="primary"
                    theme="home"
                    size="sm"
                    className="!bg-white !px-5 !py-2 !text-sm !font-semibold !text-[#F92C99] !shadow-none hover:!bg-white/90 hover:!text-[#E11E85] active:!text-[#C91872]"
                  >
                    Partner with us
                  </ButtonLink>
                </div>
              </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
