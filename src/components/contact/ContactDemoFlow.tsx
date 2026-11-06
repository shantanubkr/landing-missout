import { useId, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_INBOX_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from '../../lib/contact'
import { FigmaButtonPrimary } from '../figma/FigmaPrimitives'
import { PixelIcon } from '../icons/PixelIcon'
import { AnimatedText } from '../motion/AnimatedText'
import { PixelWipeGrid, usePixelWipePlay } from '../motion/PixelWipe'
import { RollText } from '../motion/RollText'

const BTN =
  'anim-btn pixel-wipe group font-display relative inline-flex h-9 min-w-[112px] items-center justify-center overflow-hidden rounded-[6px] bg-black px-4 text-[14px] text-white disabled:opacity-40'

function ContactWipeButton({
  className = '',
  children,
  onPointerDown,
  ...props
}: ComponentPropsWithoutRef<'button'> & { children: ReactNode }) {
  const { runKey, play } = usePixelWipePlay()
  return (
    <button
      {...props}
      className={className}
      onPointerDown={(e) => {
        play()
        onPointerDown?.(e)
      }}
    >
      <PixelWipeGrid key={runKey} runKey={runKey} />
      <span className="relative z-[1]">{children}</span>
    </button>
  )
}

function ContactWipeLink({
  className = '',
  children,
  onPointerDown,
  ...props
}: ComponentPropsWithoutRef<'a'> & { children: ReactNode }) {
  const { runKey, play } = usePixelWipePlay()
  return (
    <a
      {...props}
      className={className}
      onPointerDown={(e) => {
        play()
        onPointerDown?.(e)
      }}
    >
      <PixelWipeGrid key={runKey} runKey={runKey} />
      <span className="relative z-[1] flex min-w-0 items-center gap-4">{children}</span>
    </a>
  )
}

export const CONTACT_ROLES = [
  'Event Organiser',
  'College Head',
  'Club Head',
  'Sponsor',
  'Other',
] as const

type ContactRole = (typeof CONTACT_ROLES)[number]
type DemoStep = 'role' | 'name' | 'phone'

const STEPS: DemoStep[] = ['role', 'name', 'phone']

const stepQuestion: Record<DemoStep, string> = {
  role: 'Your role?',
  name: 'What\u2019s your name?',
  phone: 'What\u2019s your number?',
}

function encodeMailto(subject: string, body: string) {
  return `mailto:${encodeURIComponent(CONTACT_INBOX_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function ContactDemoFlow() {
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
    const payload = { role, name: name.trim(), phone: phone.trim() }
    const messageBody = ['Demo request', '', `Role: ${payload.role}`, `Name: ${payload.name}`, `Phone: ${payload.phone}`].join(
      '\n',
    )

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

    window.location.href = encodeMailto('Missout demo request', messageBody)
    setStatus('success')
  }

  function handleNext() {
    if (!canContinue) return
    if (isLastStep) {
      void submitDemo()
      return
    }
    setStepIndex((i) => i + 1)
    setErrorMessage(null)
    if (STEPS[stepIndex + 1] !== 'role') {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  function handleBack() {
    if (stepIndex === 0) return
    setStepIndex((i) => i - 1)
    setErrorMessage(null)
  }

  if (status === 'success') {
    return (
      <section className="border-b border-line bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-lg text-center sm:text-left">
          <h1 className="font-display m-0 text-[clamp(2rem,5vw,3rem)] leading-[0.95] text-black">Thanks. We&apos;ll be in touch.</h1>
          <p className="font-display mt-4 text-[18px] leading-relaxed text-[#333]">
            {web3Key
              ? 'We received your demo request and will follow up shortly.'
              : 'Your email app should open with the request ready to send. If nothing opens, reach us at info@missout.in.'}
          </p>
          <div className="mt-8">
            <FigmaButtonPrimary to="/" className="!h-9 !min-w-[104px] !px-4 !text-[14px] sm:!h-10 sm:!min-w-[120px] sm:!text-[15px]">
              Back to home
            </FigmaButtonPrimary>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-[1728px]">
      <div className="mx-4 border-x border-line px-4 py-10 sm:mx-[6.97%] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-md">
        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={handleBack}
            className="font-display mb-6 border-0 bg-transparent p-0 text-[16px] text-[#666] transition-colors duration-200 hover:text-brand-pink"
          >
            ← Back
          </button>
        ) : null}

        <AnimatedText
          as="h1"
          trigger="load"
          delay={120}
          text="Let’s work together"
          className="font-display m-0 text-[clamp(2rem,5vw,3rem)] leading-[0.95] text-black"
        />

        <div className="mt-6 h-1 w-full overflow-hidden border border-line bg-[#f4f4f4]">
          <div
            className="h-full bg-[#f92c99] transition-[width] duration-300"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <p className="font-display m-0 mt-6 text-[clamp(1.25rem,3vw,1.75rem)] leading-tight text-black">{stepQuestion[step]}</p>

        <form
          id={formId}
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault()
            handleNext()
          }}
        >
          {step === 'role' ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CONTACT_ROLES.map((option) => {
                const selected = role === option
                return (
                  <ContactWipeButton
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setRole(option)}
                    className={`pixel-wipe font-display relative overflow-hidden rounded-[6px] border px-4 py-3 text-left text-[15px] transition-colors duration-200 ${
                      selected
                        ? 'border-black bg-white text-black'
                        : 'border-line bg-[#fbfbfb] text-black hover:border-brand-pink/30 hover:bg-[#fff5fa]'
                    }`}
                  >
                    {option}
                  </ContactWipeButton>
                )
              })}
            </div>
          ) : (
            <>
              <label htmlFor={`${formId}-${step}`} className="font-display block text-[15px] text-[#666]">
                {step === 'name' ? 'Full name' : 'Phone number'}
              </label>
              <input
                ref={inputRef}
                id={`${formId}-${step}`}
                name={step}
                type={step === 'phone' ? 'tel' : 'text'}
                autoComplete={step === 'name' ? 'name' : 'tel'}
                inputMode={step === 'phone' ? 'tel' : undefined}
                required
                value={step === 'name' ? name : phone}
                onChange={(e) => (step === 'name' ? setName(e.target.value) : setPhone(e.target.value))}
                placeholder={step === 'name' ? 'Your name' : '+91 98765 43210'}
                disabled={status === 'submitting'}
                className="font-display mt-2 box-border w-full min-h-12 border border-line bg-white px-4 py-3 text-[16px] text-black outline-none focus:border-[#f92c99]"
              />
            </>
          )}

          {errorMessage ? (
            <p className="font-display mt-4 text-[15px] text-red-700" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <div className="mt-8">
            <ContactWipeButton type="submit" disabled={!canContinue || status === 'submitting'} className={BTN}>
              <RollText>{status === 'submitting' ? 'Sending…' : isLastStep ? 'Submit' : 'Next'}</RollText>
            </ContactWipeButton>
          </div>
        </form>

        <p className="font-display mt-8 text-[14px] text-[#666]">
          Step {stepIndex + 1} of {STEPS.length}
        </p>
      </div>
      </div>
      </div>
    </section>
  )
}

export function ContactDirectSection() {
  return (
    <section id="message-direct" className="border-b border-line bg-white">
      <div className="mx-auto max-w-[1728px]">
      <div className="mx-4 border-x border-line px-4 py-12 sm:mx-[6.97%] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl text-center">
        <AnimatedText as="h2" text="Or message direct" className="font-display m-0 text-[32px] text-black sm:text-[40px]" />
        <p className="font-display mx-auto mt-3 max-w-md text-[18px] text-[#333]">
          Email or WhatsApp if you&apos;d rather skip the form.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ContactWipeLink
            href={`mailto:${CONTACT_INBOX_EMAIL}`}
            className="pixel-wipe font-display relative flex items-center overflow-hidden rounded-[6px] border border-line bg-white p-4 text-left no-underline transition-colors duration-200 hover:border-brand-pink/30 hover:bg-[#fff5fa]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-[6px] border border-line bg-[#fafafa] text-brand-pink">
              <PixelIcon name="envelope" className="size-4" />
            </span>
            <span>
              <span className="block text-[14px] text-[#666]">Email</span>
              <span className="block text-[15px] text-black">{CONTACT_INBOX_EMAIL}</span>
            </span>
          </ContactWipeLink>
          <ContactWipeLink
            href={CONTACT_PHONE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-wipe font-display relative flex items-center overflow-hidden rounded-[6px] border border-line bg-white p-4 text-left no-underline transition-colors duration-200 hover:border-brand-pink/30 hover:bg-[#fff5fa]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-[6px] border border-line bg-[#fafafa] text-brand-pink">
              <PixelIcon name="phone" className="size-4" />
            </span>
            <span>
              <span className="block text-[14px] text-[#666]">WhatsApp</span>
              <span className="block text-[15px] text-black">{CONTACT_PHONE_DISPLAY}</span>
            </span>
          </ContactWipeLink>
        </div>
        <p className="font-display mt-8 text-[16px]">
          <Link to="/" className="text-black no-underline transition-colors duration-200 hover:text-brand-pink">
            Back to home
          </Link>
        </p>
      </div>
      </div>
      </div>
    </section>
  )
}
