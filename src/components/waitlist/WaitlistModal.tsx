import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { submitWaitlist } from '../../lib/waitlist'

type WaitlistModalProps = {
  open: boolean
  onClose: () => void
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const labelClass = 'block font-sans text-sm font-medium text-[#1A1A1A]'

const inputClass =
  'w-full rounded-xl border border-[#C5C5C5] bg-white px-4 py-3 font-sans text-base text-[#1A1A1A] ' +
  'outline-none transition-[border-color,box-shadow] duration-200 ' +
  'placeholder:text-[#1A1A1A]/40 ' +
  'focus:border-[#F92C99] focus:ring-2 focus:ring-[#F92C99]/25 ' +
  'motion-reduce:transition-none disabled:opacity-60'

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

const SIDE_VECTOR_SRC = '/waitlist/side_vector.svg'
const BACKDROP_SRC = '/waitlist/backdrop_blur.svg'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function HeadlineBracket({ side }: { side: 'left' | 'right' }) {
  return (
    <img
      src={SIDE_VECTOR_SRC}
      alt=""
      aria-hidden
      draggable={false}
      className={cn(
        'pointer-events-none absolute top-0 z-0 hidden h-32 w-auto select-none sm:block sm:h-36 lg:h-40',
        side === 'left' ? 'left-0' : 'right-0 -scale-x-100',
      )}
    />
  )
}

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const headingId = useId()
  const fieldId = useId()
  const prefersReducedMotion = usePrefersReducedMotion()

  const cardRef = useRef<HTMLDivElement | null>(null)
  const firstFieldRef = useRef<HTMLInputElement | null>(null)

  const [name, setName] = useState('')
  const [collegeName, setCollegeName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'student' | 'organiser' | ''>('')
  const [company, setCompany] = useState('')

  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const submitting = status === 'submitting'

  function resetForm() {
    setName('')
    setCollegeName('')
    setEmail('')
    setRole('')
    setCompany('')
    setStatus('idle')
    setErrorMessage(null)
  }

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const card = cardRef.current
      if (!card) return
      const items = Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 60)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown, true)
      window.clearTimeout(focusTimer)
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage(null)

    if (company.trim()) {
      setStatus('success')
      return
    }

    const trimmedEmail = email.trim()
    if (!name.trim() || !collegeName.trim() || !trimmedEmail) {
      setStatus('error')
      setErrorMessage('Please fill in your name, college, and email.')
      return
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      firstFieldRef.current?.form?.querySelector<HTMLInputElement>('input[type="email"]')?.focus()
      return
    }
    if (!role) {
      setStatus('error')
      setErrorMessage('Please tell us if you’re a student or organiser.')
      return
    }

    setStatus('submitting')
    try {
      await submitWaitlist({ name, collegeName, email, role })
      setName('')
      setCollegeName('')
      setEmail('')
      setRole('')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    }
  }

  if (typeof document === 'undefined') return null

  const backdropTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: 'easeOut' as const }
  const cardTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }

  return createPortal(
    <AnimatePresence onExitComplete={resetForm}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto backdrop-blur-[20px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={backdropTransition}
          onClick={onClose}
        >
          <img
            src={BACKDROP_SRC}
            alt=""
            aria-hidden
            className="pointer-events-none fixed inset-0 h-full w-full object-cover"
          />
          <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6">
          <motion.div
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            className="relative z-10 w-full max-w-[46rem] rounded-[28px] border border-[#C4C4C4] bg-white p-3 shadow-[0_30px_90px_-22px_rgba(0,0,0,0.45)] sm:p-4"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 12, scale: prefersReducedMotion ? 1 : 0.98 }}
            transition={cardTransition}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={cn(
                'absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full sm:right-5 sm:top-5',
                'border border-[#F92C99]/30 bg-white text-[#F92C99] shadow-sm',
                'transition-[background-color,color,border-color,transform] duration-200',
                'hover:scale-105 hover:border-[#F92C99] hover:bg-[#F92C99] hover:text-white',
                'active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
                'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]',
              )}
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="relative overflow-hidden rounded-[20px] border border-[#C4C4C4] bg-white px-6 py-9 sm:px-10 sm:py-10">
              <HeadlineBracket side="left" />
              <HeadlineBracket side="right" />

              <div className="relative z-10">
                <h2
                  id={headingId}
                  className="text-center font-canopee text-5xl uppercase leading-[0.82] tracking-tight sm:text-6xl"
                  style={{
                    backgroundImage:
                      'linear-gradient(to top right, #6E0A3E 0%, #FF0A8C 50%, #FF7CC8 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Missout is
                  <br />
                  launching
                  <br />
                  soon!
                </h2>

            {status === 'success' ? (
              <div className="mt-8 flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FCE8F2]" aria-hidden>
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#F92C99]" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-display mt-4 text-2xl font-bold text-[#1A1A1A]">
                  You&apos;re on the list!
                </h3>
                <p className="mt-2 max-w-sm font-sans text-base text-[#5A5A5A]" role="status">
                  You&apos;re in. We&apos;ll email you the moment Missout launches.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#F92C99] px-10 font-sans text-base font-semibold text-white outline-none transition-[background-color,transform] duration-200 hover:bg-[#E11E85] active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]"
                >
                  Done
                </button>
              </div>
            ) : (
              <form className="mt-8 space-y-5 text-left" onSubmit={handleSubmit} noValidate>
                {status === 'error' && errorMessage && (
                  <div
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-900"
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${fieldId}-name`} className={labelClass}>
                      Name <span className="text-[#F92C99]">*</span>
                    </label>
                    <input
                      id={`${fieldId}-name`}
                      ref={firstFieldRef}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitting}
                      placeholder="Jane Doe"
                      className={cn('mt-2', inputClass)}
                    />
                  </div>

                  <div>
                    <label htmlFor={`${fieldId}-college`} className={labelClass}>
                      College Name <span className="text-[#F92C99]">*</span>
                    </label>
                    <input
                      id={`${fieldId}-college`}
                      name="college_name"
                      type="text"
                      required
                      autoComplete="organization"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      disabled={submitting}
                      placeholder="Your college"
                      className={cn('mt-2', inputClass)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`${fieldId}-email`} className={labelClass}>
                    Email Address <span className="text-[#F92C99]">*</span>
                  </label>
                  <input
                    id={`${fieldId}-email`}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitting}
                    placeholder="you@college.edu"
                    className={cn('mt-2', inputClass)}
                  />
                </div>

                <div>
                  <span className={labelClass}>
                    Are you a student or college organiser? <span className="text-[#F92C99]">*</span>
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {(
                      [
                        ['student', 'Student'],
                        ['organiser', 'College Organiser'],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRole(value)}
                        aria-pressed={role === value}
                        disabled={submitting}
                        className={cn(
                          'min-h-12 rounded-xl border px-4 py-3 font-sans text-base font-medium transition-colors duration-200',
                          role === value
                            ? 'border-[#F92C99] bg-[#F92C99]/10 text-[#1A1A1A]'
                            : 'border-[#C5C5C5] bg-white text-[#1A1A1A] hover:border-[#F92C99]/50',
                          'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]',
                          'motion-reduce:transition-none disabled:opacity-60',
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div aria-hidden className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
                  <label htmlFor={`${fieldId}-company`}>Company</label>
                  <input
                    id={`${fieldId}-company`}
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    backgroundImage:
                      'radial-gradient(75% 160% at 50% 38%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 62%), linear-gradient(90deg, #E11E85 0%, #F92C99 50%, #E11E85 100%)',
                  }}
                  className={cn(
                    'mt-1 flex min-h-12 w-full items-center justify-center rounded-full px-6 font-sans text-base font-semibold text-white sm:min-h-[3.25rem]',
                    'outline-none',
                    'transition-[filter,transform,opacity] duration-200 hover:brightness-[1.04] active:scale-[0.99]',
                    'motion-reduce:transition-none motion-reduce:active:scale-100',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]',
                    'disabled:cursor-not-allowed disabled:opacity-60',
                  )}
                >
                  {submitting ? 'Joining…' : 'Join the Waitlist'}
                </button>
              </form>
            )}
              </div>
            </div>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
