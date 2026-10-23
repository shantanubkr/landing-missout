import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { EVENT_CREATE_FIXTURE } from '../../../lib/productMockupFixtures'
import { MissoutIcon } from '../../icons'

function MockupToggle({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors',
        on ? 'bg-[var(--fu-bs-primary-bg)]' : 'bg-[var(--fu-bs-border)]',
      )}
      aria-hidden
    >
      <span
        className={cn(
          'absolute top-0.5 h-4 w-4 rounded-full bg-[var(--fu-bs-canvas)] shadow-sm transition-[left]',
          on ? 'left-[18px]' : 'left-0.5',
        )}
      />
    </span>
  )
}

function MockupField({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1.5 block text-[11px] font-medium text-[var(--fu-bs-muted)]">{label}</span>
      {children}
    </label>
  )
}

function MockupInput({ value, className }: { value: string; className?: string }) {
  return (
    <div
      className={cn(
        'min-h-9 rounded-[var(--fu-radius-sm)] border border-[var(--fu-bs-border)] bg-[var(--fu-bs-input)] px-3 py-2 text-[12px] text-[var(--fu-bs-ink)]',
        className,
      )}
    >
      {value}
    </div>
  )
}

/** Coded Backstage create-event modal — fixture data from home events screenshot. */
export function EventCreateMockup({ className }: { className?: string }) {
  const f = EVENT_CREATE_FIXTURE

  return (
    <div aria-hidden className={cn('fu-bs-ui w-full', className)}>
      <div className="w-full bg-[var(--fu-bs-canvas)] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
        <div className="flex items-start justify-between gap-3 border-b border-[var(--fu-bs-border)] pb-4">
          <h3 className="m-0 text-[15px] font-semibold tracking-[-0.02em] text-[var(--fu-bs-ink)] sm:text-base">
            {f.title}
          </h3>
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--fu-radius-sm)] border border-[var(--fu-bs-border)] bg-[var(--fu-bs-elevated)] text-[var(--fu-bs-muted)]">
            <MissoutIcon name="times" size={12} />
          </span>
        </div>

        <div className="grid gap-4 pt-5 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-5">
          <div className="space-y-3">
            <div className="relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden rounded-[var(--fu-radius)] border border-dashed border-[var(--fu-bs-border)] bg-[var(--fu-bs-well-org-bg)] p-3">
              <p className="relative m-0 text-[13px] font-semibold leading-tight text-[var(--fu-bs-ink)]">
                {f.posterTitle}
              </p>
              <p className="relative mt-1 text-[10px] leading-snug text-[var(--fu-bs-muted)]">
                {f.posterSubtitle}
              </p>
              <span className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-[var(--fu-radius-xs)] border border-[var(--fu-bs-border)] bg-[var(--fu-bs-canvas)] text-[var(--fu-bs-muted)]">
                <MissoutIcon name="times" size={10} />
              </span>
            </div>

            <MockupField label="Department">
              <div className="flex min-h-9 items-center justify-between rounded-[var(--fu-radius-sm)] border border-[var(--fu-bs-border)] bg-[var(--fu-bs-input)] px-3 text-[12px] text-[var(--fu-bs-ink)]">
                <span className="inline-flex items-center gap-2">
                  <MissoutIcon name="user" size={12} className="text-[var(--fu-bs-muted)]" />
                  {f.department}
                </span>
                <MissoutIcon name="chevronDown" size={12} className="text-[var(--fu-bs-muted)]" />
              </div>
            </MockupField>

            <div className="space-y-2 rounded-[var(--fu-radius-sm)] border border-[var(--fu-bs-border)] bg-[var(--fu-bs-input)] p-2.5">
              <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--fu-bs-ink)]">
                <span className="inline-flex items-center gap-2">
                  <MissoutIcon name="userCheck" size={12} className="text-[var(--fu-bs-muted)]" />
                  Require approval
                </span>
                <MockupToggle on={f.requireApproval} />
              </div>
              <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--fu-bs-ink)]">
                <span className="inline-flex items-center gap-2">
                  <MissoutIcon name="eyeCross" size={12} className="text-[var(--fu-bs-muted)]" />
                  Private event
                </span>
                <MockupToggle on={f.privateEvent} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <MockupField label="Category">
              <MockupInput value={f.category} />
            </MockupField>

            <div className="rounded-[var(--fu-radius-sm)] border border-[var(--fu-bs-border)] bg-[var(--fu-bs-input)] p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-[var(--fu-bs-muted)]">Date and time</span>
                <span className="inline-flex items-center gap-2 text-[10px] text-[var(--fu-bs-ink)]">
                  To be decided
                  <MockupToggle on={f.datesTbd} />
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="mb-1 block text-[10px] text-[var(--fu-bs-subtle)]">Start</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <MockupInput value={f.startDate} className="px-2 text-[10px]" />
                    <MockupInput value={f.startTime} className="px-2 text-[10px]" />
                  </div>
                </div>
                <div>
                  <span className="mb-1 block text-[10px] text-[var(--fu-bs-subtle)]">End</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <MockupInput value={f.endDate} className="px-2 text-[10px]" />
                    <MockupInput value={f.endTime} className="px-2 text-[10px]" />
                  </div>
                </div>
              </div>
              <p className="mt-2 text-[10px] text-[var(--fu-bs-subtle)]">{f.timezone}</p>
            </div>

            <MockupField label="Location">
              <div className="space-y-1.5">
                <MockupInput value={f.location} />
                <MockupInput value={f.mapsUrl} className="text-[11px] text-[var(--fu-bs-muted)]" />
              </div>
            </MockupField>

            <MockupField label="Description">
              <div className="min-h-[4.5rem] rounded-[var(--fu-radius-sm)] border border-[var(--fu-bs-border)] bg-[var(--fu-bs-input)] px-3 py-2 text-[12px] leading-relaxed text-[var(--fu-bs-ink)]">
                {f.description}
              </div>
            </MockupField>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2 border-t border-[var(--fu-bs-border)] pt-4">
          <span className="inline-flex min-h-9 items-center rounded-[var(--fu-radius-sm)] border border-[var(--fu-bs-well-danger-border)] bg-[var(--fu-bs-well-danger-bg)] px-4 text-[12px] font-medium text-[var(--fu-bs-well-danger-fg)]">
            Cancel
          </span>
          <span className="inline-flex min-h-9 items-center rounded-[var(--fu-radius-sm)] bg-[var(--fu-bs-primary-bg)] px-4 text-[12px] font-medium text-[var(--fu-bs-primary-ink)]">
            Save draft
          </span>
        </div>
      </div>
    </div>
  )
}
