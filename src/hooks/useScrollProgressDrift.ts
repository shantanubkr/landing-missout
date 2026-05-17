import { useEffect } from 'react'
import type { RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function clampProgress(n: number) {
  return Math.max(-1, Math.min(1, n))
}

/**
 * Subtle vertical drift vs scroll while `scopeRef` is near the viewport — same
 * progress model as partner-fest CTA / FAQ outline decor.
 */
export function useScrollProgressDrift<E extends HTMLElement = HTMLElement>(
  scopeRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<E | null>,
  peakPx: number,
) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const elUnmount = targetRef.current

    if (reduced) {
      if (elUnmount) elUnmount.style.willChange = ''
      if (elUnmount) elUnmount.style.removeProperty('transform')
      return undefined
    }

    let raf = 0

    const flush = () => {
      raf = 0
      const scope = scopeRef.current
      const target = targetRef.current
      if (!scope || !target) return

      const rect = scope.getBoundingClientRect()
      const vh = window.innerHeight
      const midY = rect.top + rect.height / 2
      const range = rect.height + vh * 0.82
      const progress = clampProgress((vh / 2 - midY) / Math.max(range * 0.34, 1))

      if (rect.bottom < -120 || rect.top > vh + 160) {
        target.style.willChange = ''
        target.style.removeProperty('transform')
        return
      }

      const ty = progress * peakPx
      target.style.willChange = 'transform'
      target.style.transform = `translate3d(0, ${ty}px, 0)`
    }

    const schedule = () => {
      if (raf !== 0) return
      raf = requestAnimationFrame(flush)
    }

    flush()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(raf)
      if (elUnmount) {
        elUnmount.style.willChange = ''
        elUnmount.style.removeProperty('transform')
      }
    }
  }, [reduced, scopeRef, targetRef, peakPx])
}
