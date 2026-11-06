import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  FigmaButtonPrimary,
  FigmaButtonSecondary,
  FigmaH1,
  FigmaH2,
} from '../figma/FigmaPrimitives'
import { PixelIcon } from '../icons/PixelIcon'
import { FadeUp } from '../motion/AnimatedText'
import { PixelWipe } from '../motion/PixelWipe'
import { CountUp } from '../motion/CountUp'
import { RollText } from '../motion/RollText'
import type { ExploreCard, FeatureCard, ProductPageData, StoryTab, TextCard, WalkItem } from '../../lib/productPages'

const THUMB_GRID: CSSProperties = {
  backgroundColor: '#f6f6f6',
  backgroundImage:
    'linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)',
  backgroundSize: '12px 12px',
}

const BTN = '!h-9 !min-w-[104px] !px-4 !text-[14px] sm:!h-10 sm:!min-w-[120px] sm:!text-[15px]'

function Action({
  label,
  href,
  to,
  kind,
}: {
  label: string
  href?: string
  to?: string
  kind: 'primary' | 'secondary'
}) {
  const Btn = kind === 'primary' ? FigmaButtonPrimary : FigmaButtonSecondary
  return (
    <Btn href={href} to={to} className={BTN}>
      {label}
    </Btn>
  )
}

function dest(item: { to?: string; href?: string }) {
  return item.href ?? item.to ?? '/'
}

function isHttp(url: string) {
  return url.startsWith('http')
}

