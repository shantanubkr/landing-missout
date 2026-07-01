import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { ContactSection } from '../components/contact'
import {
  ProductHeroSection,
  ProductManageBentoSection,
  ProductStageTeaserSection,
} from '../components/product'

export function ProductPage() {
  const { hash } = useLocation()

  usePageMeta({
    title: 'Product',
    description:
      'See how Stage and Backstage work together. Discovery for students, operations for organisers, all under Missout.',
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
      <ProductStageTeaserSection />
      <ProductManageBentoSection />
      <ContactSection accent="product" />
    </div>
  )
}
