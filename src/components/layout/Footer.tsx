import type { CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SocialIcons } from '../ui/SocialIcons'

const MISSOUT_HORIZONTAL = '/brand/missout_horizontal.svg'

const logoMask: CSSProperties = {
  backgroundColor: '#F6F6F6',
  WebkitMaskImage: `url(${MISSOUT_HORIZONTAL})`,
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center bottom',
  maskImage: `url(${MISSOUT_HORIZONTAL})`,
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center bottom',
}

export function Footer() {
  const { pathname } = useLocation()
  const socialTheme =
    pathname === '/product' || pathname.startsWith('/product/') ? 'product' : 'home'

  return (
    <footer aria-label="Site footer" className="mt-auto w-full">
      <div className="bg-white">
        <p className="px-6 pt-6 text-center font-sans text-lg font-bold tracking-[0.04em] text-[#9A9A9A] sm:pt-8 sm:text-xl md:pt-10 md:text-2xl">
          Powered by Students
        </p>
        <div className="flex justify-center px-4 pb-1 pt-4 sm:px-6 sm:pb-2 sm:pt-5">
          <SocialIcons theme={socialTheme} size="md" />
        </div>

        {/* No clipping — scale is prior 1.14 / 1.18 / 1.22 × 0.9 (10% smaller) */}
        <div className="mx-auto px-3 pt-6 pb-8 sm:px-6 sm:pt-8 sm:pb-10 md:pt-10 md:pb-12">
          <div
            role="img"
            aria-label="Missout"
            className="pointer-events-none mx-auto block aspect-[124/27] w-full max-w-[88rem] origin-bottom scale-[1.026] sm:scale-[1.062] md:scale-[1.098]"
            style={logoMask}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 bg-black px-4 py-3 sm:py-4">
        <Link
          to="/privacy"
          className="font-sans text-xs text-[#6A6A6A] transition-colors hover:text-white sm:text-sm"
        >
          Privacy Policy
        </Link>
        <span className="text-[#3A3A3A]" aria-hidden>·</span>
        <Link
          to="/terms-of-service"
          className="font-sans text-xs text-[#6A6A6A] transition-colors hover:text-white sm:text-sm"
        >
          Terms of Service
        </Link>
      </div>
    </footer>
  )
}
