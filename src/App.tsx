import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/HomePage'

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ProductPage = lazy(() =>
  import('./pages/ProductPage').then((m) => ({ default: m.ProductPage })),
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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product" element={<ProductPage />} />
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
