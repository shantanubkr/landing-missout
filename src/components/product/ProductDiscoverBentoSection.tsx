import { useRef } from 'react'
import { cn } from '../../lib/cn'
import { useFaqOutlineDecorMotion } from '../../hooks/useFaqOutlineDecorMotion'
import { useScrollProgressDrift } from '../../hooks/useScrollProgressDrift'
import { ButtonLink } from '../ui'
import { BentoImageTile, BENTO_IMG_FULL } from './BentoImageTile'

const OUTLINE_STAR = '/brand/missout_outline_star.svg'

/** Discover bento assets (`public/product/discover-bento/`). */
const DB = {
  missout: '/product/discover-bento/1_missout.png',
  locate: '/product/discover-bento/2_locate.png',
  ticketing: '/product/discover-bento/3_ticketing.png',
  tagline: '/product/discover-bento/4_tagline.png',
  updates: '/product/discover-bento/5_updates.png',
  discover: '/product/discover-bento/6_discover.png',
  powered: '/product/discover-bento/7_powered.png',
  logo: '/product/discover-bento/8_logo.png',
} as const

/** Discover PNG tiles: flush chrome — asset pixels define edges. */
const TILE_FLUSH = 'flush' as const

/** Same gutter as manage bento — every stack/grid in this section. */
const GAP = 'gap-[10px]'

/**
 * Bottom discover row: PNGs share height 807px; intrinsic widths 1416 × 1632 × 756 → fr tracks +
 * row aspect `3804/807` so each cell matches its asset aspect (no letterboxing on md+).
 */
const DISCOVER_BOTTOM_ROW_ASPECT = 'md:aspect-[3804/807]'

/** Tagline fills stretched middle column; img uses `object-contain` so rail tops/bottoms align. */
const taglineHeroCard =
  'min-h-0 md:flex md:h-full md:min-h-0 md:flex-1 md:flex-col [&_img]:min-h-0 [&_img]:shrink-0 [&_img]:md:h-full [&_img]:md:max-h-full [&_img]:md:w-full [&_img]:md:object-contain [&_img]:md:object-center'

/**
 * Discover Events — eyebrow + headline + subcopy + CTA + bento (`/product/discover-bento/`).
 *
 * Desktop hero: **`grid-cols-3`** + **`GAP`** for even horizontal gutters (no flex basis rounding).
 * **`items-stretch`** row height — **missout | tagline | discover** share top; **locate | tagline | powered** share bottom.
 * Side rails use **`justify-between`** + **`GAP`** between the two tiles (mirrored left/right; avoids extra gaps around a spacer).
 * Parallax: layered `useScrollProgressDrift` on header, hero columns (middle strongest), bottom row (`peakPx` aligned with manage bento).
 * Secondary row: ticketing | updates | logo — equal height, widths ∝ intrinsic ratios.
 */
