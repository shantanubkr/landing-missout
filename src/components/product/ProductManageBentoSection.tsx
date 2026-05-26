import { useRef } from 'react'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui'
import { BentoCard } from './BentoPrimitives'
import { useScrollProgressDrift } from '../../hooks/useScrollProgressDrift'

/*
 * Manage bento layout is finalized. Do not change grid structure, gutters, rail widths,
 * or bottom-row aspect/columns unless the user explicitly asks.
 * Cursor rule: `.cursor/rules/manage-bento-section.mdc`
 */

/** Manage bento assets (`public/product/manage-bento/`). */
const MB = {
  whole: '/product/manage-bento/1_Your_whole.png',
  pbac: '/product/manage-bento/2_PBAC.png',
  dashboard: '/product/manage-bento/3_Your_dashboard.png',
  metrics: '/product/manage-bento/4_metrics.png',
  manage: '/product/manage-bento/8_manage_event.png',
  backstage: '/product/manage-bento/7_backstage_title.png',
  activity: '/product/manage-bento/5_activity_logs.png',
  form: '/product/manage-bento/6_form_builder.png',
} as const

/** Full column/track width — avoids empty side bands that read as extra horizontal space. */
const BENTO_IMG_FULL = 'mx-auto w-full'

/**
 * Bottom pair: full track width (aligned with tiles above). Width fractions match intrinsic
 * w÷h — activity 1024/512 → 2, form 1000/360 → 25/9 → `18:25`. Row aspect ≈ (2+25/9):1 → `43/9`.
 */
const BOTTOM_PAIR_ROW_ASPECT = 'md:aspect-[43/9]'

