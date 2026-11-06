import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMountAnim } from '../../hooks/useMountAnim'
import { useScrolled } from '../../hooks/useScrolled'
import { STAGE_APP } from '../../lib/links'
import { SITE_LINKS } from '../../lib/siteRoutes'
import { FigmaButtonSecondary } from '../figma/FigmaPrimitives'
import { PixelBurstPress } from '../motion/PixelBurst'
import { PixelIcon } from '../icons/PixelIcon'
import { NavTextLink } from '../NavTextLink'
import { ProductsDropdownPanel } from '../ProductsDropdown'
import { MobileMenuCtas, ProductsMenuPanel } from '../ProductsMenuPanel'

const NAV_LINKS = [
  { label: 'Developers', to: SITE_LINKS.developers },
  { label: 'About', to: SITE_LINKS.about },
  { label: 'Contact', to: SITE_LINKS.contact },
] as const

function useGoHome() {
  const navigate = useNavigate()
  return () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function CompactNav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false)
  const { mounted, leaving } = useMountAnim(open, 150)
  const location = useLocation()
  const goHome = useGoHome()

  useEffect(() => {
    document.body.classList.toggle('nav-menu-open', open)
    return () => document.body.classList.remove('nav-menu-open')
  }, [open])

  useEffect(() => setOpen(false), [location.pathname])

  const close = () => setOpen(false)

  return (
    <div className="lg:hidden">
      <header className={`nav-bar fixed top-0 left-0 z-[500] w-full border-b border-line bg-white pt-[env(safe-area-inset-top,0px)] ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="grid h-[var(--nav-h)] w-full grid-cols-[var(--nav-h)_1fr_var(--nav-h)]">
          <Link
            to="/"
            className="flex items-center justify-center border-r border-line"
            aria-label="MissOut home"
            onClick={() => {
              close()
              goHome()
            }}
          >
            <img src="/landing-figma/star-icon.svg" alt="" className="h-[22px] w-auto" width={28} height={35} />
          </Link>
          <span aria-hidden />
          <button
            type="button"
            className="flex items-center justify-center border-0 border-l border-line bg-white text-black"
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <PixelIcon name={open ? 'times' : 'bars'} className="size-[22px]" />
          </button>
        </div>
      </header>

      {mounted ? (
        <>
          <button
            type="button"
            className={`fixed inset-0 z-[550] bg-black/20 transition-opacity duration-150 ${leaving ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            aria-label="Close menu"
            onClick={close}
          />
          <div
            id="mobile-nav-drawer"
            className={`mobile-nav-drawer products-mega-menu fixed left-0 z-[560] w-full overflow-y-auto border-b border-line bg-white pb-[env(safe-area-inset-bottom,0px)] ${leaving ? 'is-leaving' : ''}`}
            style={{
              top: 'calc(var(--nav-h) + env(safe-area-inset-top, 0px))',
              maxHeight: 'calc(100dvh - var(--nav-h) - env(safe-area-inset-top, 0px))',
            }}
            role="dialog"
            aria-label="Site menu"
          >
            <div className="mx-auto max-w-xl px-4 py-4 sm:px-6">
              <p className="font-display m-0 mb-3 text-[16px] text-black">Products</p>
              <ProductsMenuPanel onClose={close} variant="mobile" />

              <nav className="mt-6 border-t border-line pt-4 font-display" aria-label="Site">
                <ul className="m-0 flex list-none flex-col p-0">
                  {NAV_LINKS.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="flex min-h-12 items-center border-b border-line px-2 text-[17px] text-black no-underline hover:text-brand-pink"
                        onClick={close}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <MobileMenuCtas onClose={close} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

function DesktopNav({ scrolled }: { scrolled: boolean }) {
  const [productsOpen, setProductsOpen] = useState(false)
  const { mounted, leaving } = useMountAnim(productsOpen, 150)
  const location = useLocation()
  const goHome = useGoHome()
  const shellRef = useRef<HTMLDivElement>(null)

  useEffect(() => setProductsOpen(false), [location.pathname])

  useEffect(() => {
    if (!productsOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProductsOpen(false)
    }
    const onPointer = (e: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) setProductsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onPointer)
    }
  }, [productsOpen])

  return (
    <div
      ref={shellRef}
      className="fixed top-0 left-0 z-[500] hidden w-full lg:block"
      onMouseLeave={() => setProductsOpen(false)}
    >
      <header className={`nav-bar relative h-[var(--nav-h)] w-full border-b border-line bg-white ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="mx-auto grid h-full max-w-[1728px] grid-cols-[minmax(160px,1fr)_minmax(0,918px)_minmax(160px,1fr)]">
          <div className="flex items-center justify-end pr-10">
            <Link to="/" onClick={goHome} aria-label="MissOut home" className="block">
              <img src="/landing-figma/logo.svg" alt="" className="h-[20px] w-[92px]" width={120} height={26} />
            </Link>
          </div>

          <nav
            className="flex h-full items-center justify-center gap-[clamp(24px,2.8vw,48px)] border-x border-line font-display text-[15px] tracking-[0.15px]"
            aria-label="Primary"
          >
            <button
              type="button"
              className="products-nav-trigger group flex items-center gap-1 whitespace-nowrap border-0 bg-transparent p-0 font-display text-[15px] tracking-[0.15px] text-black"
              onMouseEnter={() => setProductsOpen(true)}
              onClick={() => setProductsOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={productsOpen}
            >
              <span className="nav-text-link relative inline-block leading-none">
                <span className="nav-text-link-inner relative inline-block overflow-hidden">
                  <span className="nav-text-link-line block group-hover:-translate-y-full">
                    Products
                  </span>
                  <span
                    className="nav-text-link-line absolute left-0 top-full block text-brand-pink group-hover:-translate-y-full"
                    aria-hidden
                  >
                    Products
                  </span>
                </span>
              </span>
              <PixelIcon
                name="angle-down"
                className={`products-nav-chevron size-3 shrink-0 text-current transition-transform duration-150 group-hover:text-brand-pink ${
                  productsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {NAV_LINKS.map((item) => (
              <NavTextLink key={item.to} to={item.to} className="leading-none">
                {item.label}
              </NavTextLink>
            ))}
          </nav>

          <div className="flex items-center pl-8">
            <PixelBurstPress>
              <FigmaButtonSecondary
                href={STAGE_APP}
                tone="black"
                className="!h-9 !w-auto !min-w-[136px] !px-3 !text-[14px]"
              >
                don't missout
              </FigmaButtonSecondary>
            </PixelBurstPress>
          </div>
        </div>
      </header>

      {mounted ? <ProductsDropdownPanel leaving={leaving} onClose={() => setProductsOpen(false)} /> : null}
    </div>
  )
}

export function SiteNav() {
  const scrolled = useScrolled()
  return (
    <>
      <CompactNav scrolled={scrolled} />
      <DesktopNav scrolled={scrolled} />
    </>
  )
}