function SmartLink({
  to,
  href,
  className,
  children,
}: {
  to?: string
  href?: string
  className: string
  children: ReactNode
}) {
  const url = dest({ to, href })
  if (isHttp(url)) {
    return (
      <a href={url} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link to={url} className={className}>
      {children}
    </Link>
  )
}

function TextLink({ to, href, children }: { to?: string; href?: string; children: string }) {
  return (
    <SmartLink
      to={to}
      href={href}
      className="group/link font-display inline-flex items-center gap-1 text-[15px] text-brand-pink no-underline"
    >
      <RollText>{children}</RollText>
      <PixelIcon name="arrow-right" className="anim-arrow size-4" />
    </SmartLink>
  )
}

/* --------------------------------- Hero --------------------------------- */

function StoryFrame({ tabs, activeId }: { tabs: StoryTab[]; activeId: string }) {
  return (
    <FadeUp
      trigger="load"
      delay={200}
      y={0}
      scale={0.97}
      duration={800}
      className="relative h-[var(--screen-h)] w-full overflow-hidden bg-[#f4f4f4]"
    >
      {tabs.map((tab, i) => {
        const on = tab.id === activeId
        const contain = tab.fit === 'contain'
        return (
          <div
            key={tab.id}
            className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out ${
              contain ? 'flex items-center justify-center p-6' : ''
            } ${on ? 'scale-100 opacity-100' : 'scale-[1.015] opacity-0'}`}
          >
            <img
              src={tab.src}
              alt={on ? tab.alt : ''}
              aria-hidden={!on}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={
                contain
                  ? 'size-full object-contain object-center p-6 sm:p-10'
                  : 'size-full object-cover object-left-top'
              }
            />
          </div>
        )
      })}
    </FadeUp>
  )
}

function StoryTabs({
  tabs,
  activeId,
  onSelect,
  label,
}: {
  tabs: StoryTab[]
  activeId: string
  onSelect: (id: string) => void
  label: string
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  useLayoutEffect(() => {
    const row = rowRef.current
    const measure = () => {
      const el = tabRefs.current[activeId]
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    if (!row || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(row)
    return () => ro.disconnect()
  }, [activeId])

  return (
    <div className="no-scrollbar overflow-x-auto">
      <div ref={rowRef} role="tablist" aria-label={label} className="relative isolate mx-auto flex w-max gap-2 py-1">
        {pill ? (
          <span
            aria-hidden
            className="pointer-events-none absolute top-1 bottom-1 z-[1] rounded-full border border-line bg-white shadow-[0_2px_10px_rgba(0,0,0,0.07)] transition-[left,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ left: pill.left, width: pill.width }}
          />
        ) : null}
        {tabs.map((tab) => {
          const on = tab.id === activeId
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el
              }}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`story-panel-${tab.id}`}
              onClick={() => onSelect(tab.id)}
              className="flex h-10 shrink-0 items-center justify-center rounded-full border border-line bg-[#fbfbfb] px-5 font-display text-[14px] tracking-[0.01em] text-black sm:h-12 sm:px-6 sm:text-[15px]"
            >
              <span className="relative z-[2]">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ProductHero({ page }: { page: ProductPageData }) {
  const [activeId, setActiveId] = useState(page.tabs[0].id)
  const active = page.tabs.find((t) => t.id === activeId) ?? page.tabs[0]

  return (
    <section className="bg-white" aria-labelledby="product-title">
      <header className="grid lg:grid-cols-[1.15fr_0.85fr] lg:divide-x lg:divide-line">
        <div className="site-cell flex items-end py-10 sm:py-12 lg:py-[clamp(48px,4.5vw,72px)]">
          <FigmaH1 id="product-title" size="xl">
            {page.name}
          </FigmaH1>
        </div>
        <FadeUp trigger="load" delay={280} className="site-cell flex flex-col justify-end border-t border-line py-10 sm:py-12 lg:border-t-0 lg:py-[clamp(48px,4.5vw,72px)]">
          <p className="font-display m-0 max-w-[28ch] text-[clamp(18px,1.4vw,24px)] leading-[1.3] text-pretty text-[#333]">
            {page.blurb}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Action kind="primary" {...page.primary} />
            {page.secondary ? <Action kind="secondary" {...page.secondary} /> : null}
          </div>
        </FadeUp>
      </header>

      <div className="border-y border-line">
        <div id={`story-panel-${active.id}`} role="tabpanel" aria-label={active.caption}>
          <StoryFrame tabs={page.tabs} activeId={activeId} />
        </div>
      </div>

      <div className="site-cell border-b border-line py-5 text-center sm:py-6">
        <StoryTabs tabs={page.tabs} activeId={activeId} onSelect={setActiveId} label={page.storyLabel} />
        <p
          key={active.id}
          className="font-display mx-auto mt-3 max-w-[40ch] text-[clamp(15px,1.05vw,18px)] leading-[1.3] text-pretty text-[#333]"
        >
          {active.caption}
        </p>
      </div>
    </section>
  )
}

/* ------------------------------ Feature grid ----------------------------- */

function Shot({ src, alt, contain }: { src: string; alt: string; contain?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[6px] border border-line" style={THUMB_GRID}>
      <div className="aspect-[16/10]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`size-full ${contain ? 'object-contain object-center p-6' : 'object-cover object-left-top'}`}
        />
      </div>
    </div>
  )
}

function FeatureTile({ card }: { card: FeatureCard }) {
  return (
    <SmartLink to={card.to} href={card.href} className="group flex flex-col no-underline">
      <Shot src={card.src} alt={card.alt} />
      <h3 className="m-0 mt-6 font-display text-[clamp(22px,1.6vw,28px)] leading-[1.05] tracking-[0.01em] text-black transition-colors duration-200 group-hover:text-brand-pink">
        {card.title}
      </h3>
      <p className="m-0 mt-2 max-w-[36ch] font-display text-[clamp(16px,1.05vw,18px)] leading-[1.35] text-pretty text-[#555]">
        {card.body}
      </p>
      <PixelWipe className="mt-4 h-9 w-fit items-center rounded-[6px] border border-line bg-[#f6f6f6] px-3 font-display text-[14px] text-black">
        {card.cta}
      </PixelWipe>
    </SmartLink>
  )
}

export function ProductFeatures({ title, cards }: { title: string; cards: FeatureCard[] }) {
  return (
    <section className="bg-white" aria-labelledby="features-title">
      <div className="site-cell border-b border-line py-10 text-center sm:py-12">
        <FigmaH2 id="features-title" className="mx-auto max-w-[16ch]">
          {title}
        </FigmaH2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {cards.map((card, i) => (
          <FadeUp key={card.title} delay={i * 100} className="site-cell border-b border-line sm:odd:border-r">
            <FeatureTile card={card} />
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

/* --------------------------------- Tools --------------------------------- */

function ToolCard({ card }: { card: TextCard }) {
  return (
    <SmartLink
      to={card.to}
      href={card.href}
      className="group flex min-h-[220px] flex-col bg-white no-underline"
    >
      <img src="/landing-figma/star-icon.svg" alt="" aria-hidden className="h-7 w-auto" />
      <h3 className="m-0 mt-5 font-display text-[clamp(20px,1.4vw,24px)] leading-[1.1] text-black transition-colors duration-200 group-hover:text-brand-pink">
        {card.title}
      </h3>
      <p className="m-0 mt-2 flex-1 font-display text-[15px] leading-[1.4] text-pretty text-[#555]">{card.body}</p>
      <span
        aria-hidden
        className="anim-arrow mt-8 inline-flex size-9 items-center justify-center rounded-full border border-line text-black transition-colors duration-200 group-hover:border-brand-pink group-hover:text-brand-pink"
      >
        <PixelIcon name="arrow-right" className="size-4" />
      </span>
    </SmartLink>
  )
}

export function ProductTools({ title, cards }: { title: string; cards: TextCard[] }) {
  return (
    <section className="bg-white" aria-labelledby="tools-title">
      <div className="site-cell border-b border-line py-10 text-center sm:py-12">
        <FigmaH2 id="tools-title" className="mx-auto max-w-[16ch]">
          {title}
        </FigmaH2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {cards.map((card, i) => (
          <FadeUp key={card.title} delay={i * 100} className="site-cell border-b border-line sm:border-r sm:last:border-r-0">
            <ToolCard card={card} />
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------- Walkthrough ------------------------------ */

export function ProductWalk({ title, items }: { title: string; items: WalkItem[] }) {
  const [open, setOpen] = useState(0)
  const current = items[open] ?? items[0]

  return (
    <section className="bg-white" aria-labelledby="walk-title">
      <div className="site-cell border-b border-line py-10 text-center sm:py-12">
        <FigmaH2 id="walk-title" className="mx-auto max-w-[16ch]">
          {title}
        </FigmaH2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="site-cell border-b border-line lg:border-r">
          {items.map((item, i) => {
            const on = i === open
            return (
              <div key={item.title} className="border-b border-line last:border-b-0">
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => setOpen(i)}
                  className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-[clamp(20px,1.5vw,26px)] leading-[1.1] text-black transition-colors duration-200 group-hover:text-brand-pink">
                    {item.title}
                  </span>
                  <PixelIcon name={on ? 'minus' : 'plus'} className="size-5 shrink-0 text-[#999]" />
                </button>
                {on ? (
                  <div className="pb-6">
                    <p className="m-0 max-w-[36ch] font-display text-[16px] leading-[1.4] text-pretty text-[#555]">
                      {item.body}
                    </p>
                    <div className="mt-4">
                      <TextLink to={item.to} href={item.href}>
                        {item.cta}
                      </TextLink>
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
        <div className="border-b border-line" style={THUMB_GRID}>
          <div className="h-[min(var(--screen-h),420px)] lg:h-full lg:min-h-[420px]">
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="size-full object-cover object-left-top"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- Stats --------------------------------- */

export function ProductStats({ stats }: { stats: ProductPageData['stats'] }) {
  return (
    <section className="bg-white" aria-label="MissOut in numbers">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {stats.map((s) => (
          <p key={s.label} className="site-cell m-0 border-b border-line py-10 text-center sm:border-r sm:last:border-r-0">
            <span className="font-display block text-[clamp(40px,4vw,64px)] leading-none tracking-[0.01em] text-black">
              <CountUp value={s.value} suffix={s.suffix ?? ''} />
            </span>
            <span className="font-display mt-2 block text-[15px] text-[#666]">{s.label}</span>
          </p>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------- CTA ---------------------------------- */

export function ProductCta({
  title,
  primary,
  secondary,
}: {
  title: string
  primary: ProductPageData['primary']
  secondary?: ProductPageData['secondary']
}) {
  return (
    <section className="border-b border-line bg-[#f4f4f4] py-14 text-center sm:py-16" aria-labelledby="cta-title">
      <div className="site-cell">
        <FigmaH2 id="cta-title" className="mx-auto max-w-[14ch]">
          {title}
        </FigmaH2>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Action kind="primary" {...primary} />
          {secondary ? <Action kind="secondary" {...secondary} /> : null}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- Explore -------------------------------- */

function ExploreTile({ card, index }: { card: ExploreCard; index: number }) {
  return (
    <FadeUp delay={index * 100} className="site-cell border-b border-line sm:odd:border-r">
      <SmartLink to={card.to} href={card.href} className="group flex flex-col no-underline">
        <Shot src={card.src} alt={card.alt} />
        <h3 className="m-0 mt-5 font-display text-[clamp(22px,1.5vw,26px)] text-black transition-colors duration-200 group-hover:text-brand-pink">
          {card.title}
        </h3>
        <p className="m-0 mt-1.5 font-display text-[16px] leading-[1.35] text-[#555]">{card.body}</p>
      </SmartLink>
    </FadeUp>
  )
}

export function ProductExplore({ title, cards }: { title: string; cards: ExploreCard[] }) {
  return (
    <section className="bg-white" aria-labelledby="explore-title">
      <div className="site-cell border-b border-line py-10 text-center sm:py-12">
        <FigmaH2 id="explore-title" className="mx-auto max-w-[16ch]">
          {title}
        </FigmaH2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {cards.map((card, i) => (
          <ExploreTile key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  )
}

export function ProductPage({ page }: { page: ProductPageData }) {
  return (
    <div className="site-grid">
      <div className="site-grid-col">
        <ProductHero page={page} />
        <ProductFeatures title={page.featuresTitle} cards={page.features} />
        <ProductTools title={page.toolsTitle} cards={page.tools} />
        <ProductWalk title={page.walkTitle} items={page.walk} />
        <ProductStats stats={page.stats} />
        <ProductCta title={page.ctaTitle} primary={page.primary} secondary={page.secondary} />
        <ProductExplore title={page.exploreTitle} cards={page.explore} />
      </div>
    </div>
  )
}

