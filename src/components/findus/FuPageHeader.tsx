import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { useScrolledPast } from '../../hooks/useScrolledPast'
import { scrollToSection } from '../../hooks/useHashScroll'
import { GET_STARTED_HREF, GET_STARTED_LABEL, REQUEST_DEMO_HREF, REQUEST_DEMO_LABEL } from '../../lib/ctas'
import { BACKSTAGE_PRODUCT_SECTIONS,
  BACKSTAGE_FEATURES_PAGE,
  BACKSTAGE_FEATURE_ROUTES,
  featureSectionHref,
} from '../../lib/backstageFeaturePages'
import { HOME_FEATURE_CTA_ICONS, type ImageAsset } from '../../lib/productAssets'
import { BACKSTAGE_FEATURES } from '../../lib/siteNav'
import { fuFocusRing } from '../../lib/design/findusMotion'
import { BrandWordmark } from '../brand/BrandWordmark'
import { MissoutIcon } from '../icons'
import { FuButtonAnchor, FuButtonLink } from './FuButton'
import { FuIconChip } from './FuIconChip'
import { FuThemeToggle } from './FuThemeToggle'

export type FuPageHeaderProps = {
  className?: string
}

const MOBILE_SPOTLIGHTS = [
  {
    title: BACKSTAGE_PRODUCT_SECTIONS[1].label,
    body: 'Create festivals and child events in one system.',
    href: BACKSTAGE_FEATURE_ROUTES.events,
    tint: 'blue' as const,
    icon: 'calender' as const,
  },
  {
    title: 'Registrations',
    body: 'Forms, teams, and capacity in one list.',
    href: BACKSTAGE_FEATURE_ROUTES.registrations,
    tint: 'pink' as const,
    icon: 'receipt' as const,
  },
  {
    title: BACKSTAGE_PRODUCT_SECTIONS[2].label,
    body: 'QR passes that match your gate list.',
    href: BACKSTAGE_FEATURE_ROUTES.checkIn,
    tint: 'lime' as const,
    icon: 'qr' as const,
  },
] as const

const tintBg = {
  blue: 'bg-[var(--fu-tint-blue-soft)]',
  pink: 'bg-[var(--fu-tint-pink-soft)]',
  lime: 'bg-[var(--fu-tint-lime-soft)]',
} as const

const navItemBase =
  'fu-type-body-sm inline-flex min-h-10 items-center gap-1 rounded-[var(--fu-radius-sm)] px-3 py-2 font-semibold text-[var(--fu-ink-secondary)] no-underline transition-[background-color,color,transform] duration-150 ease-out'

const navItemInteractive =
  'hover:bg-[var(--fu-surface)] hover:text-[var(--fu-ink)] active:scale-[0.98] motion-reduce:active:scale-100'

function navItemClass(active?: boolean, open?: boolean) {
  return cn(navItemBase, navItemInteractive, (active || open) && 'bg-[var(--fu-surface)] text-[var(--fu-ink)]')
}

function FeatureNavLink({
  sectionId,
  href,
  className,
  children,
  onNavigate,
}: {
  sectionId: string
  href: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
}) {
  const { pathname } = useLocation()

  return (
    <Link
      to={href}
      className={className}
      onClick={(event) => {
        onNavigate?.()
        if (pathname !== BACKSTAGE_FEATURES_PAGE) return
        event.preventDefault()
        scrollToSection(sectionId)
        window.history.pushState(null, '', href)
      }}
    >
      {children}
    </Link>
  )
}

function NavTextLink({
  href,
  label,
  onClick,
  active,
}: {
  href: string
  label: string
  onClick?: () => void
  active?: boolean
}) {
  const { pathname } = useLocation()
  const isActive = active ?? pathname === href

  return (
    <Link to={href} className={cn(navItemClass(isActive), fuFocusRing)} onClick={onClick}>
      {label}
    </Link>
  )
}

