import { Link, useMatch } from 'react-router-dom'
import { useScrolledPast } from '../../hooks/useScrolledPast'
import { ButtonLink, type ButtonTheme } from '../ui'
import { cn } from '../../lib/cn'
import { Logo } from './Logo'

/** Past this Y offset, the navbar uses the Figma “glass” pill. */
const GLASS_AT_SCROLL_PX = 8

export function Navbar() {
  const isScrolled = useScrolledPast(GLASS_AT_SCROLL_PX)
  const isProductPage = Boolean(useMatch({ path: '/product', end: true }))
  const isAboutPage = Boolean(useMatch({ path: '/about', end: true }))
  const ctaTheme: ButtonTheme = isProductPage ? 'product' : 'home'

  // When already on /about or /product, scroll to the on-page #contact section
  // rather than navigating away to the home page.
  const contactHref = isAboutPage || isProductPage ? '#contact' : '/#contact'

  const navLinkClass = cn(
    'font-sans text-sm font-medium leading-normal text-[#1A1A1A] no-underline md:text-base',
    'outline-none transition-opacity duration-200 hover:opacity-80',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    ctaTheme === 'product'
      ? 'focus-visible:outline-[#006AFE]'
      : 'focus-visible:outline-[#F92C99]',
  )

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6">
        <div
          className={cn(
            'pointer-events-auto box-border w-full',
            'mx-auto grid grid-cols-[1fr_minmax(0,auto)_1fr] items-center',
            isScrolled
              ? 'max-w-3xl gap-x-1.5 px-3 py-2 sm:gap-x-2.5 sm:px-4 sm:py-2.5'
              : 'max-w-7xl gap-x-4 px-0 py-2.5 sm:gap-x-8 md:gap-x-10 lg:gap-x-12',
            'motion-reduce:transition-none',
            'transition-[max-width,background-color,border-color,border-radius,backdrop-filter,-webkit-backdrop-filter,gap,column-gap,row-gap,padding] duration-500 ease-out',
            isScrolled
              ? 'missout-glass rounded-full border-[0.6px] border-[var(--nav-stroke)] bg-[var(--nav-surface)]'
              : 'rounded-none border-0 border-transparent bg-transparent',
          )}
        >
          <div className="min-w-0 justify-self-start">
            <Logo focusAccent={isProductPage ? 'product' : 'home'} />
          </div>

          <nav
            className={cn(
              'flex items-center justify-center',
              isScrolled
                ? 'gap-5 sm:gap-7'
                : 'gap-10 sm:gap-11 md:gap-14',
              'transition-[gap] duration-500 ease-out motion-reduce:transition-none',
            )}
            aria-label="Main"
          >
            <Link to="/product" className={navLinkClass}>
              Products
            </Link>
            <Link to="/about" className={navLinkClass}>
              About
            </Link>
          </nav>

          <div className="min-w-0 justify-self-end">
            <ButtonLink
              to={contactHref}
              variant="primary"
              theme={ctaTheme}
              size="sm"
              className="shrink-0 !font-semibold max-sm:!px-3 max-sm:!text-xs"
              aria-label="Contact us"
            >
              <span className="hidden sm:inline">Contact Us</span>
              <span className="sm:hidden">Contact</span>
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  )
}
