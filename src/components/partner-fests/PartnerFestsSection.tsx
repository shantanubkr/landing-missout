import { useId, useRef } from 'react'
import { usePartnerFestParallax } from '../../hooks/usePartnerFestParallax'
import { ButtonLink } from '../ui'
import { cn } from '../../lib/cn'
import { ScrollReveal } from '../motion/ScrollReveal'
import {
  type PartnerFest,
  PARTNER_FESTS,
  partnerFestLogoPath,
} from '../../lib/partnerFestsData'

/**
 * Linear bottom → top: #F92C99 @ 14% → #003F98 @ 0%; over #D6D6D6 @ 11% + blur
 */
const partnerFestCardBackground = {
  background: `linear-gradient(to top, rgba(249, 44, 153, 0.14) 0%, rgba(0, 63, 152, 0) 100%), color-mix(in srgb, #d6d6d6 11%, transparent)`,
} as const

const PARTNER_CTA_GRAPHIC = '/partner_fests/background_graphic.svg'

/** Sides: linear dimensions 0.7× center (30% smaller); e.g. max width 26.6rem = 0.7×38rem. */
function PartnerFestCard({
  p,
  variant,
}: {
  p: PartnerFest
  variant: 'center' | 'side'
}) {
  const isCenter = variant === 'center'
  return (
    <div
      className={cn(
        'missout-glass box-border flex aspect-square w-full min-w-0 max-w-full flex-col items-center justify-center border border-solid border-[#D6D6D6]',
        isCenter
          ? 'max-w-[min(38rem,100%)] gap-1 rounded-[0.5rem] px-1 py-1.5 sm:gap-3 sm:rounded-[1.25rem] sm:px-3 sm:py-4 md:gap-4 md:rounded-[1.5rem] md:px-4 md:py-5 lg:gap-5 lg:px-5 lg:py-6 xl:gap-5 xl:px-6 xl:py-7'
          : 'max-w-[min(26.6rem,100%)] gap-0.5 rounded-[0.4rem] px-0.5 py-1 sm:gap-2 sm:rounded-[0.8rem] sm:px-2 sm:py-2.5 md:gap-2.5 md:px-[0.9rem] md:py-3.5',
      )}
      style={partnerFestCardBackground}
    >
      <div
        className={cn(
          'flex shrink-0 items-center justify-center',
          isCenter
            ? 'h-10 w-10 sm:h-16 sm:w-16 md:h-[11.4rem] md:w-[11.4rem] lg:h-[14.6rem] lg:w-[14.6rem] xl:h-[16.25rem] xl:w-[16.25rem]'
            : 'h-7 w-7 sm:h-[2.8rem] sm:w-[2.8rem] md:h-[7.95rem] md:w-[7.95rem] lg:h-[10.2rem] lg:w-[10.2rem] xl:h-[11.4rem] xl:w-[11.4rem]',
          p.logoFrame === 'dark' &&
            (isCenter
              ? 'rounded-md bg-[#0B0B0B] p-1.5 shadow-inner sm:rounded-2xl sm:p-2.5 md:rounded-[28px] md:p-4 lg:p-6 xl:p-7'
              : 'rounded-md bg-[#0B0B0B] p-1 shadow-inner sm:rounded-[12px] sm:p-1.5 md:rounded-[18px] md:p-3.5'),
        )}
      >
        <img
          src={partnerFestLogoPath(p.logoFile)}
          alt={`${p.festName} logo`}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <div className="text-center">
        <p
          className={cn(
            'font-sans font-bold leading-tight text-[#1A1A1A]',
            isCenter
              ? 'text-[0.7rem] leading-tight sm:text-sm md:text-2xl md:leading-tight lg:text-4xl lg:leading-tight xl:text-5xl 2xl:text-6xl'
              : 'text-[0.5rem] leading-tight sm:text-xs md:leading-tight md:text-[1.05rem] lg:text-[1.4rem] xl:text-[1.8rem] 2xl:text-[2.1rem]',
          )}
        >
          {p.festName}
        </p>
        <p
          className={cn(
            'mt-1.5 font-sans text-[#5A5A5A] sm:mt-2',
            isCenter
              ? 'text-[0.6rem] leading-tight sm:text-xs md:text-base md:leading-tight lg:text-lg xl:text-xl 2xl:text-2xl'
              : 'text-[0.45rem] leading-tight sm:text-[0.6rem] md:text-xs lg:text-sm xl:text-base',
          )}
        >
          {p.college}
        </p>
      </div>
    </div>
  )
}

