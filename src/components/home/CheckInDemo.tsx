import { useCallback, useState } from 'react'
import { cn } from '../../lib/cn'
import { ProductDemoFrame } from './ProductDemoFrame'

type RowTone = 'ok' | 'wait' | 'walk'

type Row = {
  id: string
  name: string
  detail: string
  status: string
  tone: RowTone
  checked: boolean
}

const INITIAL: Row[] = [
  {
    id: '1',
    name: 'Aanya M.',
    detail: 'Individual · Ticket A-204',
    status: 'Checked in',
    tone: 'ok',
    checked: true,
  },
  {
    id: '2',
    name: 'Rohan K.',
    detail: 'Individual · Ticket A-218',
    status: 'Waiting',
    tone: 'wait',
    checked: false,
  },
  {
    id: '3',
    name: 'Team Pixel',
    detail: 'Team · 4 members',
    status: 'Checked in',
    tone: 'ok',
    checked: true,
  },
  {
    id: '4',
    name: 'Priya S.',
    detail: 'Walk-in · Door A',
    status: 'Walk-in',
    tone: 'walk',
    checked: false,
  },
]

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5 10 17.5 19 7.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function QrMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="8" y="8" width="8" height="8" fill="currentColor" />
      <rect x="28" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="32" y="8" width="8" height="8" fill="currentColor" />
      <rect x="4" y="28" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="8" y="32" width="8" height="8" fill="currentColor" />
      <rect x="28" y="28" width="6" height="6" fill="currentColor" />
      <rect x="36" y="28" width="8" height="4" fill="currentColor" />
      <rect x="28" y="38" width="4" height="6" fill="currentColor" />
      <rect x="36" y="36" width="8" height="8" fill="currentColor" />
    </svg>
  )
}

/** Door check-in: roster window + compact QR window side by side. */
export function CheckInDemo({ className }: { className?: string }) {
  const [rows, setRows] = useState(INITIAL)
  const [flashId, setFlashId] = useState<string | null>(null)

  const liveCount = rows.filter((r) => r.checked).length

  const checkIn = useCallback((id: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, checked: true, tone: 'ok' as const, status: 'Checked in' }
          : r,
      ),
    )
    setFlashId(id)
    window.setTimeout(() => setFlashId(null), 900)
  }, [])

  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3', className)}>
      {/* Manual roster window */}
      <ProductDemoFrame title="Backstage · Roster" className="min-w-0 flex-1">
        <div className="bg-[#FAFAFA] p-4 sm:p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-sans text-sm font-semibold text-[#1A1A1A]">Door A</p>
              <p className="font-sans text-xs text-[#5A5A5A]">Open mic night</p>
            </div>
            <div className="text-right">
              <p className="font-sans text-2xl font-bold tabular-nums text-[#F92C99]">
                {liveCount}
              </p>
              <p className="font-sans text-[10px] font-medium text-[#9A9A9A]">Checked in</p>
            </div>
          </div>

          <ul className="space-y-2">
            {rows.map((row) => {
              const active = flashId === row.id
              return (
                <li key={row.id}>
                  <div
                    className={cn(
                      'flex items-center gap-2.5 rounded-xl border bg-white px-2.5 py-2',
                      'transition-[border-color,background-color] duration-300',
                      active
                        ? 'border-[#F92C99]/50 bg-[#F92C99]/[0.06]'
                        : 'border-[#E8E8E8]',
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-sans text-sm font-semibold text-[#1A1A1A]">
                        {row.name}
                      </p>
                      <p className="truncate font-sans text-[10px] text-[#9A9A9A]">
                        {row.detail}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'shrink-0 font-sans text-[10px] font-semibold',
                        row.tone === 'ok' && 'text-emerald-600',
                        row.tone === 'wait' && 'text-[#9A9A9A]',
                        row.tone === 'walk' && 'text-[#006AFE]',
                      )}
                    >
                      {row.status}
                    </span>
                    <button
                      type="button"
                      aria-label={
                        row.checked
                          ? `${row.name} already checked in`
                          : `Manually check in ${row.name}`
                      }
                      disabled={row.checked}
                      onClick={() => checkIn(row.id)}
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
                        'transition-[background-color,border-color,color,transform]',
                        'active:scale-[0.96] motion-reduce:active:scale-100',
                        row.checked
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                          : 'border-[#F92C99]/40 bg-[#F92C99]/10 text-[#F92C99] hover:bg-[#F92C99]/15',
                        'disabled:cursor-default',
                      )}
                    >
                      <CheckIcon />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </ProductDemoFrame>

      {/* Compact QR scan window */}
      <ProductDemoFrame
        title="Scan QR"
        className="w-full shrink-0 sm:w-[11.5rem] md:w-[13rem]"
      >
        <div className="flex aspect-square flex-col items-center justify-center gap-3 bg-[#111] p-4 sm:aspect-auto sm:min-h-full sm:py-6">
          <div className="relative flex h-[7.5rem] w-[7.5rem] items-center justify-center rounded-2xl border-2 border-white/25 md:h-36 md:w-36">
            <span className="absolute left-1.5 top-1.5 h-3 w-3 border-l-2 border-t-2 border-[#F92C99]" />
            <span className="absolute right-1.5 top-1.5 h-3 w-3 border-r-2 border-t-2 border-[#F92C99]" />
            <span className="absolute bottom-1.5 left-1.5 h-3 w-3 border-b-2 border-l-2 border-[#F92C99]" />
            <span className="absolute bottom-1.5 right-1.5 h-3 w-3 border-b-2 border-r-2 border-[#F92C99]" />
            <QrMark className="h-14 w-14 text-white/85 md:h-16 md:w-16" />
          </div>
          <p className="font-sans text-[11px] font-medium text-white/55">Align ticket QR</p>
        </div>
      </ProductDemoFrame>
    </div>
  )
}
