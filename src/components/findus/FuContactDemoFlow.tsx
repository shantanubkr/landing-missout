import { useId, useRef, useState, type HTMLAttributes } from 'react'
import { CONTACT_INBOX_EMAIL } from '../../lib/contact'
import type { FuBrandHue } from '../../lib/design/findus'
import { cn } from '../../lib/cn'
import {
  fuBackLinkClass,
  fuFieldClass,
  fuFocusRing,
  fuMotion,
  fuStepDotClass,
} from '../../lib/design/findusMotion'
import { FuMascot } from './FuMascot'
import { FuButton, FuButtonLink } from './FuButton'
import { FuStepProgress } from './FuStepProgress'
import { FuBody, FuDisplay, FuMeta } from './FuTypography'

export const CONTACT_ROLES = [
  'Event Organiser',
  'College Head',
  'Club Head',
  'Sponsor',
  'Other',
] as const

export type ContactRole = (typeof CONTACT_ROLES)[number]
type DemoStep = 'role' | 'name' | 'phone'

const STEPS: DemoStep[] = ['role', 'name', 'phone']

const stepQuestion: Record<DemoStep, string> = {
  role: 'Your role?',
  name: 'What\u2019s your name?',
  phone: 'What\u2019s your number?',
}

const stepFieldCopy: Record<
  Exclude<DemoStep, 'role'>,
  {
    label: string
    placeholder: string
    type: string
    autoComplete: string
    inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  }
> = {
  name: {
    label: 'Full name',
    placeholder: 'Your name',
    type: 'text',
    autoComplete: 'name',
  },
  phone: {
    label: 'Phone number',
    placeholder: '+91 98765 43210',
    type: 'tel',
    autoComplete: 'tel',
    inputMode: 'tel',
  },
}