function ProductsHoverMenu({
  open,
  onOpen,
  onClose,
  active,
}: {
  open: boolean
  onOpen: () => void
  onClose: () => void
  active?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  const clearCloseTimer = () => {
    if (closeTimer.current !== undefined) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = undefined
    }
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimer.current = window.setTimeout(onClose, 120)
  }

  useEffect(() => {
    if (!open) return
    const onDoc = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, onClose])

  useEffect(() => () => clearCloseTimer(), [])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer()
        onOpen()
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={cn(navItemClass(active, open), fuFocusRing)}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
      >
        Products
        <MissoutIcon
          name="chevronDown"
          size={12}
          className={cn('opacity-60 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open ? (
        <div
          className="absolute left-1/2 top-full z-50 mt-3 w-[min(calc(100vw-2rem),42rem)] -translate-x-1/2 rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-canvas)] p-3 shadow-[var(--fu-shadow-soft)] sm:p-4"
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
        >
          <div className="mb-3 flex items-center justify-between gap-4 px-1">
            <p className="fu-type-meta m-0 normal-case tracking-normal text-[var(--fu-ink-subtle)]">
              Features
            </p>
            <Link
              to={BACKSTAGE_FEATURES_PAGE}
              className={cn(
                'fu-type-body-sm font-semibold text-[var(--fu-brand-blue)] no-underline hover:opacity-80',
                fuFocusRing,
              )}
              onClick={onClose}
            >
              See all features
              <MissoutIcon name="chevronRight" size={14} className="ml-1 inline-block align-middle" />
            </Link>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {BACKSTAGE_PRODUCT_SECTIONS.map((section) => (
              <FeatureMegaCard
                key={section.sectionId}
                sectionId={section.sectionId}
                title={section.label}
                icon={HOME_FEATURE_CTA_ICONS[section.ctaIcon]}
                onNavigate={onClose}
              />
            ))}
          </div>

          <div className="mt-3 border-t border-[var(--fu-hairline)] pt-3">
            <Link
              to="/stage"
              className={cn(
                'inline-flex items-center gap-1 rounded-[var(--fu-radius-sm)] px-2 py-2 fu-type-body-sm font-semibold text-[var(--fu-brand-blue)] no-underline hover:bg-[var(--fu-surface)]',
                fuFocusRing,
              )}
              onClick={onClose}
            >
              Stage for students
              <MissoutIcon name="chevronRight" size={14} className="text-current" />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function FeatureMegaCardArrow() {
  return (
    <span
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--fu-ink)] text-[var(--fu-canvas)] motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
      aria-hidden
    >
      <MissoutIcon name="arrowRight" size={14} className="text-current" />
    </span>
  )
}

function FeatureMegaCard({
  sectionId,
  title,
  icon,
  onNavigate,
}: {
  sectionId: string
  title: string
  icon: ImageAsset
  onNavigate: () => void
}) {
  return (
    <FeatureNavLink
      sectionId={sectionId}
      href={featureSectionHref(sectionId)}
      onNavigate={onNavigate}
      className={cn(
        'group flex min-h-[6.75rem] flex-col justify-between rounded-[var(--fu-radius-sm)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-ink)] bg-[var(--fu-canvas)] p-3 no-underline text-inherit motion-safe:transition-[box-shadow,transform] motion-safe:hover:shadow-[var(--fu-shadow-soft)]',
        fuFocusRing,
      )}
    >
      <img
        src={icon.src}
        alt=""
        width={icon.width}
        height={icon.height}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-10 w-10"
      />
      <div className="flex items-end justify-between gap-2">
        <p className="fu-type-body-sm m-0 font-bold leading-snug text-[var(--fu-ink)]">{title}</p>
        <FeatureMegaCardArrow />
      </div>
    </FeatureNavLink>
  )
}

function PrimaryNavButton({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <FuButtonAnchor
      href={GET_STARTED_HREF}
      variant="primary"
      size="md"
      className={cn(
        '!min-h-9 !px-4 !py-2 !text-[0.875rem] !font-medium sm:!min-h-10 sm:!px-5',
        className,
      )}
      onClick={onClick}
    >
      {GET_STARTED_LABEL}
    </FuButtonAnchor>
  )
}

function MobileSpotlightCard({
  title,
  body,
  href,
  tint,
  icon,
  onClick,
}: (typeof MOBILE_SPOTLIGHTS)[number] & { onClick?: () => void }) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        'flex items-start justify-between gap-4 rounded-[var(--fu-radius)] p-4 no-underline text-inherit',
        tintBg[tint],
        fuFocusRing,
      )}
    >
      <div className="min-w-0">
        <p className="fu-type-h3 m-0 mb-1 text-base">{title}</p>
        <p className="fu-type-body-sm m-0 text-[var(--fu-ink-secondary)]">{body}</p>
      </div>
      <FuIconChip name={icon} tint={tint} className="shrink-0" />
    </Link>
  )
}

/**
 * Notion-style site header — logo left, inline nav + chevron dropdowns, blue CTA right.
 * Mobile: logo · primary CTA · menu; open sheet with spotlight cards + links.
 */
