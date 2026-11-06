import { useEffect, useRef, useState } from 'react'
import {
  DEFAULT_LANDING_DEMO_TAB_ID,
  LANDING_PRODUCT_DEMO_TABS,
  type LandingDemoMedia,
} from '../lib/landingProductDemo'
import { FadeUp } from './motion/AnimatedText'
import { PixelWipeScreen } from './motion/PixelWipe'
import { SiteMediaPlaceholder } from './SiteMediaPlaceholder'

const WIPE_SWAP_MS = 250

function DemoMedia({ media, visible, eager }: { media: LandingDemoMedia; visible: boolean; eager: boolean }) {
  const fit = media.kind === 'placeholder' ? 'cover' : (media.fit ?? 'cover')
  const cls = `absolute inset-0 size-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${
    visible ? 'opacity-100' : 'opacity-0'
  }`

  if (media.kind === 'placeholder') {
    return (
      <SiteMediaPlaceholder
        seed={media.seed ?? media.alt}
        label={media.alt}
        aspect="1768/1053"
        showLabel={false}
        className={`absolute inset-0 size-full rounded-none transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    )
  }

  const objectPosition = media.object ?? 'left top'

  if (media.kind === 'video') {
    return (
      <video
        className={cls}
        style={{ objectPosition }}
        src={media.src}
        poster={media.poster}
        autoPlay
        playsInline
        muted={media.muted ?? true}
        loop={media.loop ?? true}
        aria-label={media.alt}
        aria-hidden={!visible}
      />
    )
  }

  return (
    <img
      src={media.src}
      alt={visible ? media.alt : ''}
      aria-hidden={!visible}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={cls}
      style={{ objectPosition }}
    />
  )
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Tab row + screen. Sits inside the grey product band; the band clips the frame bottom. */
export function LandingProductDemo() {
  const [activeId, setActiveId] = useState(DEFAULT_LANDING_DEMO_TAB_ID)
  const [shownId, setShownId] = useState(DEFAULT_LANDING_DEMO_TAB_ID)
  const [wipeKey, setWipeKey] = useState(0)
  const activeIdRef = useRef(activeId)
  activeIdRef.current = activeId
  const skipFirstWipe = useRef(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [paused, setPaused] = useState(false)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (skipFirstWipe.current) {
      skipFirstWipe.current = false
      return
    }
    if (prefersReducedMotion()) {
      setShownId(activeId)
      return
    }
    setWipeKey((k) => k + 1)
    const t = window.setTimeout(() => setShownId(activeId), WIPE_SWAP_MS)
    return () => window.clearTimeout(t)
  }, [activeId])

  useEffect(() => {
    if (prefersReducedMotion()) {
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
  }, [])

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
          {LANDING_PRODUCT_DEMO_TABS.map((tab) => {
            const isActive = tab.id === activeId
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el
                }}
                type="button"
                role="tab"
                id={`demo-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls="demo-panel"
                onClick={() => select(tab.id)}
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
                <span className="relative z-[1]">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <FadeUp
        trigger="load"
        delay={280}
        y={0}
        scale={0.97}
        duration={800}
        className="relative mx-auto mt-3 aspect-[1768/1053] w-full max-w-[1080px] overflow-hidden rounded-t-[16px] sm:mt-4 sm:rounded-t-[20px]"
      >
        <div
          id="demo-panel"
          role="tabpanel"
          aria-labelledby={`demo-tab-${activeId}`}
          className="absolute inset-0 overflow-hidden rounded-t-[16px] border border-b-0 border-line bg-[#f92c99] sm:rounded-t-[20px]"
        >
          {LANDING_PRODUCT_DEMO_TABS.map((tab, i) => (
            <DemoMedia
              key={tab.id}
              media={tab.media}
              visible={tab.id === shownId}
              eager={i <= 1 || tab.id === activeId || tab.id === shownId}
            />
          ))}
          <PixelWipeScreen playKey={wipeKey} />
        </div>
      </FadeUp>
    </div>
  )
}
