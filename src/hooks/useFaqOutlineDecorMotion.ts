import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Vertical drift (px peak) vs scroll progress — outer wrapper leaves inner img
 * positioning ( Tailwind −58% etc. ) intact.
 */
const PARALLAX_Y_PX = 88
/** Lateral drift; left/right use opposite horizontal sign */
const PARALLAX_X_PX = 36

/** Subtle max rotation scaled by normalized progress ±1 */
const ROT_MAX_LEFT = 4.5
const ROT_MAX_RIGHT = -4.5

/** Star drift scale when viewport is phone-sized (`max-width: 767px`, matches Tailwind `md`). */
const PHONE_PARALLAX_SCALE = 0.28

function clampProgress(n: number) {
  return Math.max(-1, Math.min(1, n))
}

export function useFaqOutlineDecorMotion(
  scopeRef: RefObject<HTMLElement | null>,
  leftRef: RefObject<HTMLElement | null>,
  rightRef: RefObject<HTMLElement | null>,
) {
  const reduced = usePrefersReducedMotion()
  const isPhoneRef = useRef(false)

  useEffect(() => {
    const leftUnmount = leftRef.current
    const rightUnmount = rightRef.current

    if (reduced) {
      if (leftUnmount) leftUnmount.style.willChange = ''
      if (rightUnmount) rightUnmount.style.willChange = ''
      if (leftUnmount) leftUnmount.style.removeProperty('transform')
      if (rightUnmount) rightUnmount.style.removeProperty('transform')
      return undefined
    }

    const mqPhone = window.matchMedia('(max-width: 767px)')
    const syncPhone = () => {
      isPhoneRef.current = mqPhone.matches
    }
    syncPhone()
    mqPhone.addEventListener('change', syncPhone)

    let raf = 0

    const flush = () => {
      raf = 0
      const scope = scopeRef.current
      const leftEl = leftRef.current
      const rightEl = rightRef.current
      if (!scope || !leftEl || !rightEl) return

      const rect = scope.getBoundingClientRect()
      const vh = window.innerHeight
      const midY = rect.top + rect.height / 2

      const range = rect.height + vh * 0.85
      const progress = clampProgress((vh / 2 - midY) / Math.max(range * 0.32, 1))

      if (rect.bottom < -80 || rect.top > vh + 120) {
        leftEl.style.willChange = ''
        leftEl.style.removeProperty('transform')
        rightEl.style.willChange = ''
        rightEl.style.removeProperty('transform')
        return
      }

      const scale = isPhoneRef.current ? PHONE_PARALLAX_SCALE : 1
      const ty = progress * PARALLAX_Y_PX * scale
      const txL = progress * PARALLAX_X_PX * scale
      const txR = -progress * PARALLAX_X_PX * scale
      const rotL = progress * ROT_MAX_LEFT * scale
      const rotR = progress * ROT_MAX_RIGHT * scale

      leftEl.style.willChange = 'transform'
      leftEl.style.transform = `translate3d(${txL}px, ${ty}px, 0) rotate(${rotL}deg)`

      rightEl.style.willChange = 'transform'
      rightEl.style.transform = `translate3d(${txR}px, ${ty}px, 0) rotate(${rotR}deg)`
    }

    const schedule = () => {
      if (raf !== 0) return
      raf = requestAnimationFrame(flush)
    }

    const onViewportChange = () => {
      syncPhone()
      schedule()
    }

    flush()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', onViewportChange, { passive: true })

    return () => {
      mqPhone.removeEventListener('change', syncPhone)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', onViewportChange)
      cancelAnimationFrame(raf)

      if (leftUnmount) {
        leftUnmount.style.willChange = ''
        leftUnmount.style.removeProperty('transform')
      }
      if (rightUnmount) {
        rightUnmount.style.willChange = ''
        rightUnmount.style.removeProperty('transform')
      }
    }
  }, [reduced, scopeRef, leftRef, rightRef])
}
