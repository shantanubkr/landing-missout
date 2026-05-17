import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { HeroSection } from '../components/hero'
import { PartnerFestsSection } from '../components/partner-fests'
import { ContactSection } from '../components/contact'
import { FaqSection } from '../components/faq'
import { PeopleInvolvedSection } from '../components/people-involved'
import { ValuePropositionsSection } from '../components/value-propositions'

export function HomePage() {
  const { hash } = useLocation()

  usePageMeta({
    title: 'Home',
    description:
      'Discover and manage campus events in one place. Missout helps students and organisers stay aligned—so nobody misses what matters.',
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

      <ValuePropositionsSection />

      <PartnerFestsSection />
      <PeopleInvolvedSection />
      <FaqSection />
      <ContactSection />
    </div>
  )
}
