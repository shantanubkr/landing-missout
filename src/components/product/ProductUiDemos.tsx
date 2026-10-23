import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ProductDemoFrame } from '../home/ProductDemoFrame'
import { STAGE_TEASER_IMAGES } from '../../lib/stageTeaserImages'

/** Registration flow demo for Stage product chapters. */
export function RegisterDemo({ className }: { className?: string }) {
  const reduceMotion = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const steps = ['Details', 'Team', 'Confirm'] as const

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % steps.length), 2400)
    return () => window.clearInterval(id)
  }, [reduceMotion, steps.length])

  return (
    <ProductDemoFrame title="Stage · Register" tone="product" className={className}>
      <div className="bg-[#FAFAFA] p-4 sm:p-5">
        <div className="overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white">
          <div className="relative h-28 overflow-hidden sm:h-32">
            <img
              src={STAGE_TEASER_IMAGES[0]}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-3 left-3 font-sans text-sm font-semibold text-white">
              Open mic night
            </p>
          </div>

          <div className="flex gap-1 border-b border-[#E8E8E8] px-3 pt-3">
            {steps.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(i)}
                className={cn(
                  'flex-1 rounded-t-lg px-2 py-2 font-sans text-xs font-semibold transition-colors',
                  i === step ? 'bg-[#E8F1FF] text-[#006AFE]' : 'text-[#9A9A9A]',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="min-h-[7.5rem] p-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 ? (
                  <div className="space-y-2.5">
                    <div className="h-9 rounded-lg border border-[#E8E8E8] bg-[#FAFAFA] px-3 font-sans text-xs leading-9 text-[#9A9A9A]">
                      Full name
                    </div>
                    <div className="h-9 rounded-lg border border-[#E8E8E8] bg-[#FAFAFA] px-3 font-sans text-xs leading-9 text-[#9A9A9A]">
                      Email
                    </div>
                  </div>
                ) : null}
                {step === 1 ? (
                  <div className="space-y-2">
                    {['You (lead)', 'Add teammate', 'Add teammate'].map((row, i) => (
                      <div
                        key={row + i}
                        className="flex items-center justify-between rounded-lg border border-[#E8E8E8] px-3 py-2"
                      >
                        <span className="font-sans text-xs font-medium text-[#1A1A1A]">
                          {row}
                        </span>
                        <span className="font-sans text-[10px] text-[#9A9A9A]">
                          {i === 0 ? 'Confirmed' : 'Optional'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
                {step === 2 ? (
                  <div className="rounded-xl bg-[#E8F1FF] px-4 py-5 text-center">
                    <p className="font-sans text-sm font-bold text-[#006AFE]">You&apos;re in</p>
                    <p className="mt-1 font-sans text-xs text-[#5A5A5A]">
                      Ticket saved · updates will land here
                    </p>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ProductDemoFrame>
  )
}

export function EventPageDemo({ className }: { className?: string }) {
  return (
    <ProductDemoFrame title="Stage · Event" tone="product" className={className}>
      <div className="bg-[#FAFAFA] p-4 sm:p-5">
        <div className="overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white">
          <img
            src={STAGE_TEASER_IMAGES[2]}
            alt=""
            className="h-36 w-full object-cover sm:h-40"
            draggable={false}
          />
          <div className="space-y-3 p-4">
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-wide text-[#006AFE]">
                Performance
              </p>
              <p className="mt-1 font-sans text-lg font-bold text-[#1A1A1A]">Campus showcase</p>
              <p className="mt-1 font-sans text-xs text-[#5A5A5A]">Fri 6:30pm · Main hall</p>
            </div>
            <div className="flex gap-2">
              <span className="rounded-full bg-[#F4F4F4] px-2.5 py-1 font-sans text-[10px] font-medium text-[#1A1A1A]">
                Schedule
              </span>
              <span className="rounded-full bg-[#F4F4F4] px-2.5 py-1 font-sans text-[10px] font-medium text-[#1A1A1A]">
                Contact
              </span>
              <span className="rounded-full bg-[#F4F4F4] px-2.5 py-1 font-sans text-[10px] font-medium text-[#1A1A1A]">
                Venue
              </span>
            </div>
            <button
              type="button"
              className="w-full rounded-full bg-[#006AFE] py-2.5 font-sans text-sm font-semibold text-white"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </ProductDemoFrame>
  )
}

export function UpdatesInboxDemo({ className }: { className?: string }) {
  const reduceMotion = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const notes = [
    { title: 'Venue moved to Hall B', time: '2m ago', unread: true },
    { title: 'Reporting time is 5:45pm', time: '1h ago', unread: true },
    { title: 'Bring college ID', time: 'Yesterday', unread: false },
  ] as const

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % notes.length), 2200)
    return () => window.clearInterval(id)
  }, [reduceMotion, notes.length])

  return (
    <ProductDemoFrame title="Stage · Updates" tone="product" className={className}>
      <div className="bg-[#FAFAFA] p-4 sm:p-5">
        <p className="mb-3 font-sans text-sm font-semibold text-[#1A1A1A]">Your updates</p>
        <ul className="space-y-2">
          {notes.map((note, i) => (
            <li key={note.title}>
              <motion.div
                animate={{
                  borderColor:
                    i === active ? 'rgba(0,106,254,0.4)' : 'rgba(232,232,232,1)',
                  backgroundColor: i === active ? 'rgba(232,241,255,0.65)' : '#ffffff',
                }}
                className="rounded-xl border px-3 py-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-sans text-sm font-semibold text-[#1A1A1A]">{note.title}</p>
                  {note.unread ? (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#006AFE]" />
                  ) : null}
                </div>
                <p className="mt-1 font-sans text-xs text-[#9A9A9A]">{note.time}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </ProductDemoFrame>
  )
}

export function RegistrationsTableDemo({ className }: { className?: string }) {
  const rows = [
    { name: 'Aanya M.', type: 'Individual', status: 'Confirmed' },
    { name: 'Team Pixel', type: 'Team', status: 'Pending' },
    { name: 'Rohan K.', type: 'Individual', status: 'Confirmed' },
    { name: 'Design Lab', type: 'Team', status: 'Waitlist' },
  ] as const

  return (
    <ProductDemoFrame title="Backstage · Registrations" className={className}>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-[#E8E8E8] bg-[#FAFAFA] px-3 py-2.5 sm:px-4">
        {[
          { n: '128', l: 'Confirmed', c: 'text-emerald-700' },
          { n: '14', l: 'Pending', c: 'text-amber-700' },
          { n: '6', l: 'Waitlist', c: 'text-[#006AFE]' },
        ].map((stat) => (
          <p key={stat.l} className="font-sans text-xs text-[#5A5A5A]">
            <span className={cn('font-semibold tabular-nums', stat.c)}>{stat.n}</span>{' '}
            {stat.l}
          </p>
        ))}
      </div>
      <div className="overflow-x-auto bg-white">
        <table className="w-full min-w-[18rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E8E8E8]">
              {['Name', 'Type', 'Status'].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-wide text-[#9A9A9A] sm:px-4"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-[#F0F0F0]">
                <td className="px-3 py-3 font-sans text-sm font-medium text-[#1A1A1A] sm:px-4">
                  {row.name}
                </td>
                <td className="px-3 py-3 font-sans text-xs text-[#5A5A5A] sm:px-4">{row.type}</td>
                <td className="px-3 py-3 sm:px-4">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold',
                      row.status === 'Confirmed' && 'bg-emerald-50 text-emerald-700',
                      row.status === 'Pending' && 'bg-amber-50 text-amber-700',
                      row.status === 'Waitlist' && 'bg-[#E8F1FF] text-[#006AFE]',
                    )}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProductDemoFrame>
  )
}

export function ComposeUpdateDemo({ className }: { className?: string }) {
  return (
    <ProductDemoFrame title="Backstage · Updates" className={className}>
      <div className="space-y-3 bg-[#FAFAFA] p-4 sm:p-5">
        <div className="rounded-2xl border border-[#E8E8E8] bg-white p-4">
          <p className="font-sans text-xs font-medium text-[#9A9A9A]">To</p>
          <p className="mt-1 font-sans text-sm font-semibold text-[#1A1A1A]">
            All registered · Open mic night
          </p>
          <div className="mt-3 h-24 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-3 font-sans text-sm text-[#5A5A5A]">
            Venue moved to Hall B. Doors open 5:45pm.
          </div>
          <div className="mt-3 flex justify-end">
            <span className="rounded-full bg-[#F92C99] px-4 py-2 font-sans text-xs font-semibold text-white">
              Send update
            </span>
          </div>
        </div>
      </div>
    </ProductDemoFrame>
  )
}
