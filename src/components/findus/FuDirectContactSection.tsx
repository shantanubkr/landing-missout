import { cn } from '../../lib/cn'
import { CONTACT_CHANNELS } from '../../lib/marketingPageContent'
import { fuFocusRing, fuMotion } from '../../lib/design/findusMotion'
import type { FuBrandHue } from '../../lib/design/findus'
import { MissoutIcon, type IconName } from '../icons'
import { FuButtonAnchor } from './FuButton'
import { FuContainer } from './FuContainer'
import { FuSection } from './FuSection'
import { FuBody, FuTitle } from './FuTypography'

type DirectContactCardProps = {
  icon: IconName
  label: string
  value: string
  href: string
  tint: FuBrandHue
  external?: boolean
}

function DirectContactCard({ icon, label, value, href, tint, external }: DirectContactCardProps) {
  const iconTintClass = {
    blue: 'text-[var(--fu-brand-blue)]',
    pink: 'text-[var(--fu-brand-pink)]',
    lime: 'text-[var(--fu-ink)]',
  } as const

  return (
    <FuButtonAnchor
      href={href}
      variant="secondary"
      size="lg"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'group !h-auto !min-h-[5.5rem] !justify-start !gap-4 !px-5 !py-4 !text-left',
        fuFocusRing,
      )}
    >
      <span
        className={cn(
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--fu-radius-sm)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-surface)]',
          iconTintClass[tint],
          fuMotion.iconPop,
          fuMotion.reduced,
        )}
        aria-hidden
      >
        <MissoutIcon name={icon} size={20} className="text-current" />
      </span>
      <span className="min-w-0">
        <span className="block fu-type-meta normal-case text-[var(--fu-ink-muted)]">{label}</span>
        <span className="mt-0.5 block fu-type-body-sm font-semibold text-[var(--fu-ink)]">{value}</span>
      </span>
    </FuButtonAnchor>
  )
}

/** Scroll target below the contact form — email and WhatsApp with icons. */
export function FuDirectContactSection({ className }: { className?: string }) {
  return (
    <FuSection id="message-direct" tone="surface" padding="md" className={className}>
      <FuContainer width="narrow">
        <div className="text-center">
          <FuTitle level="h2">Or message direct</FuTitle>
          <FuBody className="mx-auto mt-3 max-w-md">
            Same team — email or WhatsApp works if you&apos;d rather skip the form.
          </FuBody>
        </div>

        <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2 sm:gap-4">
          <DirectContactCard
            icon="envelope"
            label="Email"
            value={CONTACT_CHANNELS.email}
            href={CONTACT_CHANNELS.mailto}
            tint="blue"
          />
          <DirectContactCard
            icon="phoneRingingHigh"
            label="WhatsApp"
            value={CONTACT_CHANNELS.phone}
            href={CONTACT_CHANNELS.whatsapp}
            tint="pink"
            external
          />
        </div>
      </FuContainer>
    </FuSection>
  )
}
