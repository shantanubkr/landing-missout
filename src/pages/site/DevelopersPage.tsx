import { useEffect, useRef } from 'react'
import { DocsIllo } from '../../components/DocsIllo'
import { FigmaSiteShell } from '../../components/FigmaSiteShell'
import { FigmaButtonPrimary, FigmaButtonSecondary, FigmaH1 } from '../../components/figma/FigmaPrimitives'
import { PixelIcon } from '../../components/icons/PixelIcon'
import { AnimatedText, FadeUp } from '../../components/motion/AnimatedText'
import { BOOK_DEMO_WHATSAPP, CONTACT_MAILTO } from '../../lib/links'
import { GET_STARTED_HREF, GET_STARTED_LABEL, REQUEST_DEMO_LABEL, REQUEST_DEMO_PATH } from '../../lib/siteRoutes'

const BTN = '!h-9 !min-w-[104px] !px-4 !text-[14px] sm:!h-10 sm:!min-w-[120px] sm:!text-[15px]'
const card =
  'site-cell flex flex-col border-b border-line py-10 sm:py-12 sm:border-r sm:last:border-r-0'

export function DevelopersPage() {
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      e.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <FigmaSiteShell>
      <div className="site-grid bg-white">
        <div className="site-grid-col">
          <header className="border-b border-line">
            <div className="grid items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(280px,46%)]">
              <div className="site-cell py-10 sm:py-12 lg:py-14">
                <FigmaH1>Developers</FigmaH1>
                <FadeUp trigger="load" delay={420}>
                  <p className="font-display m-0 mt-4 max-w-[34ch] text-[clamp(17px,1.27vw,22px)] leading-[1.35] text-pretty text-[#555]">
                    APIs, webhooks, and keys, when they ship.
                  </p>
                </FadeUp>
              </div>
              <div className="relative h-[240px] overflow-hidden border-t border-line sm:h-[280px] lg:h-auto lg:min-h-[340px] lg:border-t-0 lg:border-l">
                <DocsIllo />
              </div>
            </div>
          </header>

          <label className="flex h-[56px] items-center gap-3 border-b border-line bg-[#f4f4f4] px-[clamp(20px,2.4vw,40px)] sm:h-[64px]">
            <span className="sr-only">Search docs</span>
            <input
              ref={searchRef}
              type="search"
              readOnly
              placeholder="Search docs…"
              className="font-display min-w-0 flex-1 border-0 bg-transparent text-[clamp(18px,1.4vw,24px)] text-black outline-none placeholder:text-[#999]"
            />
            <kbd className="font-display hidden size-8 shrink-0 items-center justify-center rounded-[6px] border border-line bg-white text-[13px] text-[#888] sm:flex">
              /
            </kbd>
          </label>

          <section aria-labelledby="all-docs">
            <div className="site-cell border-b border-line py-6 sm:py-7">
              <h2
                id="all-docs"
                className="font-display m-0 text-[clamp(20px,1.4vw,24px)] tracking-[0.01em] text-black"
              >
                All docs
              </h2>
            </div>
            <div
              className="flex min-h-[min(52vh,560px)] items-center justify-center border-b border-line px-[clamp(20px,2.08vw,36px)] py-20"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgb(212 212 212 / 30%) 1px, transparent 1px), linear-gradient(to bottom, rgb(212 212 212 / 30%) 1px, transparent 1px)',
                backgroundSize: '27px 27px',
              }}
            >
              <div className="text-center">
                <p className="font-display m-0 text-[13px] tracking-[0.08em] text-[#666] uppercase">
                  Coming soon
                </p>
                <AnimatedText
                  as="h3"
                  text="The docs aren't public yet."
                  trigger="load"
                  delay={80}
                  className="mt-4 mb-0 font-display text-[clamp(28px,2.8vw,44px)] leading-[0.95] tracking-[0.01em] text-black"
                />
                <p className="font-display mx-auto mt-4 max-w-[36ch] text-[clamp(16px,1.05vw,18px)] leading-[1.4] text-[#555]">
                  REST, webhooks, and keys. Write us if you need them now.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="help-title">
            <div className="site-cell border-b border-line py-6 sm:py-7">
              <h2
                id="help-title"
                className="font-display m-0 text-[clamp(20px,1.4vw,24px)] tracking-[0.01em] text-black"
              >
                Help and support
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <div className={card}>
                <p className="font-display m-0 text-[clamp(18px,1.2vw,22px)] text-black">Early access</p>
                <p className="font-display m-0 mt-2 flex-1 text-[15px] leading-[1.4] text-[#666]">
                  APIs are in a closed pilot. Ask and we'll get you a key.
                </p>
                <a
                  href={GET_STARTED_HREF}
                  className="font-display mt-6 inline-flex w-fit text-[15px] text-black no-underline transition-colors duration-200 hover:text-brand-pink"
                >
                  {GET_STARTED_LABEL}
                </a>
              </div>
              <div className={card}>
                <p className="font-display m-0 text-[clamp(18px,1.2vw,22px)] text-black">Talk to us</p>
                <p className="font-display m-0 mt-2 flex-1 text-[15px] leading-[1.4] text-[#666]">
                  Same team that runs Backstage. Email if you'd rather skip the form.
                </p>
                <a
                  href={CONTACT_MAILTO}
                  className="font-display mt-6 inline-flex items-center gap-2 text-[15px] text-black no-underline transition-colors duration-200 hover:text-brand-pink"
                >
                  <PixelIcon name="envelope" className="size-4" />
                  info@missout.in
                </a>
              </div>
              <div className={card}>
                <p className="font-display m-0 text-[clamp(18px,1.2vw,22px)] text-black">Still need help?</p>
                <p className="font-display m-0 mt-2 flex-1 text-[15px] leading-[1.4] text-[#666]">
                  WhatsApp the committee desk. We answer from the same number as demos.
                </p>
                <a
                  href={BOOK_DEMO_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display mt-6 inline-flex items-center gap-2 text-[15px] text-black no-underline transition-colors duration-200 hover:text-brand-pink"
                >
                  <PixelIcon name="phone" className="size-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </section>

          <div className="site-cell flex flex-wrap gap-3 py-10 sm:py-12">
            <FigmaButtonPrimary href={GET_STARTED_HREF} className={BTN}>
              {GET_STARTED_LABEL}
            </FigmaButtonPrimary>
            <FigmaButtonSecondary to={REQUEST_DEMO_PATH} className={BTN}>
              {REQUEST_DEMO_LABEL}
            </FigmaButtonSecondary>
          </div>
        </div>
      </div>
    </FigmaSiteShell>
  )
}
