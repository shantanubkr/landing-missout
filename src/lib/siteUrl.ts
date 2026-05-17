/**
 * Optional production origin (no trailing slash), e.g. `https://missout.in`.
 * Set `VITE_SITE_URL` in `.env` / Vercel so canonical and social image URLs match the deployed host.
 */
export function getSiteUrl(): string | undefined {
  const raw = import.meta.env.VITE_SITE_URL
  const s = typeof raw === 'string' ? raw.trim() : ''
  if (!s) return undefined
  return s.replace(/\/+$/, '')
}

export function applySiteMetaBaseUrl(siteUrl: string) {
  const origin = siteUrl.replace(/\/+$/, '')
  const canonicalHref = `${origin}/`

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', canonicalHref)

  function setMetaProperty(property: string, content: string) {
    let el = document.querySelector(`meta[property="${property}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('property', property)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  function setMetaName(name: string, content: string) {
    let el = document.querySelector(`meta[name="${name}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  const ogImage = `${origin}/brand/missout_horizontal.svg`
  setMetaProperty('og:url', canonicalHref)
  setMetaProperty('og:image', ogImage)
  setMetaName('twitter:image', ogImage)
}
