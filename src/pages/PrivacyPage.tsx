import { usePageMeta } from '../hooks/usePageMeta'

const LAST_UPDATED = 'May 19, 2026 (updated)'

interface SectionProps {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-10">
      <h2 className="font-display mb-3 text-xl font-semibold text-[#1A1A1A] sm:text-2xl">{title}</h2>
      <div className="space-y-3 font-sans text-sm leading-relaxed text-[#5A5A5A] sm:text-base">
        {children}
      </div>
    </div>
  )
}

export function PrivacyPage() {
  usePageMeta({
    title: 'Privacy Policy',
    description:
      'Learn how Missout collects, uses, and protects your personal information when you use our event discovery and management platform.',
  })

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] bg-[#FAFAFA] px-4 py-12 text-center sm:py-16">
        <p className="font-sans text-sm font-medium tracking-normal text-[#F92C99] sm:text-base">
          Legal
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold leading-none tracking-tight text-[#1A1A1A] sm:mt-3 sm:text-4xl md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 font-sans text-sm text-[#8A8A8A] sm:text-base">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-10 font-sans text-sm leading-relaxed text-[#5A5A5A] sm:text-base">
          Welcome to Missout ("we", "us", or "our"). We operate{' '}
          <span className="font-medium text-[#1A1A1A]">findus.missout.in</span> and related
          services that help college students discover campus events and help organisers manage them.
          This Privacy Policy explains what information we collect, how we use it, and the choices
          you have. By using Missout you agree to the practices described below.
        </p>

        <Section title="1. Information We Collect">
          <p>
            <span className="font-medium text-[#1A1A1A]">Account information.</span> When you sign
            up we collect your name, email address, college/institution, and any profile details you
            choose to provide.
          </p>
          <p>
            <span className="font-medium text-[#1A1A1A]">Event data.</span> Organisers who create
            events submit details such as event name, description, schedule, venue, ticket
            information, and promotional assets.
          </p>
          <p>
            <span className="font-medium text-[#1A1A1A]">Usage information.</span> We automatically
            collect log data (IP address, browser type, pages visited, timestamps) and device
            identifiers to operate and improve the platform.
          </p>
          <p>
            <span className="font-medium text-[#1A1A1A]">Communications.</span> If you contact us
            via the website contact form or email, we retain that correspondence.
          </p>
          <p>
            <span className="font-medium text-[#1A1A1A]">Cookies & local storage.</span> We use
            first-party cookies and browser storage to keep you signed in and to remember your
            preferences. We do not run third-party advertising cookies.
          </p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li>Provide, maintain, and improve the Missout platform and Backnd event-management tools.</li>
            <li>Personalise your event discovery feed based on your college and interests.</li>
            <li>Send transactional emails such as registration confirmations and event reminders.</li>
            <li>Respond to your support requests or enquiries.</li>
            <li>Detect and prevent fraud, abuse, or security incidents.</li>
            <li>Comply with applicable laws and regulations.</li>
          </ul>
          <p>
            We do <span className="font-medium text-[#1A1A1A]">not</span> sell your personal
            information to third parties.
          </p>
        </Section>

        <Section title="3. Sharing of Information">
          <p>We may share your information only in the following circumstances:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <span className="font-medium text-[#1A1A1A]">Service providers.</span> Trusted vendors
              who help us operate the platform (e.g., cloud hosting, email delivery, analytics) and
              are contractually bound to protect your data.
            </li>
            <li>
              <span className="font-medium text-[#1A1A1A]">Event organisers.</span> When you
              register for an event, the organiser receives your registration details (name, email)
              to manage attendance.
            </li>
            <li>
              <span className="font-medium text-[#1A1A1A]">Legal obligations.</span> If required by
              law, court order, or to protect the rights and safety of our users.
            </li>
            <li>
              <span className="font-medium text-[#1A1A1A]">Business transfers.</span> In connection
              with a merger, acquisition, or sale of assets, your data may be transferred; we will
              notify you before it becomes subject to a different privacy policy.
            </li>
          </ul>
        </Section>

        <Section title="4. Data Retention">
          <p>
            We retain your personal data for as long as your account is active or as needed to
            provide our services. You may request deletion of your account and associated data at
            any time by contacting us (see Section 8). We may retain anonymised, aggregated data
            indefinitely for analytics purposes.
          </p>
        </Section>

        <Section title="5. Security">
          <p>
            We implement industry-standard technical and organisational measures — including
            encryption in transit (TLS) and at rest, access controls, and regular security reviews —
            to protect your information. However, no internet transmission is 100 % secure; please
            use a strong, unique password and keep it confidential.
          </p>
        </Section>

        <Section title="6. Children's Privacy">
          <p>
            Missout is intended for college students (typically 17 +). We do not knowingly collect
            personal information from children under 13. If you believe a child under 13 has
            provided us with personal data, please contact us and we will promptly delete it.
          </p>
        </Section>

        <Section title="7. Your Rights & Choices">
          <p>Depending on your jurisdiction you may have the right to:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li>Access the personal data we hold about you.</li>
            <li>Correct inaccurate or incomplete data.</li>
            <li>Request deletion of your data ("right to be forgotten").</li>
            <li>Object to or restrict certain processing activities.</li>
            <li>Withdraw consent where processing is based on consent.</li>
          </ul>
          <p>To exercise any of these rights, contact us at the address in Section 9.</p>
        </Section>

        <Section title="8. Deleting Your Account & Data">
          <p>
            You have the right to request the deletion of your Missout profile and all associated
            platform-level data at any time. To submit a deletion request, write to us at:
          </p>
          <div className="my-2 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] px-5 py-4">
            <p>
              Email:{' '}
              <a
                href="mailto:hello@missout.in"
                className="font-medium text-[#F92C99] underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                hello@missout.in
              </a>
            </p>
            <p className="mt-1 text-xs text-[#8A8A8A] sm:text-sm">
              Subject: Account Deletion Request — please include the email address linked to your account.
            </p>
          </div>
          <p>
            We will acknowledge your request and action it within{' '}
            <span className="font-medium text-[#1A1A1A]">48 hours</span>. Once processed, your
            profile, event registrations, and any personally identifiable information will be
            permanently removed from our active systems.
          </p>
          <p>
            <span className="font-medium text-[#1A1A1A]">What we retain.</span> Notwithstanding
            the above, we will retain certain records as required by applicable Indian law — including
            audit logs, transaction records, and data necessary for financial compliance, fraud
            prevention, or ongoing legal proceedings. This data is kept only for as long as
            mandated by law and is not used for any other purpose.
          </p>
        </Section>

        <Section title="9. Contact Us">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy, please
            reach out to us:
          </p>
          <div className="mt-2 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] px-5 py-4">
            <p className="font-medium text-[#1A1A1A]">Missout</p>
            <p>
              Email:{' '}
              <a
                href="mailto:hello@missout.in"
                className="font-medium text-[#F92C99] underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                hello@missout.in
              </a>
            </p>
            <p>Website: findus.missout.in</p>
          </div>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the
            "Last updated" date at the top of this page and, for material changes, notify you via
            email or an in-app notice. Continued use of Missout after changes take effect constitutes
            your acceptance of the revised policy.
          </p>
        </Section>
      </div>
    </div>
  )
}
