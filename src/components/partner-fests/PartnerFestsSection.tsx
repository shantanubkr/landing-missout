import { useId } from 'react'
import { ButtonLink } from '../ui'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ScrollReveal } from '../motion/ScrollReveal'
import {
  type PartnerFest,
  PARTNER_FESTS,
  partnerFestLogoPath,
} from '../../lib/partnerFestsData'

const PARTNER_CTA_GRAPHIC = '/partner_fests/background_graphic.svg'

function PartnerStripItem({ p }: { p: PartnerFest }) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 px-6 sm:gap-4 sm:px-8"
      aria-label={`${p.festName}, ${p.college}`}
    >
      <div
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12',
          p.logoFrame === 'dark' && 'rounded-lg bg-[#0B0B0B] p-1 sm:rounded-xl sm:p-1.5',
        )}
      >
        <img
          src={partnerFestLogoPath(p.logoFile)}
          alt=""
          className="max-h-full max-w-full object-contain"
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <div className="min-w-0 text-left">
        <p className="font-sans text-base font-bold leading-tight text-[#1A1A1A] sm:text-lg">
          {p.festName}
        </p>
        <p className="mt-0.5 font-sans text-sm leading-snug text-[#5A5A5A] sm:text-[15px]">
          {p.college}
        </p>
      </div>
    </div>
  )
}

function PartnerMarquee({ partners }: { partners: readonly PartnerFest[] }) {
  const reducedMotion = usePrefersReducedMotion()

  if (partners.length === 0) return null

  if (reducedMotion) {
    return (
      <ul
        className="m-0 flex list-none flex-wrap items-center justify-center gap-x-2 gap-y-4 px-4 py-2 sm:gap-x-4"
        aria-label="Partner fests"
      >
        {partners.map((p) => (
          <li key={p.id} className="[list-style:none]">
            <PartnerStripItem p={p} />
          </li>
        ))}
      </ul>
    )
  }

  const loop = [...partners, ...partners]

  return (
    <>
      <ul className="sr-only">
        {partners.map((p) => (
          <li key={p.id}>
            {p.festName}, {p.college}
          </li>
        ))}
      </ul>
      <div className="partner-marquee-fade relative w-full overflow-hidden">
        <div className="partner-marquee-track flex w-max items-center py-2">
          {loop.map((p, i) => (
            <PartnerStripItem key={`${p.id}-${i}`} p={p} />
          ))}
        </div>
      </div>
    </>
  )
}

export function PartnerFestsSection() {
  const headingId = useId()
  const partners = PARTNER_FESTS

  return (
    <section
      className="relative overflow-hidden bg-white pb-10 pt-8 sm:pb-12 sm:pt-10 md:pb-14 md:pt-12"
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
        <div className="mt-8 w-full sm:mt-10" aria-label="Partner fests">
          <PartnerMarquee partners={partners} />
        </div>
      )}

      <div className="relative mx-auto mt-10 w-full max-w-[min(100%,92rem)] px-2 sm:mt-12 sm:px-3 md:mt-14 md:px-4">
        <div className="relative w-full translate-x-[2.5%] overflow-visible sm:translate-x-[3%] md:translate-x-[2%]">
          <div className="w-full origin-bottom scale-[1.06] sm:scale-[1.1] md:scale-[1.12]">
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
          <div className="absolute inset-x-0 top-0 bottom-[18%] flex flex-col items-center justify-center px-4 text-center sm:bottom-[16%] sm:px-6 md:bottom-[14%]">
            <ScrollReveal
              delayMs={120}
              className="mx-auto w-full max-w-lg translate-y-1 sm:translate-y-2 md:translate-y-3"
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
