import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { BACKSTAGE_FEATURE_ROUTES } from '../../lib/backstageFeaturePages'
import { HOME_RUN_EVENT_SCREENS, type ImageAsset } from '../../lib/productAssets'
import { fuFocusRing, fuMotion } from '../../lib/design/findusMotion'
import { MissoutIcon } from '../icons'
import { FuContainer } from './FuContainer'
import { FuHomeFeatureCtaGrid } from './FuHomeFeatureCtaStrip'
import { MissoutAvatar } from '../avatars'
import { FuSection } from './FuSection'
import { FuTitle } from './FuTypography'

const overlayTitleClass =
  'fu-font-sans m-0 font-bold leading-[1.06] tracking-[-0.03em] text-black'

function CardArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white',
        fuMotion.arrowNudge,
        className,
      )}
      aria-hidden
    >
      <MissoutIcon name="arrowRight" size={16} className="text-current" />
    </span>
  )
}

type OverlayImageCardProps = {
  title: string
  image: ImageAsset
  imageAlt: string
  href?: string
  overlay?: 'top-left' | 'right'
  /** Lock card height — use with `object-cover` when source aspect ratios differ. */
  aspect?: `${number} / ${number}`
  imagePosition?: string
  /** Zoom image inside aspect box — e.g. 1.12 fills more of the gray band. */
  imageScale?: number
  className?: string
}

function OverlayImageCard({
  title,
  image,
  imageAlt,
  href = BACKSTAGE_FEATURE_ROUTES.events,
  overlay = 'top-left',
  aspect,
  imagePosition = 'object-left-top',
  imageScale,
  className,
}: OverlayImageCardProps) {
  const overlayContent =
    overlay === 'right' ? (
      <div className="pointer-events-none absolute inset-y-0 right-0 flex w-full items-end justify-start pb-4 pl-4 pr-4 sm:w-[min(44%,19rem)] sm:items-end sm:justify-end sm:pb-[clamp(1rem,3.5vw,2.25rem)] sm:pl-0 sm:pr-[clamp(1rem,3.5vw,2.25rem)]">
        <div className="flex max-w-[14rem] flex-col items-start gap-2 sm:max-w-none sm:items-end sm:gap-3">
          <h3
            className={cn(
              overlayTitleClass,
              'text-left text-[clamp(1.0625rem,2.8vw,1.625rem)] sm:text-right sm:text-[clamp(1.0625rem,1.65vw,1.625rem)]',
            )}
          >
            {title}
          </h3>
          <CardArrow />
        </div>
      </div>
    ) : (
      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col gap-2 px-4 pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3 sm:px-[clamp(1rem,3.5vw,2.25rem)] sm:pt-[clamp(1rem,3.5vw,2.25rem)]">
        <h3
          className={cn(
            overlayTitleClass,
            'min-w-0 flex-1 text-[clamp(1.0625rem,2.8vw,1.5rem)] sm:text-[clamp(1rem,1.55vw,1.5rem)]',
          )}
        >
          {title}
        </h3>
        <CardArrow className="shrink-0" />
      </div>
    )

  const cardBody = (
    <div
      className={cn('relative block w-full leading-none', aspect && 'overflow-hidden', className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <img
        src={image.src}
        alt={imageAlt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn(
          'block w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:scale-[1.012]',
          aspect ? cn('h-full object-cover', imagePosition) : 'h-auto',
        )}
        style={
          aspect && imageScale
            ? { transform: `scale(${imageScale})`, transformOrigin: 'top left' }
            : undefined
        }
      />
      {overlayContent}
    </div>
  )

  if (!href) return cardBody

  return (
    <Link
      to={href}
      className={cn('group block no-underline text-inherit', fuFocusRing, fuMotion.reduced)}
    >
      {cardBody}
    </Link>
  )
}

/** Home feature grid — screenshot cards with headline overlays. */
export function FuHomeRunEventSection({ className }: { className?: string }) {
  return (
    <FuSection tone="default" padding="lg" className={cn('max-lg:!py-12', className)}>
      <FuContainer width="wide">
        <FuTitle level="h2" className="mb-8 max-w-3xl sm:mb-10">
          Everything you need to run the event
        </FuTitle>

        <FuHomeFeatureCtaGrid className="mb-8 sm:mb-10" />

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          <OverlayImageCard
            title="Manage a whole festival or even just a workshop"
            image={HOME_RUN_EVENT_SCREENS.createEvents}
            imageAlt="Create a festival or standalone event in Backstage"
            overlay="top-left"
            aspect="1535 / 874"
          />

          <OverlayImageCard
            title="Start lining up your calendar"
            image={HOME_RUN_EVENT_SCREENS.lineUp}
            imageAlt="Event calendar lineup in Backstage"
            overlay="right"
            aspect="1535 / 874"
            imagePosition="object-left"
            className="rounded-xl"
          />

          <div className="hidden items-end justify-start overflow-visible lg:flex">
            <div className="-rotate-8 origin-bottom-left">
              <MissoutAvatar
                avatar="coordinator"
                size="hero"
                animation="listening"
                ariaLabel="Event coordinator"
              />
            </div>
          </div>

          <OverlayImageCard
            title="Enter the basics and start managing"
            image={HOME_RUN_EVENT_SCREENS.enterBasics}
            imageAlt="Enter event basics and start managing in Backstage"
            overlay="top-left"
            aspect="1535 / 874"
            imagePosition="object-left-top"
            imageScale={1.12}
            className="rounded-xl"
          />
        </div>
      </FuContainer>
    </FuSection>
  )
}
