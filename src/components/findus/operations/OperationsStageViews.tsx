import type { ReactNode } from 'react'
import { MissoutIcon } from '../../icons'
import { cn } from '../../../lib/cn'
import type { OperationsHierarchyLevel } from '../FuOperationsLayer'

const bs = {
  canvas: 'bg-[var(--fu-bs-canvas)]',
  elevated: 'bg-[var(--fu-bs-elevated)]',
  input: 'bg-[var(--fu-bs-input)]',
  border: 'border-[var(--fu-bs-border)]',
  ink: 'text-[var(--fu-bs-ink)]',
  muted: 'text-[var(--fu-bs-muted)]',
  subtle: 'text-[var(--fu-bs-subtle)]',
  primaryBtn:
    'bg-[var(--fu-bs-primary-bg)] text-[var(--fu-bs-primary-ink)]',
  card: 'rounded-[var(--fu-radius)] border border-[var(--fu-bs-border)] bg-[var(--fu-bs-elevated)]',
  pill:
    'rounded-full border border-[var(--fu-bs-border)] bg-[var(--fu-bs-elevated)] text-[var(--fu-bs-ink)]',
  link: 'text-[var(--fu-brand-blue)]',
} as const

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <span
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-sans text-xs font-semibold',
        'bg-[var(--fu-bs-avatar-bg)] text-[var(--fu-bs-avatar-ink)]',
      )}
    >
      {initials}
    </span>
  )
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <div className={cn('flex items-center justify-between px-4 py-3', bs.card)}>
      <div>
        <p className={cn('m-0 font-sans text-xs', bs.muted)}>{label}</p>
        <p className={cn('m-0 mt-1 font-sans text-2xl font-semibold', bs.ink)}>{value}</p>
        <p className={cn('m-0 mt-0.5 font-sans text-[11px]', bs.subtle)}>{detail}</p>
      </div>
      <MissoutIcon name="chevronRight" size={14} className={bs.subtle} />
    </div>
  )
}

function StageShell({ children }: { children: ReactNode }) {
  return (
    <div className={cn('fu-bs-ui min-h-[18rem] p-4 sm:p-5', bs.canvas)}>{children}</div>
  )
}

export function OperationsInstitutionView() {
  return (
    <StageShell>
      <h3 className={cn('m-0 font-sans text-lg font-semibold', bs.ink)}>Cedar School of Arts</h3>

      <p className={cn('mb-3 mt-5 font-sans text-sm font-semibold', bs.ink)}>At a glance</p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <StatCard label="Team" value="13" detail="2 admins · 11 ops" />
        <StatCard label="Committees" value="2" detail="2 live" />
        <StatCard label="Events" value="14" detail="9 live · 5 draft" />
        <StatCard label="Updates" value="0" detail="No drafts" />
      </div>

      <div className="mb-2 mt-6 flex items-center justify-between gap-2">
        <p className={cn('m-0 font-sans text-sm font-semibold', bs.ink)}>Coming up</p>
        <span className={cn('font-sans text-xs font-medium', bs.link)}>View calendar</span>
      </div>
      <p className={cn('m-0 mb-3 font-sans text-[11px]', bs.subtle)}>Next 4 upcoming events</p>
      <ul className="m-0 list-none space-y-2 p-0">
        {[
          {
            title: 'Cedar Stage Live 2026',
            type: 'Festival',
            when: '24 Sep 2026 · Cedar Main Auditorium',
          },
          {
            title: 'Monologue Slam',
            type: 'Competition',
            when: '24 Sep 2026 · Studio A',
          },
          {
            title: 'Cedar Performing Arts Fest 2026',
            type: 'Festival',
            when: '25 Sep 2026 · Main Auditorium',
          },
        ].map((event) => (
          <li
            key={event.title}
            className={cn('flex items-start gap-3 px-3 py-2.5 [list-style:none]', bs.card)}
          >
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--fu-radius-sm)] bg-[var(--fu-tint-pink-soft)]">
              <MissoutIcon name="star" size={14} className="text-[var(--fu-brand-pink)]" />
            </span>
            <span className="min-w-0">
              <span className={cn('block font-sans text-sm font-semibold', bs.ink)}>{event.title}</span>
              <span className={cn('block font-sans text-[11px]', bs.subtle)}>
                {event.type} · {event.when}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mb-2 mt-6 flex items-center justify-between gap-2">
        <p className={cn('m-0 font-sans text-sm font-semibold', bs.ink)}>Active committees</p>
        <span className={cn('font-sans text-xs font-medium', bs.link)}>View all</span>
      </div>
      <p className={cn('m-0 mb-3 font-sans text-[11px]', bs.subtle)}>2 committees in your institution</p>
      <ul className="m-0 list-none space-y-2 p-0">
        {[
          {
            name: 'Cedar Film Society',
            meta: '3 members · 2 events · last activity 5 Sep',
          },
          {
            name: 'Cedar Performing Arts',
            meta: '5 members · 5 departments · 12 events · last activity 10 Sep',
          },
        ].map((committee) => (
          <li
            key={committee.name}
            className={cn('flex items-start gap-3 px-3 py-2.5 [list-style:none]', bs.card)}
          >
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--fu-radius-sm)] bg-[var(--fu-tint-blue-soft)]">
              <MissoutIcon name="users" size={14} className="text-[var(--fu-brand-blue)]" />
            </span>
            <span className="min-w-0">
              <span className={cn('block font-sans text-sm font-semibold', bs.ink)}>{committee.name}</span>
              <span className={cn('block font-sans text-[11px]', bs.subtle)}>{committee.meta}</span>
            </span>
          </li>
        ))}
      </ul>
    </StageShell>
  )
}

