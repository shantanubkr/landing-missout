import { useId, useState } from 'react'
import type { IconName } from '../icons'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'
import { OperationsSideRail } from './operations/OperationsSideRail'
import { OperationsStageContent } from './operations/OperationsStageViews'
import { FuBody, FuMeta, FuTitle } from './FuTypography'

export type OperationsHierarchyLevel = 'institution' | 'committees' | 'departments'

export type OperationsRailRow = {
  id: OperationsHierarchyLevel
  label: string
  name: string
  meta: string
  icon: IconName
  indent: 0 | 1 | 2
  showChevron?: boolean
}

export type FuOperationsLayerProps = {
  title?: string
  subtitle?: string
  caption?: string
  rows: readonly OperationsRailRow[]
  defaultLevel?: OperationsHierarchyLevel
  className?: string
}

function OperationsStagePanel({
  active,
  reduceMotion,
}: {
  active: OperationsHierarchyLevel
  reduceMotion: boolean
}) {
  const levels: OperationsHierarchyLevel[] = ['institution', 'committees', 'departments']

  return (
    <div className="relative w-full">
      {levels.map((level) => {
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
            <OperationsStageContent level={level} />
          </div>
        )
      })}
    </div>
  )
}

/** Interactive org hierarchy rail + live Backstage UI stage. */
export function FuOperationsLayer({
  title = 'Backstage is the operations layer.',
  subtitle = 'One stack for the whole fest.',
  caption = 'Roles stay scoped, with no shared admin passwords.',
  rows,
  defaultLevel = 'departments',
  className,
}: FuOperationsLayerProps) {
  const [active, setActive] = useState<OperationsHierarchyLevel>(defaultLevel)

  const selectLevel = (level: 'institution' | 'departments') => {
    setActive(level)
  }
  const reduceMotion = usePrefersReducedMotion()
  const groupId = useId()

  return (
    <div className={className}>
      <FuTitle level="h2" className="mb-3 max-w-xl">
        {title}
      </FuTitle>
      {subtitle ? <FuBody className="mb-8 max-w-lg">{subtitle}</FuBody> : null}

      <div
        className={cn(
          'rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)]',
          'bg-[var(--fu-surface-elevated)] lg:flex',
        )}
      >
        <OperationsSideRail
          rows={rows}
          active={active}
          groupId={groupId}
          onSelect={selectLevel}
        />

        <div
          role="tabpanel"
          id={`${groupId}-panel-${active}`}
          aria-labelledby={`${groupId}-tab-${active}`}
          className="min-w-0 flex-1 bg-[var(--fu-bs-canvas)]"
        >
          <OperationsStagePanel active={active} reduceMotion={reduceMotion} />
        </div>
      </div>

      {caption ? (
        <FuMeta className="mt-4 normal-case tracking-normal text-[var(--fu-ink-muted)]">
          {caption}
        </FuMeta>
      ) : null}
    </div>
  )
}
