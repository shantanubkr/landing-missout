import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { useReveal } from '../hooks/useInView'
import { Link } from 'react-router-dom'
import { FigmaSiteShell } from '../components/FigmaSiteShell'
import { FigmaButtonSecondary } from '../components/figma/FigmaPrimitives'
import { LandingProductDemo } from '../components/LandingProductDemo'
import { AnimatedText, FadeUp } from '../components/motion/AnimatedText'
import { CursorRotate } from '../components/motion/CursorRotate'
import { PixelStats } from '../components/PixelStats'
import { PixelTrail } from '../components/motion/PixelTrail'
import { PixelIcon } from '../components/icons/PixelIcon'
import { HeroStar } from '../components/motion/HeroStar'
import { PixelWipe } from '../components/motion/PixelWipe'
import { SiteMediaOrImage } from '../components/SiteMediaOrImage'
import { SHOTS } from '../lib/assets'
import { BACKSTAGE_ADMIN, BACKSTAGE_ONBOARDING, BOOK_DEMO_WHATSAPP, STAGE_APP } from '../lib/links'
import { BACKSTAGE_SECTIONS } from '../lib/products'
import { featurePath } from '../lib/siteRoutes'

const A = '/landing-figma'

/** Side gutter of the 1487px content band inside the 1728px frame. */
const BAND = 'mx-4 sm:mx-[6.97%]'
const SECTION_TITLE =
  'font-display m-0 text-center text-[clamp(32px,3.01vw,52px)] leading-[0.95] tracking-[0.01em] text-balance text-black'

function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`relative mx-auto w-full max-w-[1728px] ${className}`}>{children}</div>
}

function PixelStrip() {
  return <div className="pixel-strip" aria-hidden />
}

/* ---------------------------------- Hero ---------------------------------- */

const HERO_BTN = '!h-9 !min-w-[104px] !px-4 !text-[13px] sm:!h-9 sm:!min-w-[112px] sm:!text-[14px]'

/**
 * Anchored to the viewport edges (not the 1728px frame) so they stay half cut off at any
 * zoom level. Pixels assemble on load, then the pair drifts apart as the hero scrolls away.
 */
function HeroStars() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const h = el.offsetHeight || 1
      el.style.setProperty('--drift', String(Math.min(Math.max(window.scrollY / h, 0), 1)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 left-1/2 z-0 w-screen -translate-x-1/2 max-sm:hidden"
      style={{ '--drift': 0 } as CSSProperties}
      aria-hidden
    >
      <HeroStar side="left" />
      <HeroStar side="right" />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative shrink-0 overflow-hidden bg-white">
      <Frame>
        <div className="relative sm:mx-[15.1%] sm:border-x sm:border-line">
          <HeroStars />
          <div className="relative z-[1] flex flex-col items-center px-4 pt-7 pb-12 text-center sm:pt-[clamp(32px,3vw,48px)] sm:pb-[clamp(56px,6.5vw,104px)]">
          <FadeUp trigger="load">
            <a
              href={STAGE_APP}
              className="m-0 inline-flex h-[35px] items-center gap-2 rounded-full border border-line bg-[linear-gradient(to_right,#ffffff,#f7f7f7)] pr-2.5 pl-2.5 font-display text-[15px] leading-none text-black no-underline sm:h-[37px] sm:text-[15px]"
            >
              <img src={`${A}/pill-duck.png`} alt="" aria-hidden className="h-[28px] w-auto shrink-0 sm:h-[30px]" />
              <span>Version 2.0 is live</span>
              <span
                aria-hidden
                className="inline-flex size-[1.45em] items-center justify-center rounded-full border border-line text-black"
              >
                <PixelIcon name="angle-right" className="size-[0.9em]" />
              </span>
            </a>
          </FadeUp>

          <AnimatedText
            as="h1"
            text={'The operating system\nfor your events'}
            trigger="load"
            delay={80}
            stagger={40}
            className="mt-5 mb-0 font-display text-[32px] leading-[0.94] tracking-[0.01em] text-black sm:mt-6 sm:text-[clamp(36px,3.2vw,52px)] sm:leading-[0.94]"
          />

          <FadeUp
            trigger="load"
            delay={700}
            stagger={100}
            y={24}
            className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8"
          >
            <FigmaButtonSecondary href={BACKSTAGE_ONBOARDING} tone="black" className={HERO_BTN}>
              Get Started
            </FigmaButtonSecondary>
            <FigmaButtonSecondary href={BOOK_DEMO_WHATSAPP} className={HERO_BTN}>
              Book a demo
            </FigmaButtonSecondary>
          </FadeUp>
          </div>
        </div>
      </Frame>
    </section>
  )
}

/* ------------------------------ Product demo ------------------------------ */

function ProductBand() {
  return (
    <section
      id="product"
      className="relative flex scroll-mt-[var(--nav-h)] flex-col bg-white sm:bg-[#f4f4f4]"
      aria-label="Product tour"
    >
      <PixelTrail cell={27} offsetX={0} colors={SCREEN_TRAIL} fade={1200} />
      <Frame>
        <div
          className="px-[var(--demo-gutter)] pt-6 sm:pt-10"
          style={{ '--demo-gutter': 'clamp(24px, 8vw, 140px)' } as CSSProperties}
        >
          <LandingProductDemo />
        </div>
      </Frame>
    </section>
  )
}

