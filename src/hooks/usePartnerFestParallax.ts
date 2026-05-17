import { useEffect } from 'react'
import type { RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Pink stripe — moves farther vs scroll than the cards (depth cue). */
const GRAPHIC_PARALLAX_Y_MAX = 44

/** Card row counter-drift vs stripe (pixels at full progress ±1). */
const CARDS_PARALLAX_Y_MAX = -26

function clampProgress(n: number) {
  return Math.max(-1, Math.min(1, n))
}

function clearTransform(el: HTMLElement | null) {
  if (!el) return
  el.style.willChange = ''
  el.style.removeProperty('transform')
}

/**
 * Section-scrolled parallax: CTA SVG drifts vertically; optional card strip drifts opposite.
 * Applies direct `transform` — keep layout offsets (Tailwind `-translate-*`) on a parent.
 */
export function usePartnerFestParallax(
  scopeRef: RefObject<HTMLElement | null>,
  graphicRef: RefObject<HTMLElement | null>,
  cardsStripRef?: RefObject<HTMLElement | null>,
) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const graphicUnmount = graphicRef.current
    const cardsUnmount = cardsStripRef?.current ?? null

    if (reduced) {
      clearTransform(graphicUnmount)
      clearTransform(cardsUnmount)
      return undefined
    }

    let raf = 0

    const flush = () => {
      raf = 0
      const scope = scopeRef.current
      const graphic = graphicRef.current
      const cards = cardsStripRef?.current ?? null
      if (!scope) return

      const rect = scope.getBoundingClientRect()
      const vh = window.innerHeight
      const midY = rect.top + rect.height / 2
      const range = rect.height + vh * 0.82
      const progress = clampProgress((vh / 2 - midY) / Math.max(range * 0.34, 1))

      const hideParallax =
        rect.bottom < -120 || rect.top > vh + 160

      if (graphic) {
        if (hideParallax) clearTransform(graphic)
        else {
          const gy = progress * GRAPHIC_PARALLAX_Y_MAX
          graphic.style.willChange = 'transform'
          graphic.style.transform = `translate3d(0, ${gy}px, 0)`
        }
      }

      if (cards) {
        if (hideParallax) clearTransform(cards)
        else {
          const cy = progress * CARDS_PARALLAX_Y_MAX
          cards.style.willChange = 'transform'
          cards.style.transform = `translate3d(0, ${cy}px, 0)`
        }
      }
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
      clearTransform(cardsUnmount)
    }
  }, [reduced, scopeRef, graphicRef, cardsStripRef])
}