export function PartnerFestsSection() {
  const headingId = useId()
  const partners = PARTNER_FESTS
  const n = partners.length

  const sectionRef = useRef<HTMLElement | null>(null)
  const ctaGraphicRef = useRef<HTMLDivElement | null>(null)
  const partnerCardsParallaxRef = useRef<HTMLDivElement | null>(null)
  usePartnerFestParallax(sectionRef, ctaGraphicRef, partnerCardsParallaxRef)

  const evo = partners.find((p) => p.id === 'evo-bits-design')
  const umang = partners.find((p) => p.id === 'umang')
  const rangreza = partners.find((p) => p.id === 'rangreza-bits-design')
  const rowReady = n >= 3 && evo && umang && rangreza

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-visible overflow-y-visible bg-white"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6 sm:pt-10 md:pt-12">
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

      {n > 0 && rowReady && (
        <div className="relative z-20 mx-auto mt-10 w-full min-w-0 max-w-[min(100%,72rem)] -translate-y-7 px-4 max-md:-translate-y-2 max-md:px-3 sm:mt-12 sm:px-6 md:mt-14 md:px-8">
          <div ref={partnerCardsParallaxRef} className="w-full min-w-0">
            <ul
              className="m-0 grid min-w-0 list-none grid-cols-[1fr_1.22fr_1fr] items-center justify-center gap-2 p-0 pt-1 max-md:gap-1.5 sm:grid-cols-[1fr_1.4fr_1fr] sm:gap-3 sm:pt-1 md:gap-4 md:pt-2 lg:gap-6"
              aria-label="Partner fests"
            >
            <li className="flex min-w-0 justify-center [list-style:none]">
              <ScrollReveal delayMs={0} className="w-full">
                <PartnerFestCard p={evo!} variant="side" />
              </ScrollReveal>
            </li>
            <li className="relative z-[1] flex min-w-0 justify-center [list-style:none] max-md:z-0">
              <ScrollReveal delayMs={95} className="w-full">
                <PartnerFestCard p={umang!} variant="center" />
              </ScrollReveal>
            </li>
            <li className="flex min-w-0 justify-center [list-style:none]">
              <ScrollReveal delayMs={190} className="w-full">
                <PartnerFestCard p={rangreza!} variant="side" />
              </ScrollReveal>
            </li>
            </ul>
          </div>
        </div>
      )}

      {n > 0 && !rowReady && (
        <div className="relative z-20 mx-auto mt-10 w-full min-w-0 max-w-6xl -translate-y-7 px-4 max-md:-translate-y-2 sm:mt-12 sm:px-6">
          <div ref={partnerCardsParallaxRef} className="w-full min-w-0">
            <ul className="list-none" aria-label="Partner fests">
            {partners.map((p, i) => (
              <li key={p.id} className="flex justify-center">
                <ScrollReveal delayMs={i * 90} className="w-full">
                  <PartnerFestCard p={p} variant="center" />
                </ScrollReveal>
              </li>
            ))}
            </ul>
          </div>
        </div>
      )}

      <div className="relative z-10 -mt-20 w-full min-w-0 overflow-visible pb-8 max-md:-mt-14 sm:-mt-28 sm:pb-10 md:-mt-32 md:pb-12 lg:-mt-36 lg:pb-14">
        <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-5 md:px-6">
          <div className="relative flex w-full justify-center">
            <div
              ref={ctaGraphicRef}
              className="mx-auto w-full max-w-[min(100%,80rem)] min-w-0"
            >
              <img
                src={PARTNER_CTA_GRAPHIC}
                alt=""
                className="block h-auto w-full min-w-0 select-none object-contain object-bottom"
                width={1240}
                height={381}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
            {/*
              Band starts below the card overlap; stays on the art only (does not change the image/cards).
            */}
            <div className="absolute inset-x-0 top-[26%] bottom-[13%] z-[1] flex flex-col items-center justify-center px-5 text-center max-md:top-[22%] max-md:bottom-[18%] max-md:px-4 sm:top-[26%] sm:bottom-[11%] sm:px-5 md:top-[24%] md:bottom-[10%] md:px-6">
              <ScrollReveal delayMs={260} className="mx-auto w-full max-w-md sm:max-w-lg">
                <div className="translate-y-2 sm:translate-y-3 md:translate-y-4">
                  <p className="font-display text-balance text-xl font-bold leading-[1.15] text-white drop-shadow-sm max-md:text-lg sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight lg:text-5xl">
                    <span className="block">Want to be one</span>
                    <span className="mt-0 block">of them?</span>
                  </p>
                  <p className="mt-1.5 font-sans text-xs font-semibold leading-snug text-white max-md:mx-auto max-md:max-w-[19rem] max-md:text-[13px] sm:mt-2 sm:text-base md:mt-2 md:text-lg lg:mt-2.5 lg:text-xl">
                    <span className="sm:hidden">Handle registrations, teams, and updates.</span>
                    <span className="hidden sm:inline">
                      Handle registrations, teams,
                      <br />
                      and updates.
                    </span>
                  </p>
                  <div className="mt-3 flex justify-center sm:mt-3.5">
                    <ButtonLink
                      to="/#contact"
                      variant="primary"
                      theme="home"
                      size="md"
                      className="!bg-white !text-[#F92C99] !shadow-none hover:!bg-white/90 hover:!text-[#E11E85] active:!text-[#C91872]"
                    >
                      Partner with us
                    </ButtonLink>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
