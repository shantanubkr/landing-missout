import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/HomePage'
import { featureSectionHref } from './lib/backstageFeaturePages'

const BackstageFeaturesPage = lazy(() =>
  import('./pages/BackstageFeaturesPage').then((m) => ({ default: m.BackstageFeaturesPage })),
)
const StagePage = lazy(() =>
  import('./pages/StagePage').then((m) => ({ default: m.StagePage })),
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const RequestDemoPage = lazy(() =>
  import('./pages/RequestDemoPage').then((m) => ({ default: m.RequestDemoPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const PartnersPage = lazy(() =>
  import('./pages/PartnersPage').then((m) => ({ default: m.PartnersPage })),
)
const DevelopersPage = lazy(() =>
  import('./pages/DevelopersPage').then((m) => ({ default: m.DevelopersPage })),
)
const TeamPage = lazy(() =>
  import('./pages/TeamPage').then((m) => ({ default: m.TeamPage })),
)
const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })),
)
const TermsOfServicePage = lazy(() =>
  import('./pages/TermsOfServicePage').then((m) => ({ default: m.TermsOfServicePage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)
const FindUsKitchenSinkPage = lazy(() =>
  import('./pages/dev/FindUsKitchenSinkPage').then((m) => ({
    default: m.FindUsKitchenSinkPage,
  })),
)

function PageFallback() {
  return <div className="min-h-[40vh] bg-[var(--fu-canvas)]" aria-hidden />
}

function LegacyFeatureRedirect({ sectionId }: { sectionId: string }) {
  return <Navigate to={featureSectionHref(sectionId)} replace />
}

export default function App() {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/dev/findus-ui" element={<FindUsKitchenSinkPage />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<BackstageFeaturesPage />} />
            <Route path="/features/events" element={<LegacyFeatureRedirect sectionId="build-publish" />} />
            <Route
              path="/features/registrations-contingents"
              element={<LegacyFeatureRedirect sectionId="build-publish" />}
            />
            <Route path="/features/check-in" element={<LegacyFeatureRedirect sectionId="run-check-ins" />} />
            <Route
              path="/features/team-access"
              element={<LegacyFeatureRedirect sectionId="manage-committees" />}
            />
            <Route
              path="/features/updates-media"
              element={<LegacyFeatureRedirect sectionId="send-updates" />}
            />
            <Route
              path="/features/money-proof"
              element={<LegacyFeatureRedirect sectionId="money-proof" />}
            />
            <Route path="/events" element={<LegacyFeatureRedirect sectionId="build-publish" />} />
            <Route path="/registrations" element={<LegacyFeatureRedirect sectionId="build-publish" />} />
            <Route path="/check-in" element={<LegacyFeatureRedirect sectionId="run-check-ins" />} />
            <Route path="/team-access" element={<LegacyFeatureRedirect sectionId="manage-committees" />} />
            <Route path="/updates-media" element={<LegacyFeatureRedirect sectionId="send-updates" />} />
            <Route path="/money-stalls-proof" element={<LegacyFeatureRedirect sectionId="money-proof" />} />
            <Route path="/stage" element={<StagePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/demo" element={<RequestDemoPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/product" element={<LegacyFeatureRedirect sectionId="overview" />} />
            <Route path="/product/backstage" element={<LegacyFeatureRedirect sectionId="overview" />} />
            <Route path="/product/stage" element={<Navigate to="/stage" replace />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Analytics />
    </>
  )
}
