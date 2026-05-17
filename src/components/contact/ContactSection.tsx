import { useId, useRef, useState } from 'react'
import { Button } from '../ui/Button'
import { CONTACT_INBOX_EMAIL } from '../../lib/contact'
import { cn } from '../../lib/cn'
import { useScrollProgressDrift } from '../../hooks/useScrollProgressDrift'

const inputFocusHome =
  'focus:border-[#F92C99] focus:ring-2 focus:ring-[#F92C99]/25'
const inputFocusProduct =
  'focus:border-[#006AFE] focus:ring-2 focus:ring-[#006AFE]/25'

const inputBase =
  'w-full rounded-xl border border-[#C5C5C5] bg-white px-4 py-3 font-sans text-base text-[#1A1A1A] ' +
  'outline-none transition-[border-color,box-shadow] duration-200 ' +
  'placeholder:text-[#1A1A1A]/40 ' +
  'motion-reduce:transition-none disabled:opacity-60'

type Partnership = 'college' | 'company' | 'other'

export type ContactSectionProps = {
  /** Marketing uses brand pink; product route uses blue. */
  accent?: 'home' | 'product'
}

const labelClass = 'block font-sans text-sm font-medium text-[#1A1A1A]'

function encodeMailto(subject: string, body: string) {
  const s = encodeURIComponent(subject)
  const b = encodeURIComponent(body)
  return `mailto:${encodeURIComponent(CONTACT_INBOX_EMAIL)}?subject=${s}&body=${b}`
}