export function ProductDiscoverBentoSection() {
  const discoverWideScopeRef = useRef<HTMLDivElement | null>(null)
  const discoverOutlineLeftRef = useRef<HTMLDivElement | null>(null)
  const discoverOutlineRightRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const headerDriftRef = useRef<HTMLElement | null>(null)
  const colLeftRef = useRef<HTMLDivElement | null>(null)
  const colMidRef = useRef<HTMLDivElement | null>(null)
  const colRightRef = useRef<HTMLDivElement | null>(null)
  const bottomRowRef = useRef<HTMLDivElement | null>(null)

  useFaqOutlineDecorMotion(discoverWideScopeRef, discoverOutlineLeftRef, discoverOutlineRightRef)

  useScrollProgressDrift(sectionRef, headerDriftRef, 26)
  useScrollProgressDrift(sectionRef, colLeftRef, 44)
  useScrollProgressDrift(sectionRef, colMidRef, 74)
  useScrollProgressDrift(sectionRef, colRightRef, 52)
  useScrollProgressDrift(sectionRef, bottomRowRef, 38)

  return (
    <section
      ref={sectionRef}
      id="discover-events"
      aria-labelledby="discover-events-heading"
      className="bg-white pb-16 pt-12 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20"
    >
      {/*
        Outline stars: match FAQ vertical scale; gentler horizontal translate than FAQ’s 58%
        so more of the graphic stays inside the viewport (discover content is wider).
      */}
      <div
        ref={discoverWideScopeRef}
        className="relative right-1/2 left-1/2 -mx-[50vw] w-screen max-w-[100vw] overflow-x-clip"
      >
        <div
          ref={discoverOutlineLeftRef}
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-0 z-0 block',
            'top-52 h-[min(15rem,38vh)]',
            'sm:top-64 sm:h-[min(26rem,54vh)]',
            'md:top-72 md:h-[min(36rem,62vh)]',
            'lg:top-80 lg:h-[min(38rem,64vh)]',
            'xl:top-96 xl:h-[min(40rem,66vh)]',
          )}
        >
          <img
            src={OUTLINE_STAR}
            alt=""
            className="h-[min(15rem,38vh)] w-auto max-w-none -translate-x-[58%] -translate-y-1/2 scale-x-[-1] select-none md:-translate-x-[42%] sm:h-[min(26rem,54vh)] md:h-[min(36rem,62vh)] lg:h-[min(38rem,64vh)] xl:h-[min(40rem,66vh)]"
            width={718}
            height={735}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
        <div
          ref={discoverOutlineRightRef}
          aria-hidden
          className={cn(
            'pointer-events-none absolute right-0 z-0 block',
            'top-52 h-[min(15rem,38vh)]',
            'sm:top-64 sm:h-[min(26rem,54vh)]',
            'md:top-72 md:h-[min(36rem,62vh)]',
            'lg:top-80 lg:h-[min(38rem,64vh)]',
            'xl:top-96 xl:h-[min(40rem,66vh)]',
          )}
        >
          <img
            src={OUTLINE_STAR}
            alt=""
            className="h-[min(15rem,38vh)] w-auto max-w-none translate-x-[58%] -translate-y-1/2 select-none md:translate-x-[42%] sm:h-[min(26rem,54vh)] md:h-[min(36rem,62vh)] lg:h-[min(38rem,64vh)] xl:h-[min(40rem,66vh)]"
            width={718}
            height={735}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[min(100%,80.5rem)] flex-col px-4 sm:px-6 lg:px-8">
          <header ref={headerDriftRef} className="flex flex-col items-center gap-4 text-center md:gap-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#006AFE] sm:text-xs">
              What are we solving?
            </p>
            <h2
              id="discover-events-heading"
              className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#1A1A1A]"
            >
              Discover Events through Missout
            </h2>
            <p className="max-w-xl font-body text-base leading-relaxed text-[#6B6B6B] md:text-[17px]">
              <span className="block">Handle registrations, teams, and updates</span>
              <span className="mt-1 block text-[#8A8A8A]">No back and forth</span>
            </p>
            <ButtonLink to="/#contact" variant="primary" theme="product" size="md" className="mt-1 font-semibold">
              Try now
            </ButtonLink>
          </header>

          <div className={cn('mt-12 flex flex-col md:mt-14', GAP)}>
            {/* Hero: CSS grid = symmetric column gutters; stretch = shared top/bottom baselines */}
            <div className={cn('grid min-w-0 grid-cols-1 md:grid-cols-3 md:items-stretch', GAP)}>
              {/* Left rail: locate = `flex-1` + fill + `object-contain` (no scale — avoids overflow clip). */}
              <div
                ref={colLeftRef}
                className={cn(
                  'flex w-full min-h-0 min-w-0 flex-col items-stretch md:h-full md:min-h-0',
                  GAP,
                )}
              >
                <BentoImageTile
                  folder="discover-bento"
                  slot="missout"
                  src={DB.missout}
                  alt="Missout"
                  className="w-full min-w-0 shrink-0"
                  variant={TILE_FLUSH}
                />
                <BentoImageTile
                  folder="discover-bento"
                  slot="locate"
                  src={DB.locate}
                  alt="College events in your area"
                  className="relative min-h-[340px] w-full min-w-0 flex-1 md:min-h-0"
                  imgClassName="object-contain object-top"
                  variant={TILE_FLUSH}
                  fill
                />
              </div>

              <div ref={colMidRef} className="flex min-h-0 min-w-0 flex-col justify-start md:h-full md:min-h-0">
                <BentoImageTile
                  folder="discover-bento"
                  slot="tagline"
                  src={DB.tagline}
                  alt="Your campus life outside the campus — app preview"
                  className={taglineHeroCard}
                  imgClassName={BENTO_IMG_FULL}
                  variant={TILE_FLUSH}
                />
              </div>

              <div
                ref={colRightRef}
                className={cn(
                  'flex w-full min-h-0 min-w-0 flex-col items-stretch justify-between md:h-full md:min-h-0',
                  GAP,
                )}
              >
                <BentoImageTile
                  folder="discover-bento"
                  slot="discover"
                  src={DB.discover}
                  alt="Discover college events"
                  className="w-full shrink-0"
                  variant={TILE_FLUSH}
                />
                <BentoImageTile
                  folder="discover-bento"
                  slot="powered"
                  src={DB.powered}
                  alt="Powered by students"
                  className="w-full shrink-0"
                  variant={TILE_FLUSH}
                />
              </div>
            </div>

            <div
              ref={bottomRowRef}
              className={cn(
                'grid min-w-0 grid-cols-1',
                GAP,
                'md:grid-cols-[1416fr_1632fr_756fr] md:w-full',
                DISCOVER_BOTTOM_ROW_ASPECT,
              )}
            >
              <div className="min-h-0 min-w-0 md:h-full md:min-h-0">
                <BentoImageTile
                  folder="discover-bento"
                  slot="ticketing"
                  src={DB.ticketing}
                  alt="All registrations in one place"
                  fitRowMd
                  variant={TILE_FLUSH}
                />
              </div>
              <div className="min-h-0 min-w-0 md:h-full md:min-h-0">
                <BentoImageTile
                  folder="discover-bento"
                  slot="updates"
                  src={DB.updates}
                  alt="All updates here"
                  fitRowMd
                  variant={TILE_FLUSH}
                />
              </div>
              <div className="min-h-0 min-w-0 md:h-full md:min-h-0">
                <BentoImageTile
                  folder="discover-bento"
                  slot="logo"
                  src={DB.logo}
                  alt="Missout mark"
                  fitRowMd
                  variant={TILE_FLUSH}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