const SCREEN_TRAIL = ['#ffffff', '#fde4f1', '#fbd0e6', '#f9b8da']

/* -------------------------------- Ecosystem ------------------------------- */

const BACKSTAGE_GRADIENT =
  'radial-gradient(130% 120% at 11% 5%, #666 0%, #4d4d4d 18%, #333 36%, #1a1a1a 56%, #0d0d0d 70%, #000 85%)'
const STAGE_GRADIENT =
  'radial-gradient(130% 120% at 81% 16%, #ffdcf1 0%, #feb0db 20%, #fc84c5 40%, #fb58af 60%, #f92c99 82%)'

type EcoProduct = {
  name: string
  blurb: string
  image: string
  alt: string
  gradient: string
  primary: { label: string; href: string; aria: string }
  secondary: { label: string; href: string; aria: string }
}

const ECOSYSTEM: EcoProduct[] = [
  {
    name: 'Backstage',
    blurb: 'Committee ops for events, registrations, and check-in.',
    image: SHOTS.backstageHome,
    alt: 'Backstage, the organiser dashboard',
    gradient: BACKSTAGE_GRADIENT,
    primary: { label: 'Learn More', href: BACKSTAGE_ADMIN, aria: 'Learn more about Backstage' },
    secondary: { label: 'Explore', href: BACKSTAGE_ONBOARDING, aria: 'Explore Backstage' },
  },
  {
    name: 'Stage',
    blurb: 'Discover fests, register, and show up on your phone.',
    image: SHOTS.stageHome,
    alt: 'Stage, the student event site',
    gradient: STAGE_GRADIENT,
    primary: { label: 'Learn More', href: STAGE_APP, aria: 'Learn more about Stage' },
    secondary: { label: 'Explore', href: STAGE_APP, aria: 'Explore Stage' },
  },
]

function EcoButton({ label, href, aria }: { label: string; href: string; aria: string }) {
  return (
    <FigmaButtonSecondary href={href} tone="black" ariaLabel={aria} className="!min-w-0 max-w-[182px] flex-1 !px-2 !text-[clamp(15px,1.35vw,23px)]">
      {label}
    </FigmaButtonSecondary>
  )
}

function EcosystemColumn({ product, index }: { product: EcoProduct; index: number }) {
  const first = index === 0
  const reveal = useReveal<HTMLElement>({ delay: index * 100 })
  return (
    <article
      ref={reveal.ref}
      style={reveal.style}
      className={`${reveal.className} relative border-line ${first ? 'md:border-r' : 'border-t md:border-t-0'}`}
    >
      <div
        className="relative mx-[6.59%] mt-[6.59%] aspect-[645/664] overflow-hidden rounded-[clamp(8px,0.69vw,12px)]"
        style={{ backgroundImage: product.gradient }}
      >
        <SiteMediaOrImage
          layout="fill"
          src={product.image}
          alt={product.alt}
          seed={product.name}
          className="absolute inset-0 size-full rounded-[clamp(8px,0.69vw,12px)]"
        />
      </div>

      <div className="mt-[clamp(16px,1.8vw,28px)] grid grid-cols-[129fr_486fr_129fr] border-t border-line">
        <span aria-hidden className="border-r border-line" />
        <div className="flex flex-col items-center px-[clamp(12px,1.6vw,28px)] py-[clamp(20px,2.2vw,36px)] text-center">
          <div className="flex items-center justify-center gap-[0.35em] font-display text-[clamp(26px,2.08vw,36px)] leading-none text-black">
            <img src={`${A}/star-icon.svg`} alt="" aria-hidden className="h-[0.97em] w-auto" />
            <AnimatedText as="h3" text={product.name} className="m-0 leading-none" />
          </div>
          <p className="font-display m-0 mt-2 max-w-[22em] text-[clamp(14px,0.93vw,16px)] leading-[1.35] text-[#666]">
            {product.blurb}
          </p>
          <div className="mt-5 flex w-full items-center justify-center gap-[clamp(8px,1.13vw,14px)]">
            <EcoButton {...product.primary} />
            <EcoButton {...product.secondary} />
          </div>
        </div>
        <span aria-hidden className="border-l border-line" />
      </div>
    </article>
  )
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="scroll-mt-[var(--nav-h)] overflow-hidden bg-white" aria-labelledby="ecosystem-title">
      <div className="border-b border-line py-[clamp(32px,3.41vw,59px)]">
        <AnimatedText as="h2" id="ecosystem-title" text="Missout Ecosystem" className={SECTION_TITLE} />
      </div>
      <Frame>
        <div className={`${BAND} grid grid-cols-1 border-x border-b border-line md:grid-cols-2`}>
          {ECOSYSTEM.map((p, i) => (
            <EcosystemColumn key={p.name} product={p} index={i} />
          ))}
        </div>
      </Frame>
    </section>
  )
}

/* ---------------------------- Ways to use Backstage ---------------------------- */