function TopTile({
  slot,
  src,
  alt,
  className,
  imgClassName,
  equalHeightPair,
}: {
  slot: string
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** Bottom strip: shared row height; cell width from `18:25` flex tracks vs track above. */
  equalHeightPair?: boolean
}) {
  if (equalHeightPair) {
    return (
      <BentoCard
        slot={slot}
        folder="manage-bento"
        variant="flush"
        className={cn(
          'flex w-full min-h-0 flex-col justify-end p-0 md:h-full md:w-full md:min-w-0',
          className,
        )}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-auto w-full max-w-full rounded-[22px] align-middle md:h-full md:w-full md:object-contain md:object-bottom"
        />
      </BentoCard>
    )
  }

  return (
    <BentoCard
      slot={slot}
      folder="manage-bento"
      variant="flush"
      className={cn(
        /* Do not set [&_img]:w-full here — it overrides per-tile img widths (e.g. dashboard scale). */
        'w-full min-w-0 p-0',
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn(
          'block h-auto max-w-full rounded-[22px] align-middle',
          imgClassName ?? 'w-full',
        )}
      />
    </BentoCard>
  )
}

/**
 * “Manage through Backstage.” — headline + subcopy + CTA + manage bento preview.
 *
 * Gutters: `gap-[10px]` row + column. Left rail ~32.5% so whole/PBAC scale uniformly (`w-full`);
 * Bottom strip: full-width row (`aspect-[43/9]`); proportional cols `18:25`; equal rendered heights.
 * Parallax: layered `useScrollProgressDrift` on header, three columns (middle strongest), bottom row.
 */
export function ProductManageBentoSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const headerDriftRef = useRef<HTMLElement | null>(null)
  const colLeftRef = useRef<HTMLDivElement | null>(null)
  const colMidRef = useRef<HTMLDivElement | null>(null)
  const colRightRef = useRef<HTMLDivElement | null>(null)
  const bottomRowRef = useRef<HTMLDivElement | null>(null)

  /** Layered parallax vs scroll (middle column moves slightly more for depth). */
  useScrollProgressDrift(sectionRef, headerDriftRef, 26)
  useScrollProgressDrift(sectionRef, colLeftRef, 44)
  useScrollProgressDrift(sectionRef, colMidRef, 74)
  useScrollProgressDrift(sectionRef, colRightRef, 52)
  useScrollProgressDrift(sectionRef, bottomRowRef, 38)

  return (
    <section
      ref={sectionRef}
      id="manage-backstage"
      aria-labelledby="manage-backstage-heading"
      className="bg-white pb-16 pt-12 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20"
    >
      <div className="mx-auto flex w-full max-w-[min(100%,80.5rem)] flex-col px-4 sm:px-6 lg:px-8">
        <header ref={headerDriftRef} className="flex flex-col items-center gap-4 text-center md:gap-5">
          <h2
            id="manage-backstage-heading"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#1A1A1A]"
          >
            Manage through Backstage.
          </h2>
          <p className="max-w-xl font-body text-base leading-relaxed text-[#6B6B6B] md:text-[17px]">
            <span className="block">Handle registrations, teams, and updates</span>
            <span className="mt-1 block text-[#8A8A8A]">No back and forth</span>
          </p>
          <ButtonLink to="/#contact" variant="primary" theme="product" size="md" className="mt-1 font-semibold">
            Try now
          </ButtonLink>
        </header>

        <div className="mt-12 flex flex-col gap-[10px] md:mt-14">
          <div className="flex flex-col gap-[10px] md:flex-row md:items-stretch md:gap-[10px]">
            {/* Left: whole → PBAC (bottom-aligned with other columns on md+) */}
            <div
              ref={colLeftRef}
              className="flex min-h-0 flex-col gap-[10px] md:h-full md:w-[32.5%] md:shrink-0"
            >
              <TopTile
                slot="whole"
                src={MB.whole}
                alt="Your whole event in one place"
                className="shrink-0 md:items-center"
                imgClassName={BENTO_IMG_FULL}
              />
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 basis-0" aria-hidden />
                <TopTile
                  slot="pbac"
                  src={MB.pbac}
                  alt="Permission-based access control — edit and view roles"
                  className="shrink-0 md:items-center"
                  imgClassName={BENTO_IMG_FULL}
                />
              </div>
            </div>

            {/* Middle: dashboard → metrics */}
            <div
              ref={colMidRef}
              className="flex min-h-0 flex-col gap-[10px] md:h-full md:min-w-0 md:flex-[7]"
            >
              <TopTile
                slot="dashboard"
                src={MB.dashboard}
                alt="Your very own dashboard — admin overview and widgets"
                className="shrink-0 md:items-center"
                imgClassName={BENTO_IMG_FULL}
              />
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 basis-0" aria-hidden />
                <TopTile
                  slot="metrics"
                  src={MB.metrics}
                  alt="Event metrics — attendees, events, and participants"
                  className="shrink-0 md:items-center"
                  imgClassName={BENTO_IMG_FULL}
                />
              </div>
            </div>

            {/* Right: manage → backstage */}
            <div
              ref={colRightRef}
              className="flex min-h-0 flex-col gap-[10px] md:h-full md:min-w-0 md:flex-[7]"
            >
              <TopTile
                slot="manage"
                src={MB.manage}
                alt="Manage your event — edit details, competitions, schedule, and more"
                className="shrink-0 md:items-center"
                imgClassName={BENTO_IMG_FULL}
              />
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 basis-0" aria-hidden />
                <TopTile
                  slot="backstage"
                  src={MB.backstage}
                  alt="Backstage"
                  className="shrink-0 md:items-center"
                  imgClassName={BENTO_IMG_FULL}
                />
              </div>
            </div>
          </div>

          {/* Bottom row: flush L/R with track; uniform scale via shared row aspect + fr cols */}
          <div
            ref={bottomRowRef}
            className={cn('w-full flex-col gap-[10px]', 'flex md:min-h-0', BOTTOM_PAIR_ROW_ASPECT)}
          >
            <div className="flex min-h-0 w-full flex-col gap-[10px] md:h-full md:flex-row md:gap-[10px]">
              <div className="flex min-h-0 w-full min-w-0 flex-none flex-col justify-end md:flex-[18] md:basis-0">
                <TopTile
                  slot="activity"
                  src={MB.activity}
                  alt="Activity logs — review updates such as event details changes"
                  className="min-h-0"
                  equalHeightPair
                />
              </div>
              <div className="flex min-h-0 w-full min-w-0 flex-none flex-col justify-end md:flex-[25] md:basis-0">
                <TopTile
                  slot="form"
                  src={MB.form}
                  alt="Form builder — presets and fields for registration"
                  className="min-h-0"
                  equalHeightPair
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