function encodeMailto(subject: string, body: string) {
  return `mailto:${encodeURIComponent(CONTACT_INBOX_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const stepAnimation: Record<DemoStep, string> = {
  role: 'curious',
  name: 'listening',
  phone: 'thinking',
}

const stepAccent: Record<DemoStep, FuBrandHue> = {
  role: 'lime',
  name: 'blue',
  phone: 'pink',
}

const stepProgressColor: Record<DemoStep, string> = {
  role: 'var(--fu-brand-lime)',
  name: 'var(--fu-brand-blue)',
  phone: 'var(--fu-brand-pink)',
}

function DemoMascotPanel({ animation, accent }: { animation: string; accent: FuBrandHue }) {
  return (
    <div
      key={`${animation}-${accent}`}
      className={cn('flex h-full min-h-[18rem] w-full items-center justify-center p-8 sm:min-h-[20rem] sm:p-12 lg:min-h-0 lg:p-16', 'fu-enter', fuMotion.reduced)}
    >
      <FuMascot size="hero" accent={accent} animation={animation} />
    </div>
  )
}

export type FuContactDemoFlowProps = {
  className?: string
}

/** Contact hero — role, name, phone steps with mascot panel. */
export function FuContactDemoFlow({ className }: FuContactDemoFlowProps) {
  const formId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const [stepIndex, setStepIndex] = useState(0)
  const [role, setRole] = useState<ContactRole | ''>('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const step = STEPS[stepIndex]
  const isLastStep = stepIndex === STEPS.length - 1
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

  const canContinue =
    step === 'role' ? role.length > 0 : step === 'name' ? name.trim().length > 0 : phone.trim().length > 0

  async function submitDemo() {
    const payload = {
      role,
      name: name.trim(),
      phone: phone.trim(),
    }

    const messageBody = [
      'Demo request',
      '',
      `Role: ${payload.role}`,
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
    ].join('\n')

    setStatus('submitting')
    setErrorMessage(null)

    if (web3Key) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            subject: 'Missout demo request',
            name: payload.name,
            phone: payload.phone,
            message: messageBody,
          }),
        })
        const data = (await res.json()) as { success?: boolean; message?: string }
        if (res.ok && data.success) {
          setStatus('success')
          return
        }
        setStatus('error')
        setErrorMessage(data.message ?? 'Could not send your request. Try again or email us directly.')
      } catch {
        setStatus('error')
        setErrorMessage('Network error. Please try again or email us directly.')
      }
      return
    }

    try {
      window.location.href = encodeMailto('Missout demo request', messageBody)
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Could not open your email app. Please email us directly.')
    }
  }

  function handleNext() {
    if (!canContinue) return

    if (isLastStep) {
      void submitDemo()
      return
    }

    setStepIndex((index) => index + 1)
    setErrorMessage(null)
    if (STEPS[stepIndex + 1] !== 'role') {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  function handleBack() {
    if (stepIndex === 0) return
    setStepIndex((index) => index - 1)
    setErrorMessage(null)
    if (STEPS[stepIndex - 1] !== 'role') {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  if (status === 'success') {
    return (
      <section className={cn('border-b border-[var(--fu-hairline)] bg-[var(--fu-canvas)]', className)}>
        <div className="grid lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-12 sm:px-8 lg:px-16 xl:px-20">
            <div className={cn('fu-enter', fuMotion.reduced)}>
              <FuDisplay className="max-w-lg text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
                Thanks. We&apos;ll be in touch.
              </FuDisplay>
              <FuBody className="mt-4 max-w-md text-base sm:text-lg">
                {web3Key
                  ? 'We received your demo request and will follow up shortly.'
                  : 'Your email app should open with the request ready to send. If nothing opens, reach us at info@missout.in.'}
              </FuBody>
              <div className="mt-8">
                <FuButtonLink to="/" variant="primary" size="lg">
                  Back to home
                </FuButtonLink>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <DemoMascotPanel animation="happy" accent="pink" />
          </div>
        </div>
      </section>
    )
  }

  const fieldCopy = step !== 'role' ? stepFieldCopy[step] : null

  return (
    <section className={cn('border-b border-[var(--fu-hairline)] bg-[var(--fu-canvas)]', className)}>
      <div className="grid lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-8 sm:px-8 sm:py-12 lg:px-16 xl:px-20">
          <div className="mx-auto w-full max-w-md">
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className={cn(
                  'mb-6 fu-type-body-sm font-medium text-[var(--fu-ink-secondary)] hover:text-[var(--fu-ink)]',
                  fuBackLinkClass,
                  fuFocusRing,
                )}
              >
                ← Back
              </button>
            ) : null}

            <FuDisplay className="text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
              Let&apos;s work together
            </FuDisplay>

            <FuStepProgress
              className="mt-6"
              current={stepIndex + 1}
              total={STEPS.length}
              fillColor={stepProgressColor[step]}
              showDots={false}
            />

            <p
              key={step}
              className={cn(
                'fu-font-sans m-0 mt-4 text-[clamp(1.375rem,2.5vw,1.875rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--fu-ink)]',
                'fu-enter',
                fuMotion.reduced,
              )}
            >
              {stepQuestion[step]}
            </p>

            <form
              id={formId}
              className="mt-8"
              onSubmit={(event) => {
                event.preventDefault()
                handleNext()
              }}
            >
              <div key={step} className={cn('fu-enter', fuMotion.reduced)}>
              {step === 'role' ? (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CONTACT_ROLES.map((option) => {
                    const selected = role === option
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setRole(option)}
                        className={cn(
                          'rounded-[var(--fu-radius-sm)] border border-[length:var(--fu-card-border-width)] px-4 py-3 text-left fu-type-body-sm font-semibold',
                          fuMotion.ui,
                          fuMotion.hoverLift,
                          fuMotion.chipPress,
                          fuMotion.reduced,
                          selected
                            ? 'border-[var(--fu-ink)] bg-[var(--fu-surface)] shadow-[var(--fu-shadow-soft)]'
                            : 'border-[var(--fu-card-border)] bg-[var(--fu-canvas)] hover:border-[var(--fu-ink)] hover:bg-[var(--fu-surface)]',
                          fuFocusRing,
                        )}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              ) : fieldCopy ? (
                <>
                  <label
                    htmlFor={`${formId}-${step}`}
                    className="fu-type-body-sm font-medium text-[var(--fu-ink-muted)]"
                  >
                    {fieldCopy.label}
                  </label>
                  <input
                    ref={inputRef}
                    id={`${formId}-${step}`}
                    name={step}
                    type={fieldCopy.type}
                    autoComplete={fieldCopy.autoComplete}
                    inputMode={fieldCopy.inputMode}
                    required
                    value={step === 'name' ? name : phone}
                    onChange={(event) =>
                      step === 'name' ? setName(event.target.value) : setPhone(event.target.value)
                    }
                    placeholder={fieldCopy.placeholder}
                    disabled={status === 'submitting'}
                    autoFocus
                    className={cn(
                      'mt-2 box-border w-full min-h-12 rounded-[var(--fu-radius-sm)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-canvas)] px-4 py-3',
                      'text-base leading-normal text-[var(--fu-ink)] outline-none',
                      'placeholder:text-[var(--fu-ink-muted)]',
                      'focus:border-[var(--fu-brand-blue)]',
                      fuFieldClass,
                      fuFocusRing,
                    )}
                  />
                </>
              ) : null}
              </div>

              {errorMessage ? (
                <p className="mt-4 fu-type-body-sm text-red-700" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
                <FuButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="min-w-[8.5rem] w-full sm:w-auto"
                  disabled={!canContinue || status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : isLastStep ? 'Submit' : 'Next'}
                </FuButton>
                <FuMascot
                  size="sm"
                  accent={stepAccent[step]}
                  animation={stepAnimation[step]}
                  className={cn('self-start lg:hidden', 'motion-safe:transition-transform motion-safe:duration-300')}
                />
              </div>
            </form>

            <div className="mt-8 flex items-center justify-between gap-4">
              <FuMeta className="tabular-nums normal-case text-[var(--fu-ink-muted)]">
                Step {stepIndex + 1} of {STEPS.length}
              </FuMeta>
              <div className="flex items-center gap-2" aria-hidden>
                {STEPS.map((item, index) => (
                  <span key={item} className={fuStepDotClass(index === stepIndex)} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <DemoMascotPanel animation={stepAnimation[step]} accent={stepAccent[step]} />
        </div>
      </div>
    </section>
  )
}
