import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  AboutAudienceSection,
  AboutHeroSection,
  AboutMissionSection,
  AboutTeamSection,
} from '../components/about'
import { ContactSection } from '../components/contact'
import { usePageMeta } from '../hooks/usePageMeta'

export function AboutPage() {
  const { hash } = useLocation()

  usePageMeta({
    title: 'About',
    description:
      "Learn about Missout's mission, who it's for, and the people building a calmer way to run campus events.",
  })

  useLayoutEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <div>
      <AboutHeroSection />
      <AboutMissionSection />
      <AboutAudienceSection />
      <AboutTeamSection />
      <ContactSection accent="home" />
    </div>
  )
}