const COMMITTEE_DEPARTMENTS = [
  {
    name: 'Manager',
    needsHead: true,
    lead: 'No head assigned',
    tags: ['Overview', 'Registrations', 'Event media', 'Sponsors'],
    members: '0 members',
  },
  {
    name: 'PR',
    needsHead: true,
    lead: 'No head assigned',
    tags: ['Overview', 'Updates'],
    members: '1 member',
  },
  {
    name: 'Roster',
    needsHead: true,
    lead: 'No head assigned',
    tags: ['Overview'],
    members: '1 member',
  },
  {
    name: 'Events',
    needsHead: false,
    lead: 'Led by Rohit Sharma, Priya Nair',
    tags: ['Overview', 'Registrations', 'Schedule', 'Updates'],
    members: '4 members',
  },
  {
    name: 'Media',
    needsHead: false,
    lead: 'Led by Vikram Menon',
    tags: ['Overview', 'Event media'],
    members: '1 member',
  },
] as const

export function OperationsCommitteesView() {
  return (
    <StageShell>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className={cn('m-0 font-sans text-xl font-semibold', bs.ink)}>Departments</h3>
          <p className={cn('m-0 mt-1 font-sans text-sm', bs.muted)}>
            Create teams, assign capabilities, and see what needs a head.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className={cn('inline-flex px-3 py-1.5 font-sans text-xs font-medium', bs.pill)}>
            Cedar Performing Arts
          </span>
          <span
            className={cn(
              'inline-flex rounded-full px-3 py-1.5 font-sans text-xs font-semibold',
              bs.primaryBtn,
            )}
          >
            + Add department
          </span>
        </div>
      </div>

      <p className={cn('mb-1 mt-6 font-sans text-sm font-semibold', bs.ink)}>Needs attention</p>
      <p className={cn('m-0 mb-3 font-sans text-[11px]', bs.subtle)}>3 departments without a head</p>

      <ul className="m-0 list-none space-y-2 p-0">
        {COMMITTEE_DEPARTMENTS.map((dept) => (
          <li key={dept.name} className={cn('px-4 py-3 [list-style:none]', bs.card)}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn('font-sans text-sm font-semibold', bs.ink)}>{dept.name}</span>
                  {dept.needsHead ? (
                    <span
                      className={cn(
                        'rounded-[var(--fu-radius-sm)] px-2 py-0.5 font-sans text-[10px] font-medium',
                        bs.input,
                        bs.muted,
                      )}
                    >
                      Needs head
                    </span>
                  ) : null}
                </div>
                <p className={cn('m-0 mt-1 font-sans text-xs', bs.muted)}>{dept.lead}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {dept.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        'rounded-full border px-2 py-0.5 font-sans text-[10px]',
                        bs.border,
                        bs.muted,
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className={cn('shrink-0 font-sans text-xs font-medium', bs.ink)}>
                {dept.members} ›
              </span>
            </div>
          </li>
        ))}
      </ul>
    </StageShell>
  )
}