export function FuPageHeader({ className }: FuPageHeaderProps) {
  const { pathname } = useLocation()
  const scrolled = useScrolledPast(0)
  const [productOpen, setProductOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isBackstageActive =
    pathname === BACKSTAGE_FEATURES_PAGE || pathname.startsWith('/features/')

  const closeMenus = () => {
    setProductOpen(false)
    setMobileOpen(false)
  }

  useEffect(() => {
    setProductOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-[var(--fu-canvas)] transition-[border-color,box-shadow] duration-200',
        scrolled
          ? 'border-b border-[var(--fu-hairline)] shadow-[0_1px_0_rgb(0_0_0/0.02)]'
          : 'border-b border-transparent',
        className,
      )}
    >
      <div className="flex h-14 w-full items-center gap-4 px-4 sm:h-16 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-0 lg:px-8">
        <Link
          to="/"
          className={cn(
            'shrink-0 rounded-[var(--fu-radius-sm)] transition-opacity duration-150 hover:opacity-75 lg:justify-self-start',
            fuFocusRing,
          )}
          aria-label="Missout home"
          onClick={closeMenus}
        >
          <BrandWordmark size="md" invertOnDark />
        </Link>

        <nav className="hidden items-center justify-center gap-7 lg:flex" aria-label="Main">
          <ProductsHoverMenu
            open={productOpen}
            onOpen={() => setProductOpen(true)}
            onClose={() => setProductOpen(false)}
            active={isBackstageActive}
          />

          <NavTextLink href="/about" label="About" />
          <NavTextLink href="/developers" label="Developers" />
          <NavTextLink href="/contact" label="Contact" />
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:justify-self-end lg:gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <FuThemeToggle className="!min-h-10 !min-w-10 rounded-[var(--fu-radius-sm)]" />
            <PrimaryNavButton />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <PrimaryNavButton className="!min-h-9 !px-3.5 !text-[0.8125rem]" onClick={closeMenus} />
            <button
              type="button"
              className={cn(
                'inline-flex min-h-10 min-w-10 items-center justify-center rounded-[var(--fu-radius-sm)] text-[var(--fu-ink)] transition-[background-color,color,transform] duration-150 hover:bg-[var(--fu-surface)] active:scale-[0.98] motion-reduce:active:scale-100',
                mobileOpen && 'bg-[var(--fu-surface)]',
                fuFocusRing,
              )}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((value) => !value)}
            >
              <MissoutIcon name={mobileOpen ? 'times' : 'bars'} size={20} className="text-current" />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 top-14 z-40 flex flex-col bg-[var(--fu-canvas)] sm:top-16 lg:hidden">
          <div className="flex-1 overflow-y-auto px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
            <div className="flex flex-col gap-3">
              {MOBILE_SPOTLIGHTS.map((item) => (
                <MobileSpotlightCard key={item.href} {...item} onClick={closeMenus} />
              ))}
            </div>

            <Link
              to={BACKSTAGE_FEATURES_PAGE}
              className={cn(
                'mt-4 inline-flex items-center gap-1 fu-type-body-sm font-semibold text-[var(--fu-brand-blue)] no-underline',
                fuFocusRing,
              )}
              onClick={closeMenus}
            >
              See all features
              <MissoutIcon name="chevronRight" size={14} className="text-current" />
            </Link>

            <div className="mt-6 flex flex-col gap-1">
              {BACKSTAGE_FEATURES.map((item) => (
                <FeatureNavLink
                  key={item.sectionId}
                  sectionId={item.sectionId}
                  href={item.href}
                  onNavigate={closeMenus}
                  className={cn(
                    'rounded-[var(--fu-radius-sm)] px-2 py-2 fu-type-body-sm font-semibold text-[var(--fu-ink-secondary)] no-underline hover:bg-[var(--fu-surface)] hover:text-[var(--fu-ink)]',
                    fuFocusRing,
                  )}
                >
                  {item.label}
                </FeatureNavLink>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-1 border-t border-[var(--fu-hairline)] pt-6">
              <NavTextLink href="/stage" label="Stage" onClick={closeMenus} active={pathname === '/stage'} />
              <NavTextLink href="/about" label="About" onClick={closeMenus} active={pathname === '/about'} />
              <NavTextLink
                href="/developers"
                label="Developers"
                onClick={closeMenus}
                active={pathname === '/developers'}
              />
              <NavTextLink href="/contact" label="Contact" onClick={closeMenus} active={pathname === '/contact'} />
              <FuButtonLink
                to={REQUEST_DEMO_HREF}
                variant="ghost"
                size="md"
                className="!min-h-10 !justify-start !px-0 !font-semibold !text-[var(--fu-ink)] hover:!bg-transparent hover:!opacity-70"
                onClick={closeMenus}
              >
                {REQUEST_DEMO_LABEL}
              </FuButtonLink>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[var(--fu-hairline)] pt-6">
              <FuThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