export function ContactSection({ accent = 'home' }: ContactSectionProps) {
  const headingId = useId()
  const formId = useId()
  const sectionRef = useRef<HTMLElement | null>(null)
  const driftRef = useRef<HTMLDivElement | null>(null)
  useScrollProgressDrift(sectionRef, driftRef, 30)

  const btnTheme = accent === 'product' ? 'product' : 'home'
  const inputFocusClass = accent === 'product' ? inputFocusProduct : inputFocusHome
  const inputClass = cn(inputBase, inputFocusClass)
  const starClass = accent === 'product' ? 'text-[#006AFE]' : 'text-[#F92C99]'
  const eyebrowClass =
    accent === 'product'
      ? 'font-sans text-sm font-medium tracking-wide text-[#006AFE] sm:text-base'
      : 'font-sans text-sm font-medium tracking-wide text-[#F92C99] sm:text-base'
  const partnershipSelectedClass =
    accent === 'product'
      ? 'border-[#006AFE] bg-[#006AFE]/10 text-[#1A1A1A]'
      : 'border-[#F92C99] bg-[#F92C99]/10 text-[#1A1A1A]'
  const radioAccentClass = accent === 'product' ? 'accent-[#006AFE]' : 'accent-[#F92C99]'

  const [name, setName] = useState('')
  const [collegeOrOrganiser, setCollegeOrOrganiser] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [partnershipType, setPartnershipType] = useState<Partnership | ''>('')
  const [collaboration, setCollaboration] = useState('')

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage(null)

    if (!partnershipType) {
      setErrorMessage('Please choose a partnership type.')
      return
    }

    const payload = {
      name: name.trim(),
      collegeOrOrganiser: collegeOrOrganiser.trim(),
      email: email.trim(),
      phone: phone.trim(),
      partnershipType,
      collaboration: collaboration.trim(),
    }

    const messageBody = [
      `Name: ${payload.name}`,
      `College / Organiser: ${payload.collegeOrOrganiser}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || '—'}`,
      `Partnership type: ${payload.partnershipType}`,
      '',
      'How would you like to collaborate?',
      payload.collaboration || '—',
    ].join('\n')

    setStatus('submitting')

    if (web3Key) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `Missout contact — ${payload.partnershipType}`,
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            message: messageBody,
            replyto: payload.email,
            from_name: payload.name,
          }),
        })
        const data = (await res.json()) as { success?: boolean; message?: string }
        if (res.ok && data.success) {
          setStatus('success')
          setName('')
          setCollegeOrOrganiser('')
          setEmail('')
          setPhone('')
          setPartnershipType('')
          setCollaboration('')
          return
        }
        setStatus('error')
        setErrorMessage(data.message ?? 'Could not send your message. Try again or email us directly.')
      } catch {
        setStatus('error')
        setErrorMessage('Network error. Please try again or email us directly.')
      }
      return
    }

    try {
      const mailto = encodeMailto(
        `Missout contact — ${payload.partnershipType}`,
        messageBody,
      )
      window.location.href = mailto
      setStatus('success')
      setName('')
      setCollegeOrOrganiser('')
      setEmail('')
      setPhone('')
      setPartnershipType('')
      setCollaboration('')
    } catch {
      setStatus('error')
      setErrorMessage('Could not open your email app. Please email us directly.')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="scroll-mt-20 bg-white px-4 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-12 md:pt-24 md:pb-14"
      aria-labelledby={headingId}
    >
      <div ref={driftRef} className="mx-auto max-w-2xl will-change-transform">
        <div className="text-center">
          <p className={eyebrowClass}>Contact us</p>
          <h2
            id={headingId}
            className="font-display mt-3 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:mt-4 sm:text-4xl md:text-5xl"
          >
            Get in touch
          </h2>
          <p className="font-sans mx-auto mt-3 max-w-2xl text-base text-[#5A5A5A] sm:mt-4 sm:text-lg">
            Tell us about your campus or company — we&apos;ll get back to you.
          </p>
        </div>

        <div className="mt-10 min-w-0 lg:mt-14">
          {status === 'success' && (
            <div
              className="mb-6 rounded-xl border border-[#C5C5C5]/80 bg-[#F8F8F8] px-4 py-3 font-sans text-sm text-[#1A1A1A] sm:text-base"
              role="status"
            >
              {web3Key
                ? 'Thanks — we received your message and will follow up shortly.'
                : 'Thanks — your email app should open with your message ready to send. If nothing opens, reach us via the social links in the footer.'}
            </div>
          )}
          {(status === 'error' || errorMessage) && (
            <div
              className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-900"
              role="alert"
            >
              {errorMessage ?? 'Something went wrong.'}
            </div>
          )}

          <form
            id={formId}
            className="space-y-5 text-left"
            onSubmit={handleSubmit}
          >
              <div>
                <label htmlFor={`${formId}-name`} className={labelClass}>
                  Name <span className={starClass}>*</span>
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cn('mt-2', inputClass)}
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor={`${formId}-college`} className={labelClass}>
                  College / Organiser name <span className={starClass}>*</span>
                </label>
                <input
                  id={`${formId}-college`}
                  name="collegeOrOrganiser"
                  type="text"
                  required
                  autoComplete="organization"
                  value={collegeOrOrganiser}
                  onChange={(e) => setCollegeOrOrganiser(e.target.value)}
                  className={cn('mt-2', inputClass)}
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor={`${formId}-email`} className={labelClass}>
                  Email <span className={starClass}>*</span>
                </label>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn('mt-2', inputClass)}
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor={`${formId}-phone`} className={labelClass}>
                  Phone number
                </label>
                <input
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={cn('mt-2', inputClass)}
                  disabled={status === 'submitting'}
                  placeholder="+91 98765 43210"
                />
              </div>

              <fieldset className="min-w-0">
                <legend className={labelClass}>
                  Partnership type <span className={starClass}>*</span>
                </legend>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  {(
                    [
                      { value: 'college', label: 'College' },
                      { value: 'company', label: 'Company' },
                      { value: 'other', label: 'Other' },
                    ] as const
                  ).map((opt) => (
                    <label
                      key={opt.value}
                      className={cn(
                        'inline-flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 font-sans text-sm sm:text-base',
                        partnershipType === opt.value ? partnershipSelectedClass : 'border-[#C5C5C5] bg-white text-[#1A1A1A]',
                        'transition-colors duration-200 has-[:disabled]:opacity-60',
                      )}
                    >
                      <input
                        type="radio"
                        name="partnershipType"
                        value={opt.value}
                        required={opt.value === 'college'}
                        checked={partnershipType === opt.value}
                        onChange={() => setPartnershipType(opt.value)}
                        disabled={status === 'submitting'}
                        className={cn('h-4 w-4 shrink-0', radioAccentClass)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor={`${formId}-collaboration`} className={labelClass}>
                  How would you like to collaborate? <span className={starClass}>*</span>
                </label>
                <textarea
                  id={`${formId}-collaboration`}
                  name="collaboration"
                  required
                  rows={5}
                  value={collaboration}
                  onChange={(e) => setCollaboration(e.target.value)}
                  className={cn('mt-2 min-h-[8rem] resize-y', inputClass)}
                  disabled={status === 'submitting'}
                  placeholder="Tell us about your campus or organisation, and what kind of partnership you have in mind…"
                />
              </div>

            <div className="flex flex-col items-center pt-2">
              <Button
                type="submit"
                variant="primary"
                theme={btnTheme}
                size="lg"
                className="w-full max-w-xs sm:w-auto"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
