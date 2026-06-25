import type { CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { SocialIcons } from '../ui/SocialIcons'

const LOGO_HORIZONTAL = '/brand/missout_horizontal.svg'

const watermarkMask: CSSProperties = {
  backgroundColor: '#ECECEC',
  WebkitMaskImage: `url(${LOGO_HORIZONTAL})`,
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskImage: `url(${LOGO_HORIZONTAL})`,
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
}

const footerLinkClass =
  'font-sans text-sm text-[#9A9A9A] no-underline transition-colors hover:text-[#1A1A1A] ' +
  'outline-none focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]'

const legalLinkClass =
  'text-[#9A9A9A] underline decoration-[#C5C5C5] underline-offset-2 transition-colors hover:text-[#1A1A1A]'

export function Footer() {
  const { pathname } = useLocation()
  const socialTheme =
    pathname === '/product' || pathname.startsWith('/product/') ? 'product' : 'home'
  const onPageWithContact = pathname === '/about' || pathname === '/product'
  const contactHref = onPageWithContact ? '#contact' : '/#contact'

  return (
    <footer aria-label="Site footer" className="mt-auto w-full overflow-visible bg-white">
      <div className="relative overflow-visible border-t border-[#E5E5E5]">
        <div
          className="pointer-events-none absolute left-1/2 top-[58%] z-0 aspect-[124/27] w-[min(96vw,72rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.38] sm:top-[55%]"
          style={watermarkMask}
          aria-hidden
        />

        <div className="relative z-10 px-4 pt-8 text-center sm:px-6 sm:pt-10">
          <p className="font-sans text-lg font-bold tracking-[0.04em] text-[#9A9A9A] sm:text-xl md:text-2xl">
            Powered by Students
          </p>
          <p className="mt-2 font-sans text-sm text-[#B0B0B0] sm:text-base">
            1+ Active Events <span aria-hidden>•</span> 733+ Students
          </p>
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-[1fr_auto_1fr] md:gap-6 lg:gap-10">
          <div className="relative z-10 flex flex-col items-center gap-2 md:items-start">
            <Link
              to="/"
              className="inline-flex outline-none focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]"
              aria-label="Missout home"
            >
              <img
                src={LOGO_HORIZONTAL}
                alt=""
                width={124}
                height={27}
                className="h-7 w-auto select-none sm:h-8"
                decoding="async"
                draggable={false}
              />
            </Link>
            <p className="font-sans text-sm text-[#B0B0B0]">Don&apos;t Missout</p>
          </div>

          <nav
            aria-label="Footer"
            className="relative z-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-6 md:justify-center"
          >
            <Link to="/terms-of-service" className={footerLinkClass}>
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className={footerLinkClass}>
              Privacy Policy
            </Link>
            <Link to={contactHref} className={footerLinkClass}>
              Contact Us
            </Link>
            <Link to={contactHref} className={footerLinkClass}>
              Partner with us
            </Link>
          </nav>

          <div className={cn('relative z-10 flex justify-center md:justify-end')}>
            <SocialIcons theme={socialTheme} size="sm" className="justify-center md:justify-end" />
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6">
        <p className="mx-auto max-w-4xl text-center font-sans text-xs leading-relaxed text-[#B0B0B0] sm:text-sm">
          By accessing this page, you confirm that you have read, understood, and agreed to our{' '}
          <Link to="/terms-of-service" className={legalLinkClass}>
            Terms of Service
          </Link>
          ,{' '}
          <Link to="/privacy" className={legalLinkClass}>
            Privacy Policy
          </Link>
          , and{' '}
          <Link to="/terms-of-service" className={legalLinkClass}>
            Content Guidelines
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  )
}
