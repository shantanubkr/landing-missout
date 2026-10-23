import type { IconName } from '../../icons'
import { MissoutIcon } from '../../icons'
import { cn } from '../../../lib/cn'
import { fuFocusRing } from '../../../lib/design/findusMotion'
import type { OperationsHierarchyLevel, OperationsRailRow } from '../FuOperationsLayer'

const CLICKABLE_LEVELS = ['institution', 'departments'] as const satisfies readonly OperationsHierarchyLevel[]

type ClickableLevel = (typeof CLICKABLE_LEVELS)[number]

type OperationsSideRailProps = {
  rows: readonly OperationsRailRow[]
  active: OperationsHierarchyLevel
  groupId: string
  onSelect: (level: ClickableLevel) => void
  className?: string
}

function activePillClass(active: boolean) {
  return cn(
    active &&
      cn(
        'bg-[var(--fu-bs-rail-active)] font-semibold text-[var(--fu-bs-ink)]',
        'shadow-[var(--fu-shadow-soft)]',
        'dark:shadow-none dark:ring-1 dark:ring-[var(--fu-bs-border)]',
      ),
    !active &&
      'font-medium text-[var(--fu-bs-muted)] hover:bg-[var(--fu-bs-rail-hover)] hover:text-[var(--fu-bs-ink)]',
  )
}

function SideNavItem({
  id,
  groupId,
  icon,
  label,
  active,
  onClick,
}: {
  id: ClickableLevel
  groupId: string
  icon: IconName
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="tab"
      id={`${groupId}-tab-${id}`}
      aria-selected={active}
      aria-controls={`${groupId}-panel-${id}`}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-[var(--fu-radius)] px-3 py-2 text-left font-sans text-[0.9375rem] leading-none transition-[background-color,color,box-shadow] duration-150',
        activePillClass(active),
        fuFocusRing,
      )}
    >
      <MissoutIcon
        name={icon}
        size={18}
        className={cn(active ? 'text-[var(--fu-bs-ink)]' : 'text-[var(--fu-bs-muted)]')}
      />
      <span className="min-w-0 truncate">{label}</span>
    </button>
  )
}

function SideNavDisabled({
  icon,
  label,
  nested = false,
  trailing,
  sectionHeader = false,
}: {
  icon?: IconName
  label: string
  nested?: boolean
  trailing?: IconName
  sectionHeader?: boolean
}) {
  return (
    <div
      aria-disabled="true"
      className={cn(
        'flex items-center gap-2.5 font-sans text-[var(--fu-bs-subtle)] opacity-50',
        sectionHeader &&
          'px-2 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em]',
        !sectionHeader &&
          !nested &&
          'rounded-[var(--fu-radius)] px-3 py-2 text-[0.9375rem] font-medium leading-none',
        nested && 'py-1.5 pl-3 pr-2 text-[0.8125rem] font-medium leading-snug',
      )}
    >
      {icon ? <MissoutIcon name={icon} size={nested ? 16 : 18} className="shrink-0" /> : null}
      <span className={cn('min-w-0 truncate', trailing && 'flex-1')}>{label}</span>
      {trailing ? (
        <MissoutIcon name={trailing} size={14} className="ml-auto shrink-0 opacity-70" />
      ) : null}
    </div>
  )
}

/** Backstage-style sidebar rail for the operations hierarchy demo. */
export function OperationsSideRail({
  rows,
  active,
  groupId,
  onSelect,
  className,
}: OperationsSideRailProps) {
  const committees = rows.find((row) => row.id === 'committees')

  return (
    <div
      role="tablist"
      aria-label="Fest hierarchy"
      className={cn(
        'fu-bs-ui flex flex-col border-b border-[var(--fu-hairline)] bg-[var(--fu-bs-rail-bg)] lg:w-[280px] lg:shrink-0 lg:border-b-0 lg:border-r lg:border-[var(--fu-bs-border)]',
        className,
      )}
    >
      <div className="flex w-full lg:hidden">
        {CLICKABLE_LEVELS.map((level) => {
          const isActive = level === active
          const label = level === 'institution' ? 'Home' : 'Departments'
          return (
            <button
              key={level}
              type="button"
              role="tab"
              id={`${groupId}-tab-${level}`}
              aria-selected={isActive}
              aria-controls={`${groupId}-panel-${level}`}
              onClick={() => onSelect(level)}
              className={cn(
                'flex-1 px-2 py-2.5 font-sans text-sm font-semibold transition-[border-color,color] duration-150',
                isActive
                  ? 'border-b-2 border-[var(--fu-bs-ink)] text-[var(--fu-bs-ink)]'
                  : 'border-b-2 border-transparent text-[var(--fu-bs-muted)]',
                fuFocusRing,
              )}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div className="hidden flex-col px-2 py-3 lg:flex">
        <SideNavItem
          id="institution"
          groupId={groupId}
          icon="home"
          label="Home"
          active={active === 'institution'}
          onClick={() => onSelect('institution')}
        />

        <div className="mt-1">
          <SideNavDisabled icon="calender" label="Events" trailing="chevronDown" />

          <div className="ml-4 border-l border-[var(--fu-bs-border)] pl-2">
            <SideNavDisabled label="Cedar Stage Live 2026" nested />
            {committees ? <SideNavDisabled label={committees.name} nested /> : null}
            <SideNavDisabled label="View calendar" nested />
          </div>
        </div>

        <div className="mt-0.5 space-y-0.5">
          <SideNavDisabled icon="clipboard" label="Recruitment" />
          <SideNavDisabled icon="analytics" label="Analytics" />
        </div>

        <div className="mt-0.5">
          <SideNavItem
            id="departments"
            groupId={groupId}
            icon="bank"
            label="Departments"
            active={active === 'departments'}
            onClick={() => onSelect('departments')}
          />
        </div>

        <div className="mt-4 px-1">
          <SideNavDisabled label="Manage" trailing="chevronDown" sectionHeader />
          <div className="mt-1 space-y-0.5">
            <SideNavDisabled icon="bullhorn" label="Updates" />
            <SideNavDisabled icon="cog" label="Settings" />
          </div>
        </div>
      </div>
    </div>
  )
}
