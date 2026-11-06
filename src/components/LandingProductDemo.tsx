import { useEffect, useRef, useState } from 'react'
import {
  DEFAULT_LANDING_DEMO_TAB_ID,
  LANDING_PRODUCT_DEMO_TABS,
  type LandingDemoMedia,
} from '../lib/landingProductDemo'
import { PixelWipeScreen } from './motion/PixelWipe'
import { SiteMediaPlaceholder } from './SiteMediaPlaceholder'

/** Native aspect ratio; centered in pink frame; cap height on short viewports. */
const MEDIA_BOX = 'mx-auto block h-auto max-h-[min(85vh,920px)] w-auto max-w-full'

function DemoMedia({
  media,
  eager,
  reducedMotion,
}: {
  media: LandingDemoMedia
  eager: boolean
  reducedMotion: boolean
}) {
  if (media.kind === 'placeholder') {
    return (
      <SiteMediaPlaceholder
        seed={media.seed ?? media.alt}
        label={media.alt}
        aspect="1768/1053"
        showLabel={false}
        className="max-w-full"
      />
    )
  }

  if (media.kind === 'video' && reducedMotion) {
    return (
      <img
        src={media.staticSrc}
        alt={media.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={MEDIA_BOX}
        draggable={false}
      />
    )
  }

  if (media.kind === 'video') {
    return (
      <video
        className={MEDIA_BOX}
        src={media.src}
        poster={media.poster}
        autoPlay
        playsInline
        muted={media.muted ?? true}
        loop={media.loop ?? true}
        aria-label={media.alt}
      />
    )
  }

  return (
    <img
      src={media.src}
      alt={media.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={MEDIA_BOX}
      draggable={false}
    />
  )
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Tab row + screen. Pink frame shrink-wraps and centers each screenshot / video. */
export function LandingProductDemo() {
  const [activeId, setActiveId] = useState(DEFAULT_LANDING_DEMO_TAB_ID)
  const [wipeKey, setWipeKey] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion())
  const activeIdRef = useRef(activeId)
  activeIdRef.current = activeId
  const skipFirstWipe = useRef(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [paused, setPaused] = useState(false)
  const [autoplay, setAutoplay] = useState(true)

  const tab =
    LANDING_PRODUCT_DEMO_TABS.find((t) => t.id === activeId) ?? LANDING_PRODUCT_DEMO_TABS[0]
  const tabIndex = LANDING_PRODUCT_DEMO_TABS.findIndex((t) => t.id === tab.id)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => {
      setReducedMotion(mq.matches)
      setAutoplay(!mq.matches)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  /** Pink pixel wipe on tab change — not on first paint; off when reduced motion. */
  useEffect(() => {
    if (skipFirstWipe.current) {
      skipFirstWipe.current = false
      return
    }
    if (reducedMotion) return
    setWipeKey((k) => k + 1)
  }, [activeId, reducedMotion])

  useEffect(() => {
    if (reducedMotion) {
      setAutoplay(false)
      return
    }

    const root = rootRef.current
    let inView = true
    let hovering = false
    let hidden = document.hidden

    const sync = () => setPaused(!inView || hovering || hidden)

    const io =
      root && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              inView = Boolean(entry?.isIntersecting)
              sync()
            },
            { threshold: 0.35 },
          )
        : null
    if (root && io) io.observe(root)

    const onVis = () => {
      hidden = document.hidden
      sync()
    }
    const onEnter = () => {
      hovering = true
      sync()
    }
    const onLeave = () => {
      hovering = false
      sync()
    }

    document.addEventListener('visibilitychange', onVis)
    root?.addEventListener('pointerenter', onEnter)
    root?.addEventListener('pointerleave', onLeave)
    sync()

    return () => {
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      root?.removeEventListener('pointerenter', onEnter)
      root?.removeEventListener('pointerleave', onLeave)
    }
  }, [reducedMotion])

  const select = (id: string) => {
    setActiveId(id)
    tabRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  const advance = () => {
    const tabs = LANDING_PRODUCT_DEMO_TABS
    const i = tabs.findIndex((t) => t.id === activeIdRef.current)
    select(tabs[(i + 1) % tabs.length].id)
  }

  return (
    <div
      ref={rootRef}
      className={`demo-autoplay flex flex-col${paused ? ' is-paused' : ''}`}
      aria-label="Product demo"
    >
      <div className="no-scrollbar shrink-0 overflow-x-auto max-sm:-mx-1 max-sm:px-1">
        <div
          role="tablist"
          aria-label="Backstage features"
          className="relative mx-auto flex w-max gap-2 py-1 sm:gap-2.5"
        >
          {LANDING_PRODUCT_DEMO_TABS.map((t) => {
            const isActive = t.id === activeId
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[t.id] = el
                }}
                type="button"
                role="tab"
                id={`demo-tab-${t.id}`}
                aria-selected={isActive}
                aria-controls="demo-panel"
                onClick={() => select(t.id)}
                className={`relative z-[1] flex h-[38px] w-[138px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-line font-display text-[14px] sm:h-[clamp(42px,2.78vw,48px)] sm:w-[clamp(128px,10vw,173px)] sm:text-[clamp(15px,0.93vw,16px)] tracking-[0.01em] text-black ${
                  isActive ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.07)]' : 'bg-[#fbfbfb]'
                }`}
              >
                {isActive && autoplay ? (
                  <span
                    key={activeId}
                    className="demo-tab-fill"
                    aria-hidden
                    onAnimationEnd={(e) => {
                      if (e.animationName !== 'demo-tab-fill') return
                      advance()
                    }}
                  />
                ) : null}
                <span className="relative z-[1]">{t.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-3 flex w-full justify-center sm:mt-4">
        <div
          id="demo-panel"
          role="tabpanel"
          aria-labelledby={`demo-tab-${activeId}`}
          className="relative inline-block max-w-full overflow-hidden rounded-t-[16px] border border-b-0 border-line bg-[#f92c99] sm:rounded-t-[20px]"
        >
          <DemoMedia
            key={tab.id}
            media={tab.media}
            eager={tabIndex <= 1}
            reducedMotion={reducedMotion}
          />
          {reducedMotion ? null : <PixelWipeScreen playKey={wipeKey} />}
        </div>
      </div>
    </div>
  )
}
