import { Link } from 'react-router-dom'
import { FEATURE_PAGES } from '../../lib/featurePages'
import { FigmaH2 } from '../figma/FigmaPrimitives'
import { PixelIcon, type PixelIconName } from '../icons/PixelIcon'
import { AnimatedText, FadeUp } from '../motion/AnimatedText'
import { SiteMediaOrImage } from '../SiteMediaOrImage'

const FEATURE_ICON: Record<string, PixelIconName> = {
  'manage-committees': 'users',
  'build-publish': 'cloud-upload',
  'run-check-ins': 'check-circle',
  'send-updates': 'bullhorn',
  'recruit-your-team': 'user-check',
  'money-proof': 'wallet',
}

function FeatureCard({ page, large }: { page: (typeof FEATURE_PAGES)[number]; large?: boolean }) {
  const icon = FEATURE_ICON[page.id] ?? 'cloud-upload'
  return (
    <li className={large ? 'sm:col-span-2' : undefined}>
      <Link
        to={page.path}
        className="group flex h-full flex-col border-b border-line no-underline sm:border-r sm:last:border-r-0"
      >
        <div
          className={`relative overflow-hidden border-b border-line bg-[#f0f0f0] ${
            large ? 'aspect-[21/9]' : 'aspect-[16/10]'
          }`}
        >
          <SiteMediaOrImage
            layout="fill"
            src={page.hero.src}
            alt={page.hero.alt}
            seed={page.id}
            fit={page.hero.fit === 'contain' ? 'contain' : 'cover'}
            className="absolute inset-0 size-full"
          />
        </div>
        <div className="flex flex-1 flex-col px-[clamp(20px,2.08vw,36px)] py-8 sm:py-10">
          <span className="mb-4 inline-flex size-10 items-center justify-center rounded-[8px] border border-line bg-[#fbfbfb] text-brand-pink transition-colors duration-200 group-hover:border-brand-pink/40 group-hover:bg-[#fff5fa]">
            <PixelIcon name={icon} className="size-[18px]" />
          </span>
          <span className="font-display text-[clamp(24px,2.2vw,36px)] leading-[0.95] text-black transition-colors duration-200 group-hover:text-brand-pink">
            {page.title}
          </span>
          <span className="font-display mt-3 block max-w-[42ch] flex-1 text-[15px] leading-[1.45] text-[#666]">
            {page.lede}
          </span>
          <span className="font-display mt-6 inline-flex items-center gap-2 text-[14px] text-black transition-colors duration-200 group-hover:text-brand-pink">
            Read more
            <PixelIcon name="angle-right" className="size-4 text-[#bbb] transition-colors duration-200 group-hover:text-brand-pink" />
          </span>
        </div>
      </Link>
    </li>
  )
}

export function FeaturesIndex() {
  const [lead, ...rest] = FEATURE_PAGES
  return (
    <div className="mx-auto max-w-[1728px] bg-white">
      <div className="mx-4 border-x border-line sm:mx-[6.97%]">
        <header className="border-b border-line px-[clamp(20px,2.08vw,36px)] py-16 sm:py-24">
          <AnimatedText
            as="h1"
            trigger="load"
            delay={80}
            text="Backstage features"
            className="font-display m-0 text-[clamp(36px,3.4vw,56px)] leading-[0.94] tracking-[0.01em] text-black"
          />
          <FadeUp trigger="load" delay={320}>
            <p className="font-display m-0 mt-5 max-w-[40ch] text-[clamp(16px,1.05vw,18px)] leading-[1.45] text-[#555]">
              Everything the committee runs before doors open — events, people, check-in, updates, hiring, and money.
            </p>
          </FadeUp>
          <FadeUp trigger="load" delay={420} className="mt-8 flex flex-wrap gap-2">
            {FEATURE_PAGES.map((page) => (
              <Link
                key={page.id}
                to={page.path}
                className="font-display rounded-full border border-line bg-[#fbfbfb] px-4 py-2 text-[13px] text-[#444] no-underline transition-colors duration-200 hover:border-brand-pink/35 hover:bg-[#fff5fa] hover:text-black"
              >
                {page.title}
              </Link>
            ))}
          </FadeUp>
        </header>

        <ul className="m-0 grid list-none grid-cols-1 p-0 sm:grid-cols-2">
          {lead ? <FeatureCard page={lead} large /> : null}
          {rest.map((page) => (
            <FeatureCard key={page.id} page={page} />
          ))}
        </ul>

        <section className="border-t border-line bg-[#f4f4f4] px-[clamp(20px,2.08vw,36px)] py-14 sm:py-16">
          <FigmaH2 className="max-w-[18ch]">One desk for fest week</FigmaH2>
          <p className="font-display m-0 mt-4 max-w-[46ch] text-[16px] leading-[1.45] text-[#555]">
            Pick a capability to see how it fits with the rest of Backstage — or book a walkthrough with the team.
          </p>
        </section>
      </div>
    </div>
  )
}
