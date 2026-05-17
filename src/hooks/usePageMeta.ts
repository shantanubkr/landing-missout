import { useEffect } from 'react'

const SITE = 'Missout'

function setHeadMeta(attr: 'name' | 'property', key: string, content: string) {
  const el =
    document.querySelector(`meta[${attr}="${key}"]`) ?? (() => {
      const meta = document.createElement('meta')
      meta.setAttribute(attr, key)
      document.head.appendChild(meta)
      return meta
    })()
  el.setAttribute('content', content)
}

type PageMeta = {
  title: string
  description: string
}

/**
 * Updates document title and key meta tags for the current SPA view.
 * Crawlers that only read initial HTML still use index.html defaults.
 */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`
    document.title = fullTitle
    setHeadMeta('name', 'description', description)
    setHeadMeta('property', 'og:title', fullTitle)
    setHeadMeta('property', 'og:description', description)
  }, [title, description])
}
