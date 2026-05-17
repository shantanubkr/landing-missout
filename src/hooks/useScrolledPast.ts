import { useEffect, useState } from 'react'

/**
 * `true` when `window.scrollY` exceeds `threshold` (e.g. navbar glass state).
 * Client-only: initial render is `false` to match SSR/CSR, then updated on first scroll listener run.
 */
export function useScrolledPast(threshold = 8) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setPast(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return past
}
