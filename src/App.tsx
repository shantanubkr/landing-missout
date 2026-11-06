import { Analytics } from '@vercel/analytics/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useHashScroll } from './hooks/useHashScroll'
import { HomePage } from './pages/HomePage'
import { AboutPage, ContactPage, DevelopersPage, NotFoundPage } from './pages/site/MarketingPages'
import { PrivacyPage } from './pages/site/PrivacyPage'
import { BackstageProductPage, FeaturesPage, FeatureStoryPage, StageProductPage } from './pages/site/ProductPages'
import { TermsOfServicePage } from './pages/site/TermsOfServicePage'

export default function App() {
  useHashScroll()
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Navigate to="/products/backstage" replace />} />
        <Route path="/products/backstage" element={<BackstageProductPage />} />
        <Route path="/products/stage" element={<StageProductPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/features/:featureId" element={<FeatureStoryPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/demo" element={<Navigate to="/contact" replace />} />

        <Route path="/stage" element={<Navigate to="/products/stage" replace />} />
        <Route path="/product" element={<Navigate to="/products/backstage" replace />} />
        <Route path="/product/backstage" element={<Navigate to="/products/backstage" replace />} />
        <Route path="/product/stage" element={<Navigate to="/products/stage" replace />} />

        <Route path="/features/events" element={<Navigate to="/features/build-publish" replace />} />
        <Route
          path="/features/registrations-contingents"
          element={<Navigate to="/features/build-publish" replace />}
        />
        <Route path="/features/check-in" element={<Navigate to="/features/run-check-ins" replace />} />
        <Route path="/features/team-access" element={<Navigate to="/features/manage-committees" replace />} />
        <Route path="/features/updates-media" element={<Navigate to="/features/send-updates" replace />} />
        <Route path="/features/money-proof" element={<Navigate to="/features/money-proof" replace />} />
        <Route path="/events" element={<Navigate to="/features/build-publish" replace />} />
        <Route path="/registrations" element={<Navigate to="/features/build-publish" replace />} />
        <Route path="/check-in" element={<Navigate to="/features/run-check-ins" replace />} />
        <Route path="/team-access" element={<Navigate to="/features/manage-committees" replace />} />
        <Route path="/updates-media" element={<Navigate to="/features/send-updates" replace />} />
        <Route path="/money-stalls-proof" element={<Navigate to="/features/money-proof" replace />} />

        <Route path="/partners" element={<Navigate to="/about" replace />} />
        <Route path="/team" element={<Navigate to="/about" replace />} />
        <Route path="/dev/findus-ui" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
    </>
  )
}
