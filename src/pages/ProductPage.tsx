import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { ContactSection } from '../components/contact'
import {
  ProductDiscoverBentoSection,
  ProductHeroSection,
  ProductManageBentoSection,
} from '../components/product'

export function ProductPage() {
  const { hash } = useLocation()

  usePageMeta({
    title: 'Product',
    description:
      'See how Missout ties discovery and operations together—so teams can publish, manage registrations, and keep attendees in the loop.',
  })

  useLayoutEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <div>
      <ProductHeroSection />
      <ProductManageBentoSection />
      <ProductDiscoverBentoSection />
      <ContactSection accent="product" />
    </div>
  )
}
