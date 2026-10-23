import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { FuBrandHue } from '../../lib/design/findus'
import { FuContainer } from './FuContainer'
import { FuBody, FuEyebrow, FuTitle } from './FuTypography'
import { FuTag } from './FuTag'

export type FuFeatureHeroProps = {
  /** Short name in eyebrow, e.g. “Events”. */
  featureLabel: string
  /** Page H1 — can differ from featureLabel. */
  title: string
  subtitle?: string
  mess?: string
  changes?: string
  audience?: string[]
  /** Optional launch note (e.g. confirm depth before shipping). */
  flag?: string
  cta?: ReactNode
  accent?: FuBrandHue
  className?: string
}

/**
 * Feature page hero — white canvas, small blue eyebrow, surface mess/changes panels.
 */
export function FuFeatureHero({
  featureLabel,
  title,
  subtitle,
  mess,
  changes,
  audience,
  flag,
  cta,
  accent = 'blue',
  className,
}: FuFeatureHeroProps) {
  const panelClass =
    'rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-surface)] p-4'

  return (
    <section className={cn('border-b border-[var(--fu-hairline)] bg-[var(--fu-canvas)] py-12 sm:py-16', className)}>
      <FuContainer width="narrow">
        <FuEyebrow tone="blue" className="mb-3">
          Backstage · {featureLabel}
        </FuEyebrow>
        <FuTitle level="title" className="mb-4">
          {title}
        </FuTitle>
        {subtitle ? <FuBody className="mb-6 max-w-2xl">{subtitle}</FuBody> : null}
        {flag ? (
          <FuTag tone="neutral" className="mb-6">
            {flag}
          </FuTag>
        ) : null}
        {(mess || changes) && (
          <div
            className={cn(
              'mb-6 grid gap-4',
              mess && changes ? 'sm:grid-cols-2' : 'max-w-2xl',
            )}
          >
            {mess ? (
              <div className={panelClass}>
                <p className="fu-type-meta m-0 mb-2 text-[var(--fu-ink-subtle)]">The mess</p>
                <FuBody size="sm">{mess}</FuBody>
              </div>
            ) : null}
            {changes ? (
              <div className={panelClass}>
                <p className="fu-type-meta m-0 mb-2 text-[var(--fu-ink-subtle)]">What changes</p>
                <FuBody size="sm">{changes}</FuBody>
              </div>
            ) : null}
          </div>
        )}
        {audience?.length ? (
          <div className="mb-6 flex flex-wrap gap-2">
            {audience.map((item, i) => (
              <FuTag key={item} tone={i === 0 && accent === 'pink' ? 'pink' : 'neutral'}>
                {item}
              </FuTag>
            ))}
          </div>
        ) : null}
        {cta}
      </FuContainer>
    </section>
  )
}