const WAYS_IMAGES: Record<string, string> = {
  'build-publish': SHOTS.ways.buildPublish,
  'run-check-ins': SHOTS.ways.runCheckIns,
  'manage-committees': SHOTS.ways.manageCommittees,
  'send-updates': SHOTS.ways.sendUpdates,
  'recruit-your-team': SHOTS.ways.recruit,
  'money-proof': SHOTS.ways.money,
}

type Way = {
  id: (typeof BACKSTAGE_SECTIONS)[number]['id']
  title: string
  subtitle: string
  cta: string
  /** 'bleed' runs the UI card off the right edge; 'center' suits portrait shots */
  fit: 'bleed' | 'center'
}

const WAYS: Way[] = [
  { id: 'build-publish', title: 'Build & publish', subtitle: 'Festivals, events, forms and one-click publishing', cta: 'Explore events', fit: 'bleed' },
  { id: 'run-check-ins', title: 'Run check-ins', subtitle: 'QR entry from a phone browser, walk-ins and live attendance', cta: 'Explore check-ins', fit: 'bleed' },
  { id: 'manage-committees', title: 'Manage committees', subtitle: 'Departments, roles and committee structure', cta: 'Explore committees', fit: 'bleed' },
  { id: 'send-updates', title: 'Send updates', subtitle: 'Targeted announcements to participants and teams', cta: 'Explore updates', fit: 'center' },
  { id: 'recruit-your-team', title: 'Recruit your team', subtitle: 'Applications, reviews and department assignments', cta: 'Explore recruitment', fit: 'bleed' },
  { id: 'money-proof', title: 'Money, stalls & proof', subtitle: 'Payments, stalls, sponsors and reporting', cta: 'Explore payments', fit: 'bleed' },
]

function WayCard({ way, big, index }: { way: Way; big: boolean; index: number }) {
  const reveal = useReveal<HTMLAnchorElement>({ delay: index * 100 })
  return (
    <Link
      ref={reveal.ref}
      to={featurePath(way.id)}
      style={reveal.style}
      className={`${reveal.className} group flex flex-col border-r border-b border-line bg-white px-[clamp(20px,2.08vw,36px)] pt-[clamp(24px,2.08vw,36px)] pb-[clamp(28px,2.31vw,40px)] no-underline ${
        big ? 'sm:col-span-2' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[6px] border border-line bg-[#f6f6f6] ${big ? 'aspect-[16/9]' : 'aspect-[4/3.3]'}`}
        aria-hidden
      >
        <SiteMediaOrImage
          layout="fill"
          src={WAYS_IMAGES[way.id]}
          alt=""
          seed={way.id}
          fit={way.fit === 'center' ? 'contain' : 'cover'}
          className="absolute inset-0 size-full"
        />
      </div>

      <h3 className="m-0 mt-[clamp(18px,1.62vw,28px)] font-display text-[clamp(20px,1.39vw,24px)] leading-[1.05] tracking-[0.01em] text-black transition-colors duration-200 group-hover:text-brand-pink">
        {way.title}
      </h3>
      <p className="m-0 mt-1.5 font-display text-[clamp(15px,0.93vw,16px)] leading-[1.35] text-pretty text-[#666]">
        {way.subtitle}
      </p>
      <PixelWipe className="mt-4 h-9 w-fit items-center rounded-[6px] border border-line bg-[#f6f6f6] px-3 font-display text-[14px] text-black">
        {way.cta}
      </PixelWipe>
    </Link>
  )
}

function WaysToUse() {
  return (
    <section id="developers" className="scroll-mt-[var(--nav-h)] bg-white" aria-labelledby="ways-title">
      <PixelStrip />
      <div className="pt-[clamp(36px,3.41vw,59px)] pb-[clamp(28px,1.97vw,34px)]">
        <AnimatedText as="h2" id="ways-title" text="Ways to use Backstage" className={SECTION_TITLE} />
      </div>
      <Frame>
        <div className={`${BAND} grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4`}>
          {WAYS.map((way, i) => (
            <WayCard key={way.id} way={way} big={i < 2} index={i} />
          ))}
        </div>
      </Frame>
    </section>
  )
}

function SoMuchMore() {
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="more-title">
      <Frame className="h-[clamp(260px,25.3vw,437px)]">
        <div
          className="pointer-events-none absolute top-[clamp(75px,9.43vw,163px)] left-1/2 w-[clamp(220px,27.8vw,480px)] -translate-x-1/2"
          aria-hidden
        >
          <CursorRotate rest={-30} span={180}>
            <img src={`${A}/footer-mountain.svg`} alt="" className="block h-auto w-full" />
          </CursorRotate>
        </div>
        <div className="relative pt-[clamp(48px,4.57vw,79px)]">
          <AnimatedText as="h2" id="more-title" text="And so much more!" className={SECTION_TITLE} />
        </div>
      </Frame>
    </section>
  )
}

export function HomePage() {
  return (
    <FigmaSiteShell>
      <Hero />
      <ProductBand />
      <Ecosystem />
      <PixelStats />
      <WaysToUse />
      <SoMuchMore />
    </FigmaSiteShell>
  )
}
