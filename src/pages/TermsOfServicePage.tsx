import { usePageMeta } from '../hooks/usePageMeta'

const LAST_UPDATED = 'May 19, 2026'

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

export function TermsOfServicePage() {
  usePageMeta({
    title: 'Terms of Service',
    description:
      'Read the Terms of Service for Missout — the rules and guidelines that govern your use of our college event discovery and management platform.',
  })

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] bg-[#FAFAFA] px-4 py-12 text-center sm:py-16">
        <p className="font-sans text-sm font-medium tracking-normal text-[#F92C99] sm:text-base">
          Legal
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold leading-none tracking-tight text-[#1A1A1A] sm:mt-3 sm:text-4xl md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-3 font-sans text-sm text-[#8A8A8A] sm:text-base">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-10 font-sans text-sm leading-relaxed text-[#5A5A5A] sm:text-base">
          These Terms of Service ("Terms") govern your access to and use of{' '}
          <span className="font-medium text-[#1A1A1A]">findus.missout.in</span> and all related
          products and services operated by Missout ("we", "us", or "our"), including the Backnd
          event-management suite. Please read them carefully. By creating an account or using any
          part of the platform, you agree to be bound by these Terms. If you do not agree, do not
          use Missout.
        </p>

        <Section title="1. Eligibility">
          <p>
            You must be at least 13 years old to use Missout. If you are under 18, you represent
            that you have your parent or guardian's permission to use the platform. By using Missout
            you represent and warrant that you meet these requirements.
          </p>
          <p>
            Access to certain organiser features (Backnd) may require additional verification of
            your college affiliation.
          </p>
        </Section>

        <Section title="2. Your Account">
          <p>
            You are responsible for maintaining the confidentiality of your login credentials and
            for all activity that occurs under your account. Notify us immediately at{' '}
            <a
              href="mailto:hello@missout.in"
              className="font-medium text-[#F92C99] underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              hello@missout.in
            </a>{' '}
            if you suspect any unauthorised use.
          </p>
          <p>
            You agree to provide accurate, current, and complete information when registering and
            to keep that information up to date. We reserve the right to suspend or terminate
            accounts that contain false information.
          </p>
        </Section>

        <Section title="3. Acceptable Use">
          <p>You agree not to use Missout to:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li>Post false, misleading, or fraudulent event listings.</li>
            <li>Harass, threaten, or abuse other users or organisers.</li>
            <li>
              Upload or distribute viruses, malware, or any code designed to disrupt the platform.
            </li>
            <li>
              Scrape, crawl, or systematically extract data without our prior written permission.
            </li>
            <li>
              Impersonate any person, college, or organisation, or misrepresent your affiliation.
            </li>
            <li>
              Use the platform for any purpose that is illegal under applicable Indian law or
              international law.
            </li>
            <li>
              Attempt to gain unauthorised access to other user accounts or our infrastructure.
            </li>
          </ul>
          <p>
            We reserve the right to remove any content and suspend any account that violates these
            rules, with or without notice.
          </p>
        </Section>

        <Section title="4. Event Listings & Organiser Responsibilities">
          <p>
            Organisers who publish events on Missout are solely responsible for the accuracy,
            legality, and fulfilment of those events. By submitting an event you represent that:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>You have the authority to host or promote the event.</li>
            <li>All event details (date, venue, ticket price, eligibility) are accurate.</li>
            <li>
              The event complies with your institution's rules and all applicable laws and permits.
            </li>
          </ul>
          <p>
            Missout acts as a discovery and management platform only. We are not a party to any
            agreement between an organiser and attendees, and we are not liable for cancelled,
            postponed, or misrepresented events.
          </p>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            <span className="font-medium text-[#1A1A1A]">Our content.</span> The Missout name,
            logo, product designs, and all original content on the platform are owned by us and
            protected by copyright, trademark, and other intellectual-property laws. You may not
            reproduce, distribute, or create derivative works without our express written permission.
          </p>
          <p>
            <span className="font-medium text-[#1A1A1A]">Your content.</span> You retain ownership
            of any content you submit (event descriptions, images, etc.). By submitting content you
            grant us a worldwide, royalty-free, non-exclusive licence to host, display, and
            distribute that content solely to operate and promote the platform. You can revoke this
            licence by deleting the content.
          </p>
        </Section>

        <Section title="6. Payments & Fees">
          <p>
            Certain features — such as paid ticket processing through Backnd — may involve fees.
            All applicable fees will be disclosed to you before any charge is made. Payments are
            processed by third-party payment providers; their terms and privacy policies apply to
            payment transactions.
          </p>
          <p>
            All fees are in Indian Rupees (INR) unless stated otherwise. Taxes (including GST) are
            the responsibility of the organiser as applicable.
          </p>
        </Section>

        <Section title="7. Disclaimers">
          <p>
            Missout is provided "as is" and "as available" without warranties of any kind, express
            or implied, including but not limited to warranties of merchantability, fitness for a
            particular purpose, or non-infringement. We do not guarantee that the platform will be
            uninterrupted, error-free, or free of harmful components.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            To the fullest extent permitted by applicable law, Missout and its directors, employees,
            and affiliates shall not be liable for any indirect, incidental, special, consequential,
            or punitive damages arising from your use of or inability to use the platform, even if
            we have been advised of the possibility of such damages.
          </p>
          <p>
            Our total aggregate liability to you for any claim arising out of these Terms or your
            use of Missout shall not exceed the greater of ₹500 or the amount you paid us in the
            three months preceding the claim.
          </p>
        </Section>

        <Section title="9. Indemnification">
          <p>
            You agree to indemnify and hold harmless Missout and its affiliates from any claims,
            losses, liabilities, damages, costs, and expenses (including reasonable legal fees)
            arising out of your use of the platform, your content, your events, or your violation
            of these Terms.
          </p>
        </Section>

        <Section title="10. Third-Party Links & Services">
          <p>
            The platform may contain links to third-party websites or integrate with third-party
            services (e.g., payment gateways, social platforms). We are not responsible for the
            content, privacy practices, or terms of those third parties. Accessing them is at your
            own risk.
          </p>
        </Section>

        <Section title="11. Termination">
          <p>
            You may stop using Missout and delete your account at any time. We may suspend or
            terminate your access at any time for any reason, including violation of these Terms,
            with or without notice.
          </p>
          <p>
            Upon termination, Sections 5, 7, 8, 9, and 13 survive.
          </p>
        </Section>

        <Section title="12. Changes to These Terms">
          <p>
            We may update these Terms from time to time. We will notify you of material changes by
            updating the "Last updated" date and, where appropriate, by email or in-app notice.
            Continued use of Missout after the effective date constitutes acceptance of the revised
            Terms.
          </p>
        </Section>

        <Section title="13. Governing Law & Disputes">
          <p>
            These Terms are governed by and construed in accordance with the laws of India. Any
            disputes arising under or in connection with these Terms shall be subject to the
            exclusive jurisdiction of the courts located in Pune, Maharashtra, India.
          </p>
        </Section>

        <Section title="14. Contact Us">
          <p>
            Questions about these Terms? Get in touch:
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
      </div>
    </div>
  )
}
