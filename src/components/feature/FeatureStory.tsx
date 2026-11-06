import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  FEATURE_PAGES,
  nextFeature,
  type FeaturePageData,
  type FeatureVisual,
} from '../../lib/featurePages'
import { GET_STARTED_HREF, GET_STARTED_LABEL, REQUEST_DEMO_LABEL, REQUEST_DEMO_PATH, SITE_LINKS } from '../../lib/siteRoutes'
import { FigmaButtonPrimary, FigmaButtonSecondary } from '../figma/FigmaPrimitives'
import { PixelIcon } from '../icons/PixelIcon'
import { AnimatedText, FadeUp } from '../motion/AnimatedText'
import { SiteMediaOrImage } from '../SiteMediaOrImage'

const BTN = '!h-9 !min-w-[104px] !px-4 !text-[14px] sm:!h-10 sm:!min-w-[120px] sm:!text-[15px]'

function Screen({ visual, priority, seed }: { visual: FeatureVisual; priority?: boolean; seed: string }) {
  const contain = visual.fit === 'contain'
  const aspect = contain ? '1768/1053' : '16/10'
  return (
    <div className="relative overflow-hidden rounded-[6px] border border-line bg-white">
      <div className={`overflow-hidden ${contain ? 'aspect-[1768/1053] bg-[#f4f4f4]' : 'aspect-[16/10] bg-white'}`}>
        <SiteMediaOrImage
          src={visual.src}
          alt={visual.alt}
          seed={seed}
          aspect={aspect}
          fit={contain ? 'contain' : 'cover'}
          loading={priority ? 'eager' : 'lazy'}
          className="size-full rounded-none"
        />
      </div>
    </div>
  )
}

function Copy({
  eyebrow,
  title,
  body,
  hero,
}: {
  eyebrow?: string
  title: string
  body: string
  hero?: boolean
}) {
  return (
    <div className={`max-w-[34ch] ${hero ? '' : 'lg:max-w-[30ch]'}`}>
      {eyebrow ? (
        <Link
          to={SITE_LINKS.backstage}
          className="font-display mb-4 inline-block text-[13px] tracking-[0.08em] text-[#666] uppercase no-underline transition-colors duration-200 hover:text-brand-pink"
        >
          {eyebrow}
        </Link>
      ) : null}
      {hero ? (
        <AnimatedText
          as="h1"
          text={title}
          trigger="load"
          delay={80}
          stagger={40}
          className="m-0 font-display text-[clamp(36px,3.4vw,56px)] leading-[0.94] tracking-[0.01em] text-black"
        />
      ) : (
        <AnimatedText
          as="h2"
          text={title}
          className="m-0 font-display text-[clamp(28px,2.6vw,44px)] leading-[0.95] tracking-[0.01em] text-black"
        />
      )}
      <FadeUp trigger={hero ? 'load' : 'view'} delay={hero ? 420 : 80}>
        <p className="font-display m-0 mt-4 text-[clamp(16px,1.05vw,18px)] leading-[1.4] text-pretty text-[#555]">
          {body}
        </p>
      </FadeUp>
      {hero ? (
        <FadeUp trigger="load" delay={560} className="mt-7 flex flex-wrap gap-3">
          <FigmaButtonPrimary href={GET_STARTED_HREF} className={BTN}>
            {GET_STARTED_LABEL}
          </FigmaButtonPrimary>
          <FigmaButtonSecondary to={REQUEST_DEMO_PATH} className={BTN}>
            {REQUEST_DEMO_LABEL}
          </FigmaButtonSecondary>
        </FadeUp>
      ) : null}
    </div>
  )
}

