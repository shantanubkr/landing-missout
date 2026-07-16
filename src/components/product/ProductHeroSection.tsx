import type { RefObject } from 'react'
import { useProductHeroParallax } from '../../hooks/useProductHeroParallax'
import {
  PRODUCT_HERO_BACKSTAGE_IMG,
  ProductGlassShell,
} from './ProductGlassShell'
import { StageRevealTeaser } from './StageRevealTeaser'

const PRODUCT_ROBOT_ICON = '/product/Robot.svg'
const PRODUCT_BG_GRAPHIC = '/product/product_bg.svg'

/** Matches `viewBox` / root `<svg width height>` in `public/product/product_bg.svg` (update if the asset changes). */
const PRODUCT_BG_SIZE = { w: 1246, h: 1033 } as const

function ProductEyebrowRobot() {
  return (
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#006AFE]/18 shadow-[0_3px_12px_rgba(0,106,254,0.14)] ring-1 ring-[#006AFE]/15 sm:h-14 sm:w-14">
      <img
        src={PRODUCT_ROBOT_ICON}
        alt=""
        width={22}
        height={22}
        className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
        decoding="async"
        draggable={false}
        aria-hidden
      />
    </span>
  )
}

function ProductGlassStageCard() {
  return <StageRevealTeaser theme="product" compact />
}

function ProductGlassBackstageCard() {
  return (
    <ProductGlassShell
      src={PRODUCT_HERO_BACKSTAGE_IMG}
      alt="Manage through Backstage"
      loading="eager"
    />
  )
}

function ProductHeroVisual({
  imageLayerRef,
  discoverCardRef,
  manageCardRef,
}: {
  imageLayerRef: RefObject<HTMLDivElement | null>
  discoverCardRef: RefObject<HTMLDivElement | null>
  manageCardRef: RefObject<HTMLDivElement | null>
}) {
  const { w, h } = PRODUCT_BG_SIZE
  return (
    <div className="relative mx-auto w-full">
      {/*
        Background graphic only — isolated clip + rounding. Cards live outside this subtree.
      */}
      <div className="pointer-events-none w-full overflow-hidden rounded-[15px]">
        <figure className="w-full" aria-hidden>
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: `${w} / ${h}` }}
          >
            <div
              ref={imageLayerRef}
              className="absolute -inset-[7%] will-change-transform md:-inset-[6%]"
            >
              <img
                src={PRODUCT_BG_GRAPHIC}
                alt=""
                width={w}
                height={h}
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover object-top"
                aria-hidden
              />
            </div>
          </div>
        </figure>
      </div>

      {/* Cards: sibling overlay — Stage gift teaser left, Backstage right */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[6%] top-[4%] z-[2] max-md:bottom-[8%] max-md:top-[10%] md:bottom-[6%] md:top-[10%] lg:top-[12%] xl:top-[14%]">
        <div className="relative mx-auto h-full w-full max-md:max-w-full max-w-[26rem] md:max-w-[min(100%,64rem)] lg:max-w-[min(100%,68rem)]">
          <div className="pointer-events-auto absolute left-1/2 top-[1%] z-[3] w-[96%] max-w-[28rem] -translate-x-1/2 -translate-y-8 max-md:left-0 max-md:right-auto max-md:top-[14%] max-md:w-[47.5%] max-md:max-w-none max-md:translate-x-0 max-md:-translate-y-0 sm:max-w-[30rem] sm:-translate-y-10 md:left-0 md:top-0 md:w-[43%] md:max-w-none md:-translate-x-4 md:-translate-y-16 lg:w-[42%] lg:-translate-x-6 lg:-translate-y-[4.75rem] xl:w-[41%] xl:-translate-x-8 xl:-translate-y-[5.25rem] 2xl:-translate-x-12 2xl:-translate-y-[5.35rem]">
            <div ref={discoverCardRef} className="will-change-transform">
              <ProductGlassStageCard />
            </div>
          </div>
          <div className="pointer-events-auto absolute bottom-[1%] left-1/2 z-[4] w-[96%] max-w-[28rem] -translate-x-1/2 -translate-y-11 max-md:bottom-auto max-md:left-auto max-md:right-0 max-md:top-[14%] max-md:w-[47.5%] max-md:max-w-none max-md:translate-x-0 max-md:-translate-y-0 sm:max-w-[30rem] sm:-translate-y-[2.875rem] md:bottom-[24%] md:right-0 md:top-auto md:w-[47%] md:max-w-none md:translate-x-4 md:-translate-y-[2.75rem] lg:w-[46%] lg:translate-x-6 lg:-translate-y-[3.25rem] xl:w-[45%] xl:translate-x-8 xl:-translate-y-[4rem] 2xl:translate-x-12 2xl:-translate-y-[4.25rem]">
            <div ref={manageCardRef} className="will-change-transform">
              <ProductGlassBackstageCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductHeroSection() {
  const { sectionRef, gridLayerRef, imageLayerRef, discoverCardRef, manageCardRef } =
    useProductHeroParallax()

  return (
    <section
      ref={sectionRef}
      id="product-top"
      aria-label="Product hero"
      className="relative z-0 overflow-visible bg-white pb-16 pt-20 sm:pb-20 sm:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden min-h-full w-full" aria-hidden>
        <div ref={gridLayerRef} className="product-hero-bg-grid absolute inset-0 min-h-full w-full will-change-transform" />
      </div>

      <div className="relative z-[1] mx-auto flex w-full max-w-6xl flex-col px-4 max-md:pb-2">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-7">
          <div className="flex flex-col items-center gap-3 text-center">
            <ProductEyebrowRobot />
            <p className="font-sans text-base font-medium tracking-normal text-[#006AFE] sm:text-lg md:text-xl">
              What are we solving?
            </p>
          </div>

          <h1 className="font-display text-[clamp(2rem,6vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[#1A1A1A]">
            What do we offer
          </h1>

          <p className="max-w-xl text-hero-subhead text-[#5A5A5A]">
            Handle registrations, teams, and updates, without the back-and-forth.
          </p>
        </div>
      </div>

      {/* Full-bleed visual — not constrained by `max-w-6xl` so cards + graphic can scale */}
      <div className="relative z-[1] mx-auto mt-5 w-full max-w-[min(100%,68rem)] origin-top px-2 max-md:mt-10 sm:mt-6 sm:px-3 md:origin-center md:scale-[0.94] md:px-5 lg:mt-8 lg:px-6 lg:scale-[0.92] xl:scale-[0.94]">
        <ProductHeroVisual
          imageLayerRef={imageLayerRef}
          discoverCardRef={discoverCardRef}
          manageCardRef={manageCardRef}
        />
      </div>
    </section>
  )
}
