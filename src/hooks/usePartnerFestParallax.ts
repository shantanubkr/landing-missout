import { useEffect } from 'react'
import type { RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Pink stripe — drifts with scroll. */
const GRAPHIC_PARALLAX_Y_MAX = 52

/** CTA copy — counter-drifts vs graphic for layered depth. */
const TEXT_PARALLAX_Y_MAX = -36

/** Card row counter-drift vs stripe (pixels at full progress ±1). */
const CARDS_PARALLAX_Y_MAX = -22

function clampProgress(n: number) {
  return Math.max(-1, Math.min(1, n))
}

function clearTransform(el: HTMLElement | null) {
  if (!el) return
  el.style.willChange = ''
  el.style.removeProperty('transform')
}

function applyParallaxY(el: HTMLElement | null, progress: number, peakPx: number, hide: boolean) {
  if (!el) return
  if (hide) {
    clearTransform(el)
    return
  }
  const ty = progress * peakPx
  el.style.willChange = 'transform'
  el.style.transform = `translate3d(0, ${ty}px, 0)`
}

/**
 * Section-scrolled parallax: CTA graphic and copy drift on separate layers; optional card strip drifts opposite.
 * Applies direct `transform` — keep layout offsets (Tailwind `-translate-*`) on a parent.
 */
export function usePartnerFestParallax(
  scopeRef: RefObject<HTMLElement | null>,
  graphicRef: RefObject<HTMLElement | null>,
  textRef: RefObject<HTMLElement | null>,
  cardsStripRef?: RefObject<HTMLElement | null>,
) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const graphicUnmount = graphicRef.current
    const textUnmount = textRef.current
    const cardsUnmount = cardsStripRef?.current ?? null

    if (reduced) {
      clearTransform(graphicUnmount)
      clearTransform(textUnmount)
      clearTransform(cardsUnmount)
      return undefined
    }

    let raf = 0

    const flush = () => {
      raf = 0
      const scope = scopeRef.current
      if (!scope) return

      const rect = scope.getBoundingClientRect()
      const vh = window.innerHeight
      const midY = rect.top + rect.height / 2
      const range = rect.height + vh * 0.82
      const progress = clampProgress((vh / 2 - midY) / Math.max(range * 0.34, 1))

      const hideParallax = rect.bottom < -120 || rect.top > vh + 160

      applyParallaxY(graphicRef.current, progress, GRAPHIC_PARALLAX_Y_MAX, hideParallax)
      applyParallaxY(textRef.current, progress, TEXT_PARALLAX_Y_MAX, hideParallax)
      applyParallaxY(cardsStripRef?.current ?? null, progress, CARDS_PARALLAX_Y_MAX, hideParallax)
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

      clearTransform(graphicUnmount)
      clearTransform(textUnmount)
      clearTransform(cardsUnmount)
    }
  }, [reduced, scopeRef, graphicRef, textRef, cardsStripRef])
}
