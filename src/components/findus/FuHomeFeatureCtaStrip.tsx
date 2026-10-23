import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { BACKSTAGE_FEATURES_PAGE, BACKSTAGE_FEATURE_ROUTES } from '../../lib/backstageFeaturePages'
import { HOME_FEATURE_CTA_ICONS, type ImageAsset } from '../../lib/productAssets'
import { fuFocusRing, fuMotion } from '../../lib/design/findusMotion'
import { FU_ELEVATION } from '../../lib/design/findus'
import { MissoutIcon } from '../icons'
import { FuContainer } from './FuContainer'
import { FuSection } from './FuSection'

type HomeFeatureCtaItem = {
  title: string
  href: string
  icon: ImageAsset
}

const HOME_FEATURE_CTAS: readonly HomeFeatureCtaItem[] = [
  {
    title: 'Your events',
    href: BACKSTAGE_FEATURE_ROUTES.events,
    icon: HOME_FEATURE_CTA_ICONS.yourEvents,
  },
  {
    title: 'Registrations',
    href: BACKSTAGE_FEATURE_ROUTES.registrations,
    icon: HOME_FEATURE_CTA_ICONS.registrations,
  },
  {
    title: 'Updates',
    href: BACKSTAGE_FEATURE_ROUTES.updatesMedia,
    icon: HOME_FEATURE_CTA_ICONS.updates,
  },
  {
    title: 'Departments',
    href: BACKSTAGE_FEATURE_ROUTES.teamAccess,
    icon: HOME_FEATURE_CTA_ICONS.departments,
  },
  {
    title: 'LOT MORE',
    href: BACKSTAGE_FEATURES_PAGE,
    icon: HOME_FEATURE_CTA_ICONS.lotMore,
  },
]

function CardArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10',
        'bg-[var(--fu-ink)] text-[var(--fu-canvas)]',
        fuMotion.arrowNudge,
        className,
      )}
      aria-hidden
    >
      <MissoutIcon name="arrowRight" size={16} className="text-current" />
    </span>
  )
}

/**
 * Five-up quick-link row.
 * Phone: stacked list rows (icon · label · arrow).
 * Tablet: 2-column tiles. Desktop: 5-column tiles.
 */
export function FuHomeFeatureCtaGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-5',
        className,
      )}
    >
      {HOME_FEATURE_CTAS.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            'group flex rounded-[var(--fu-radius)]',
            FU_ELEVATION.card,
            FU_ELEVATION.cardHover,
            fuMotion.hoverLift,
            fuMotion.reduced,
            'border-[var(--fu-ink)] bg-[var(--fu-canvas)]',
            'no-underline text-inherit',
            'flex-row items-center gap-3 p-4',
            'md:min-h-[9.25rem] md:flex-col md:items-stretch md:justify-between md:gap-0 md:p-5',
            fuFocusRing,
          )}
        >
          <img
            src={item.icon.src}
            alt=""
            width={item.icon.width}
            height={item.icon.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-11 w-11 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover:scale-105 md:h-14 md:w-14 lg:h-16 lg:w-16"
          />
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3 md:flex-none md:items-end">
            <span className="fu-font-sans text-left text-[clamp(0.9375rem,1.4vw,1.125rem)] font-bold leading-snug tracking-[-0.02em] text-[var(--fu-ink)]">
              {item.title}
            </span>
            <CardArrow />
          </div>
        </Link>
      ))}
    </div>
  )
}

/** Standalone section wrapper for the home feature CTA row. */
export function FuHomeFeatureCtaStrip({ className }: { className?: string }) {
  return (
    <FuSection tone="default" padding="sm" className={cn('!pt-0', className)}>
      <FuContainer width="wide">
        <FuHomeFeatureCtaGrid />
      </FuContainer>
    </FuSection>
  )
}
