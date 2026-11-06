import { Link } from 'react-router-dom'
import { ContactDemoFlow, ContactDirectSection } from '../../components/contact/ContactDemoFlow'
import { FigmaSiteShell } from '../../components/FigmaSiteShell'
import { FigmaPageChrome } from '../../components/figma/FigmaPageChrome'
import {
  FigmaBody,
  FigmaButtonPrimary,
  FigmaButtonSecondary,
  FigmaH1,
  FigmaSection,
} from '../../components/figma/FigmaPrimitives'
import { BOOK_DEMO_MAILTO, BOOK_DEMO_WHATSAPP } from '../../lib/links'
import { REQUEST_DEMO_LABEL } from '../../lib/siteRoutes'

export { AboutPage } from './AboutPage'

export { DevelopersPage } from './DevelopersPage'

export function ContactPage() {
  return (
    <FigmaSiteShell>
      <ContactDemoFlow />
      <ContactDirectSection />
    </FigmaSiteShell>
  )
}

export function RequestDemoPage() {
  return (
    <FigmaSiteShell>
      <FigmaPageChrome>
        <FigmaSection className="site-cell py-16 text-center sm:py-20">
          <FigmaH1>Request a demo</FigmaH1>
          <FigmaBody className="mx-auto mt-6 max-w-2xl">
            See Backstage and Stage with your committee&apos;s workflow.
          </FigmaBody>
          <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            <FigmaButtonSecondary href={BOOK_DEMO_MAILTO} className="!h-9 !min-w-[104px] !px-4 !text-[14px] sm:!h-10 sm:!min-w-[120px] sm:!text-[15px]">
              {REQUEST_DEMO_LABEL}
            </FigmaButtonSecondary>
            <FigmaButtonPrimary href={BOOK_DEMO_WHATSAPP} className="!h-9 !min-w-[104px] !px-4 !text-[14px] sm:!h-10 sm:!min-w-[120px] sm:!text-[15px]">
              WhatsApp us
            </FigmaButtonPrimary>
          </div>
        </FigmaSection>
      </FigmaPageChrome>
    </FigmaSiteShell>
  )
}

export function NotFoundPage() {
  return (
    <FigmaSiteShell>
      <FigmaPageChrome>
        <FigmaSection className="site-cell py-20 text-center sm:py-28">
          <FigmaH1 size="xl">404</FigmaH1>
          <FigmaBody className="mt-4">Page not found.</FigmaBody>
          <Link to="/" className="font-display mt-8 inline-block text-[24px] text-black no-underline transition-colors duration-200 hover:text-brand-pink">
            Back home
          </Link>
        </FigmaSection>
      </FigmaPageChrome>
    </FigmaSiteShell>
  )
}
