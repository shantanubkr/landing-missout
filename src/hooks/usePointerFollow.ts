import { useEffect, useRef, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export type PointerFollowOffset = {
  /** Pixel offset for DOM transforms. */
  x: number
  y: number
  /** Normalized −1…1 relative to element center. */
  nx: number
  ny: number
  active: boolean
}

/**
 * Pointer position relative to an element center, mapped to ±maxOffset px.
 * Fine pointer only; disabled when reduced motion is preferred.
 */
export function usePointerFollow<T extends HTMLElement>(
  enabled = true,
  maxOffset = 6,
): [RefObject<T | null>, PointerFollowOffset] {
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [offset, setOffset] = useState<PointerFollowOffset>({
    x: 0,
    y: 0,
    nx: 0,
    ny: 0,
    active: false,
  })
  const normRef = useRef({ x: 0, y: 0 })
  const activeRef = useRef(false)

  useEffect(() => {
    if (!enabled || prefersReducedMotion) {
      setOffset({ x: 0, y: 0, nx: 0, ny: 0, active: false })
      return
    }

    const el = ref.current
    if (!el) return

    const mqFine = window.matchMedia('(pointer: fine)')

    function applyOffset() {
      setOffset({
        x: normRef.current.x * maxOffset,
        y: normRef.current.y * maxOffset,
        nx: normRef.current.x,
        ny: normRef.current.y,
        active: activeRef.current && mqFine.matches,
      })
    }

    function reset() {
      normRef.current = { x: 0, y: 0 }
      activeRef.current = false
      applyOffset()
    }

    function onPointerEnter() {
      activeRef.current = true
    }

    function onPointerMove(event: PointerEvent) {
      if (!mqFine.matches || !el) return
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return

      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const nx = (event.clientX - cx) / (rect.width / 2)
      const ny = (event.clientY - cy) / (rect.height / 2)

      normRef.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      }
      activeRef.current = true
      applyOffset()
    }

    function onFineChange() {
      if (!mqFine.matches) reset()
    }

    el.addEventListener('pointerenter', onPointerEnter)
    el.addEventListener('pointermove', onPointerMove, { passive: true })
    el.addEventListener('pointerleave', reset)
    mqFine.addEventListener('change', onFineChange)

    return () => {
      el.removeEventListener('pointerenter', onPointerEnter)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', reset)
      mqFine.removeEventListener('change', onFineChange)
    }
  }, [enabled, maxOffset, prefersReducedMotion])

  return [ref, offset]
}
