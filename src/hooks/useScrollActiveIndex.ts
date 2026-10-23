import { useEffect, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Highlights the step whose element is closest to the viewport center while scrolling. */
export function useScrollActiveIndex(stepRefs: RefObject<(HTMLElement | null)[]>, count: number) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion || count === 0) return

    const onScroll = () => {
      const centerY = window.innerHeight * 0.45
      let bestIndex = 0
      let bestDistance = Number.POSITIVE_INFINITY

      for (let i = 0; i < count; i += 1) {
        const el = stepRefs.current?.[i]
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const mid = rect.top + rect.height / 2
        const distance = Math.abs(mid - centerY)
        if (distance < bestDistance) {
          bestDistance = distance
          bestIndex = i
        }
      }

      setActive(bestIndex)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [count, prefersReducedMotion, stepRefs])

  return prefersReducedMotion ? 0 : active
}
