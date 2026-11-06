import { Link } from 'react-router-dom'
import { BOOK_DEMO_WHATSAPP, CONTACT_MAILTO } from '../../lib/links'
import { SITE_LINKS } from '../../lib/siteRoutes'
import { PixelIcon } from '../icons/PixelIcon'
import { CountUp } from '../motion/CountUp'
import { FooterPixels } from '../motion/FooterPixels'

const linkCls =
  'font-display text-[15px] text-[#444] no-underline transition-colors duration-150 hover:text-brand-pink'
const headCls = 'font-display m-0 mb-4 text-[13px] tracking-[0.06em] text-black/40'
const cell = 'border-r border-b border-line px-[clamp(20px,2.08vw,36px)] py-[clamp(24px,2.2vw,36px)]'
export function FigmaFooter() {
  return (
    <footer className="border-t border-line bg-white" aria-label="Site footer">
      <div className="mx-4 sm:mx-[6.97%]">
        <div className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          <div className={cell}>
            <Link to={SITE_LINKS.home} aria-label="MissOut home" className="inline-block">
              <img
                src="/landing-figma/logo.svg"
                alt=""
                className="h-[22px] w-[102px]"
                width={120}
                height={26}
              />
            </Link>
            <p className="font-display m-0 mt-4 max-w-[22ch] text-[15px] leading-[1.35] text-[#666]">
              Made to show up.
            </p>
          </div>

          <nav className={cell} aria-label="Products">
            <p className={headCls}>Products</p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              <li>
                <Link to={SITE_LINKS.backstage} className={linkCls}>
                  Backstage
                </Link>
              </li>
              <li>
                <Link to={SITE_LINKS.stage} className={linkCls}>
                  Stage
                </Link>
              </li>
              <li>
                <Link to={SITE_LINKS.features} className={`${linkCls} inline-flex items-center gap-1`}>
                  All features
                  <PixelIcon name="angle-right" className="size-3.5" />
                </Link>
              </li>
            </ul>
          </nav>

          <nav className={cell} aria-label="Company">
            <p className={headCls}>Company</p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              <li>
                <Link to={SITE_LINKS.about} className={linkCls}>
                  About
                </Link>
              </li>
              <li>
                <Link to={SITE_LINKS.developers} className={linkCls}>
                  Developers
                </Link>
              </li>
              <li>
                <Link to={SITE_LINKS.contact} className={linkCls}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className={linkCls}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className={linkCls}>
                  Terms
                </Link>
              </li>
            </ul>
          </nav>

          <div className={cell}>
            <p className={headCls}>Talk to us</p>
            <div className="font-display flex flex-col gap-3 text-[15px] leading-relaxed">
              <a
                href={CONTACT_MAILTO}
                className="inline-flex items-center gap-2 text-black no-underline hover:text-brand-pink"
              >
                <PixelIcon name="envelope" className="size-4 shrink-0" />
                info@missout.in
              </a>
              <a
                href={BOOK_DEMO_WHATSAPP}
                className="inline-flex items-center gap-2 text-black no-underline hover:text-brand-pink"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PixelIcon name="phone" className="size-4 shrink-0" />
                WhatsApp +91 97171 30609
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pixel-strip is-footer relative">
        <FooterPixels />
        <p className="pointer-events-none relative z-[1] m-0 flex h-full items-center justify-center px-4 text-center font-display text-[14px] text-pretty text-[#555]">
          Powered by Students · 1+ Active Events · <CountUp value={733} suffix="+" /> Students
        </p>
      </div>
    </footer>
  )
}