function Row({
  children,
  image,
  imageLeft,
  priority,
  seed,
}: {
  children: ReactNode
  image: FeatureVisual
  imageLeft?: boolean
  priority?: boolean
  seed?: string
}) {
  return (
    <section className="border-b border-line">
      <div className="grid w-full items-center gap-8 px-[clamp(20px,2.08vw,36px)] py-[clamp(28px,4vh,48px)] lg:grid-cols-12 lg:gap-12">
        <div className={`lg:col-span-5 ${imageLeft ? 'lg:order-2' : ''}`}>{children}</div>
        <FadeUp
          trigger={priority ? 'load' : 'view'}
          delay={priority ? 180 : 0}
          y={0}
          scale={0.97}
          duration={800}
          className={`lg:col-span-7 ${imageLeft ? 'lg:order-1' : ''}`}
        >
          <Screen visual={image} priority={priority} seed={seed ?? image.alt} />
        </FadeUp>
      </div>
    </section>
  )
}

function Band({
  kicker,
  title,
  items,
}: {
  kicker: string
  title: string
  items: { title: string; body: string }[]
}) {
  return (
    <section className="border-b border-line bg-[#f4f4f4]" aria-label={title}>
      <div className="border-b border-line px-[clamp(20px,2.08vw,36px)] py-8 sm:py-10">
        <p className="font-display m-0 text-[13px] tracking-[0.08em] text-[#666] uppercase">{kicker}</p>
        <AnimatedText
          as="h2"
          text={title}
          className="mt-3 mb-0 font-display text-[clamp(26px,2.4vw,40px)] leading-[0.95] tracking-[0.01em] text-black"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col border-b border-line px-[clamp(20px,2.08vw,36px)] py-8 sm:border-r sm:py-10 sm:last:border-r-0 sm:last:border-b-0 max-sm:last:border-b-0"
          >
            <p className="font-display m-0 text-[clamp(18px,1.2vw,22px)] text-black">{item.title}</p>
            <p className="font-display m-0 mt-2 text-[15px] leading-[1.4] text-[#666]">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function FeatureStory({ page }: { page: FeaturePageData }) {
  const more = nextFeature(page.id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page.id])

  return (
    <div className="mx-auto max-w-[1728px] bg-white">
      <div className="mx-4 border-x border-line sm:mx-[6.97%]">
        <Row image={page.hero} priority seed={page.id}>
          <Copy eyebrow={page.eyebrow} title={page.title} body={page.lede} hero />
        </Row>

        {page.moments.map((moment, i) => (
          <div key={moment.title}>
            {i === 1 ? <Band kicker={page.band.kicker} title={page.band.title} items={page.band.items} /> : null}
            <Row image={moment} imageLeft={i % 2 === 0}>
              <Copy title={moment.title} body={moment.body} />
            </Row>
          </div>
        ))}

        <section>
          <div className="flex flex-col gap-8 px-[clamp(20px,2.08vw,36px)] py-[clamp(36px,5vh,56px)] lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-display m-0 text-[13px] tracking-[0.08em] text-[#666] uppercase">Next</p>
              <Link
                to={more.path}
                className="group mt-3 inline-flex items-center gap-2 no-underline"
              >
                <span className="font-display text-[clamp(28px,2.4vw,40px)] leading-[0.95] text-black transition-colors duration-200 group-hover:text-brand-pink">
                  {more.title}
                </span>
                <PixelIcon name="angle-right" className="size-[0.7em] text-[#bbb] transition-colors duration-200 group-hover:text-brand-pink" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              <FigmaButtonPrimary href={GET_STARTED_HREF} className={BTN}>
                {GET_STARTED_LABEL}
              </FigmaButtonPrimary>
              <FigmaButtonSecondary to={REQUEST_DEMO_PATH} className={BTN}>
                {REQUEST_DEMO_LABEL}
              </FigmaButtonSecondary>
            </div>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line px-[clamp(20px,2.08vw,36px)] py-6"
            aria-label="All features"
          >
            {FEATURE_PAGES.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`font-display text-[14px] no-underline transition-colors duration-200 ${
                  item.id === page.id ? 'text-black' : 'text-[#888] hover:text-brand-pink'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </div>
  )
}
