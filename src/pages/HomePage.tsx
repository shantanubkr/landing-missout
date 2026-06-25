import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { HeroSection } from '../components/hero'
import { HomeProductSection } from '../components/product'
import { PartnerFestsSection } from '../components/partner-fests'
import { ContactSection } from '../components/contact'
import { FaqSection } from '../components/faq'

/** Re-enable when partner fests are ready to show on the homepage. */
const SHOW_PARTNER_FESTS_SECTION = true

export function HomePage() {
  const { hash } = useLocation()

  usePageMeta({
    title: 'Home',
    description:
      'Discover and manage campus events in one place. Missout helps students and organisers stay aligned, so nobody misses what matters.',
  })

  useLayoutEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <div>
      <HeroSection />

      <HomeProductSection />

      {SHOW_PARTNER_FESTS_SECTION ? <PartnerFestsSection /> : null}
      <FaqSection />
      <ContactSection />
    </div>
  )
}
