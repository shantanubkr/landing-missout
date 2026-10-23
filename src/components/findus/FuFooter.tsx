import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import {
  CONTACT_EMAIL,
  GET_STARTED_HREF,
  GET_STARTED_LABEL,
  REQUEST_DEMO_HREF,
  REQUEST_DEMO_LABEL,
  REQUEST_DEMO_PHONE,
  REQUEST_DEMO_WHATSAPP,
} from '../../lib/ctas'
import { BACKSTAGE_FEATURES } from '../../lib/siteNav'
import { BrandWordmark } from '../brand/BrandWordmark'
import { SocialIcons } from '../ui/SocialIcons'
import { fuFocusRing } from '../../lib/design/findusMotion'
import { FuButtonAnchor, FuButtonLink } from './FuButton'
import { FuContainer } from './FuContainer'
import { FuMeta } from './FuTypography'

const linkClass =
  'fu-type-body-sm text-[var(--fu-ink-muted)] no-underline transition-colors hover:text-[var(--fu-ink)] ' +
  fuFocusRing

export type FuFooterProps = {
  tone?: 'light' | 'dark' | 'surface'
  className?: string
}

/**
 * Multi-column footer — Backstage links, company, CTAs, email/WhatsApp.
 * Optional Lime top accent hairline.
 */
export function FuFooter({ tone = 'surface', className }: FuFooterProps) {
  const toneClass = {
    light: 'bg-[var(--fu-canvas)] text-[var(--fu-ink)]',
    surface: 'bg-[var(--fu-surface)] text-[var(--fu-ink)]',
    dark: 'bg-[var(--fu-band-dark)] text-[var(--fu-band-dark-ink)]',
  }[tone]

  const mutedClass =
    tone === 'dark' ? 'text-[var(--fu-band-dark-muted)]' : 'text-[var(--fu-ink-muted)]'

  return (
    <footer
      aria-label="Site footer"
      className={cn('mt-auto border-t border-[var(--fu-hairline)]', toneClass, className)}
    >
      <FuContainer className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link to="/" className={cn('inline-flex', fuFocusRing)} aria-label="Missout home">
              <BrandWordmark size="md" />
            </Link>
            <FuMeta className={cn('mt-2', mutedClass)}>Don&apos;t Missout</FuMeta>
            <p className={cn('fu-type-body-sm m-0 mt-4', mutedClass)}>
              <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                {CONTACT_EMAIL}
              </a>
              <br />
              <a href={REQUEST_DEMO_WHATSAPP} className={linkClass} target="_blank" rel="noopener noreferrer">
                WhatsApp {REQUEST_DEMO_PHONE}
              </a>
            </p>
          </div>

          <nav aria-label="Backstage">
            <p className="fu-type-h3 m-0 mb-3 text-base">Backstage</p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {BACKSTAGE_FEATURES.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/stage" className={linkClass}>
                  Stage
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="fu-type-h3 m-0 mb-3 text-base">Company</p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {[
                { label: 'About', href: '/about' },
                { label: 'Developers', href: '/developers' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="fu-type-h3 m-0 mb-3 text-base">Get started</p>
            <div className="flex flex-col gap-2 sm:items-start">
              <FuButtonAnchor href={GET_STARTED_HREF} variant="primary" size="md">
                {GET_STARTED_LABEL}
              </FuButtonAnchor>
              <FuButtonLink to={REQUEST_DEMO_HREF} variant="secondary" size="md">
                {REQUEST_DEMO_LABEL}
              </FuButtonLink>
            </div>
            <div className="mt-6">
              <p className={cn('fu-type-meta m-0 mb-2', mutedClass)}>Connect</p>
              <SocialIcons theme="home" size="sm" />
            </div>
          </div>
        </div>

        <p className={cn('fu-type-body-sm m-0 mt-10 text-center', mutedClass)}>
          Powered by Students · 1+ Active Events · 733+ Students
        </p>
      </FuContainer>
    </footer>
  )
}
