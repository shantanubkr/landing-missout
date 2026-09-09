import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/HomePage'

const EventsPage = lazy(() =>
  import('./pages/EventsPage').then((m) => ({ default: m.EventsPage })),
)
const RegistrationsPage = lazy(() =>
  import('./pages/RegistrationsPage').then((m) => ({ default: m.RegistrationsPage })),
)
const CheckInPage = lazy(() =>
  import('./pages/CheckInPage').then((m) => ({ default: m.CheckInPage })),
)
const TeamAccessPage = lazy(() =>
  import('./pages/TeamAccessPage').then((m) => ({ default: m.TeamAccessPage })),
)
const UpdatesMediaPage = lazy(() =>
  import('./pages/UpdatesMediaPage').then((m) => ({ default: m.UpdatesMediaPage })),
)
const MoneyStallsProofPage = lazy(() =>
  import('./pages/MoneyStallsProofPage').then((m) => ({
    default: m.MoneyStallsProofPage,
  })),
)
const StagePage = lazy(() =>
  import('./pages/StagePage').then((m) => ({ default: m.StagePage })),
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
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

function PageFallback() {
  return <div className="min-h-[40vh] bg-white" aria-hidden />
}

export default function App() {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/registrations" element={<RegistrationsPage />} />
            <Route path="/check-in" element={<CheckInPage />} />
            <Route path="/team-access" element={<TeamAccessPage />} />
            <Route path="/updates-media" element={<UpdatesMediaPage />} />
            <Route path="/money-stalls-proof" element={<MoneyStallsProofPage />} />
            <Route path="/stage" element={<StagePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/product" element={<Navigate to="/events" replace />} />
            <Route path="/product/backstage" element={<Navigate to="/events" replace />} />
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