const DEPARTMENT_MEMBERS = [
  {
    name: 'Rohit Sharma',
    email: 'rohit.sharma@cedararts.edu.in',
    role: 'Head',
  },
  {
    name: 'Priya Nair',
    email: 'priya.nair@cedararts.edu.in',
    role: 'Member',
  },
  {
    name: 'Arjun Desai',
    email: 'arjun.desai@cedararts.edu.in',
    role: 'Member',
  },
  {
    name: 'Meera Krishnan',
    email: 'meera.krishnan@cedararts.edu.in',
    role: 'Member',
  },
] as const

export function OperationsDepartmentMembersView() {
  return (
    <StageShell>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className={cn('m-0 font-sans text-[11px] font-medium', bs.subtle)}>Departments</p>
          <div className="mt-1 flex items-center gap-1">
            <h3 className={cn('m-0 font-sans text-xl font-semibold', bs.ink)}>Events</h3>
            <MissoutIcon name="chevronDown" size={16} className={bs.subtle} />
          </div>
          <p className={cn('m-0 mt-1 font-sans text-sm', bs.muted)}>
            Department overview and roster management.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className={cn('inline-flex px-3 py-1.5 font-sans text-xs font-medium', bs.pill)}>
            Cedar Performing Arts
          </span>
          <span className={cn('inline-flex px-3 py-1.5 font-sans text-xs font-medium', bs.pill)}>
            Edit department
          </span>
        </div>
      </div>

      <div className={cn('mt-5 flex gap-4 border-b', bs.border)}>
        <span className={cn('border-b-2 border-transparent pb-2 font-sans text-sm', bs.subtle)}>
          Overview
        </span>
        <span
          className={cn(
            'border-b-2 border-[var(--fu-bs-ink)] pb-2 font-sans text-sm font-semibold',
            bs.ink,
          )}
        >
          Members
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div
          className={cn(
            'flex min-h-10 flex-1 items-center gap-2 rounded-[var(--fu-radius)] border px-3',
            bs.border,
            bs.input,
          )}
        >
          <MissoutIcon name="search" size={16} className={bs.subtle} />
          <span className={cn('font-sans text-sm', bs.subtle)}>Search by name or email</span>
        </div>
        <span
          className={cn(
            'inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2 font-sans text-xs font-semibold',
            bs.primaryBtn,
          )}
        >
          + Add member
        </span>
      </div>

      <ul className="m-0 mt-3 list-none space-y-2 p-0">
        {DEPARTMENT_MEMBERS.map((member, index) => (
          <li key={member.email} className={cn('px-3 py-2.5 [list-style:none]', bs.card)}>
            <div className="flex flex-wrap items-center gap-3">
              <Avatar name={member.name} />
              <div className="min-w-0 flex-1">
                <p className={cn('m-0 font-sans text-sm font-semibold', bs.ink)}>{member.name}</p>
                <p className={cn('m-0 truncate font-sans text-xs', bs.subtle)}>{member.email}</p>
              </div>
              <span
                className={cn(
                  'rounded-full px-2.5 py-1 font-sans text-[10px] font-medium',
                  bs.input,
                  bs.muted,
                )}
              >
                Active
              </span>
              <div className="relative">
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-sans text-xs font-medium',
                    bs.elevated,
                    bs.ink,
                    index === 0
                      ? 'border-[var(--fu-brand-pink)] ring-2 ring-[var(--fu-brand-pink)]/20'
                      : bs.border,
                  )}
                >
                  {member.role}
                  <MissoutIcon name="chevronDown" size={12} className={bs.subtle} />
                </span>
                {index === 0 ? (
                  <div
                    className={cn(
                      'absolute right-0 top-full z-10 mt-1 min-w-[7rem] rounded-[var(--fu-radius-sm)] border py-1 shadow-[var(--fu-shadow-media)]',
                      bs.border,
                      bs.elevated,
                    )}
                  >
                    <span className={cn('block px-3 py-1.5 font-sans text-xs', bs.muted)}>Member</span>
                    <span
                      className={cn(
                        'block px-3 py-1.5 font-sans text-xs font-semibold',
                        bs.ink,
                        'bg-[var(--fu-tint-pink-soft)]',
                      )}
                    >
                      Head
                    </span>
                  </div>
                ) : null}
              </div>
              <MissoutIcon name="ellipsesVertical" size={16} className={bs.subtle} />
            </div>
          </li>
        ))}
      </ul>
    </StageShell>
  )
}

export function OperationsStageContent({ level }: { level: OperationsHierarchyLevel }) {
  switch (level) {
    case 'institution':
      return <OperationsInstitutionView />
    case 'committees':
      return <OperationsCommitteesView />
    case 'departments':
      return <OperationsDepartmentMembersView />
  }
}
