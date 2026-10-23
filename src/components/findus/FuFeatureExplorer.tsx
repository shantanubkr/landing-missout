import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { MissoutIcon } from '../icons'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { ProductShot } from '../../lib/productAssets'
import { cn } from '../../lib/cn'
import { fuFocusRing } from '../../lib/design/findusMotion'
import { OperationsSideRail } from './operations/OperationsSideRail'
import type { OperationsHierarchyLevel, OperationsRailRow } from './FuOperationsLayer'
import { FuProductShot } from './FuProductShot'
import { FuMeta, FuTitle } from './FuTypography'

export type FestFeatureStage = {
  /** Short label above the headline */
  label: string
  headline: string
  href: string
  shot: ProductShot
  shotAlt: string
}

export type FuFeatureExplorerProps = {
  title?: string
  rows: readonly OperationsRailRow[]
  stages: Record<OperationsHierarchyLevel, FestFeatureStage>
  defaultLevel?: OperationsHierarchyLevel
  className?: string
}

function FeatureArrowLink({ href }: { href: string }) {
  return (
    <Link
      to={href}
      className={cn(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
        'bg-[var(--fu-ink)] text-[var(--fu-canvas)] no-underline',
        'motion-safe:transition-transform motion-safe:hover:translate-x-0.5',
        fuFocusRing,
      )}
      aria-label="Open feature page"
    >
      <MissoutIcon name="arrowRight" size={16} className="text-current" />
    </Link>
  )
}

function FeatureStage({
  stages,
  active,
  reduceMotion,
}: {
  stages: Record<OperationsHierarchyLevel, FestFeatureStage>
  active: OperationsHierarchyLevel
  reduceMotion: boolean
}) {
  const levels: OperationsHierarchyLevel[] = ['institution', 'committees', 'departments']

  return (
    <div className="relative w-full overflow-hidden rounded-[var(--fu-radius-sm)] bg-[var(--fu-bs-canvas)]">
      {levels.map((level) => {
        const item = stages[level]
        const isActive = level === active

        return (
          <div
            key={level}
            className={cn(
              'w-full',
              isActive ? 'relative z-[1] opacity-100' : 'pointer-events-none absolute inset-0 z-0 opacity-0',
              !reduceMotion && 'transition-opacity duration-200 ease-out motion-reduce:transition-none',
            )}
            aria-hidden={!isActive}
          >
            <FuProductShot shot={item.shot} alt={item.shotAlt} presentation="inline" loading="lazy" />
          </div>
        )
      })}
    </div>
  )
}

/**
 * Fest capabilities — Backstage sidepanel nav + one media stage.
 * Nav uses institution → committees → departments; stage crossfades per level.
 */
export function FuFeatureExplorer({
  title = 'Everything you need to run the fest.',
  rows,
  stages,
  defaultLevel = 'departments',
  className,
}: FuFeatureExplorerProps) {
  const [active, setActive] = useState<OperationsHierarchyLevel>(defaultLevel)
  const reduceMotion = usePrefersReducedMotion()
  const groupId = useId()
  const panel = stages[active]

  return (
    <div className={className}>
      <FuTitle level="h2" className="mb-6 max-w-xl">
        {title}
      </FuTitle>

      <div
        className={cn(
          'overflow-hidden rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)]',
          'bg-[var(--fu-surface-elevated)] lg:flex',
        )}
      >
        <OperationsSideRail
          rows={rows}
          active={active}
          groupId={groupId}
          onSelect={setActive}
        />

        <div
          role="tabpanel"
          id={`${groupId}-panel-${active}`}
          aria-labelledby={`${groupId}-tab-${active}`}
          className="min-w-0 flex-1 bg-[var(--fu-bs-canvas)] p-4 sm:p-6 lg:p-8"
        >
          <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
            <div className="min-w-0">
              <FuMeta className="mb-2 normal-case tracking-normal">{panel.label}</FuMeta>
              <FuTitle level="h3" className="text-xl leading-snug sm:text-2xl">
                {panel.headline}
              </FuTitle>
            </div>
            <FeatureArrowLink href={panel.href} />
          </div>

          <FeatureStage stages={stages} active={active} reduceMotion={reduceMotion} />
        </div>
      </div>
    </div>
  )
}
