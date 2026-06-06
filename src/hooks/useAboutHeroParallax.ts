import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Same constants as `useHeroParallax` — identical visual depth on identical elements. */
const MOBILE_PARALLAX = 0.48

const SCROLL_GRID = 0.066
const SCROLL_IMG = 0.138

const POINTER_MX_GRID = 5
const POINTER_MY_GRID = 3.2
const POINTER_MX_IMG = 11
const POINTER_MY_IMG = 7.2

function resetTransform(el: HTMLElement | null) {
  if (!el) return
  el.style.willChange = ''
  el.style.transform = ''
}

export function useAboutHeroParallax() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const gridLayerRef = useRef<HTMLDivElement | null>(null)
  const imageLayerRef = useRef<HTMLDivElement | null>(null)

  const heroVisibleRef = useRef(false)
  const isMobileRef = useRef(false)
  const finePointerRef = useRef(false)
  const pointerNormRef = useRef({ x: 0, y: 0 })
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const gridUnmount = gridLayerRef.current
    const imgUnmount = imageLayerRef.current

    if (prefersReducedMotion) {
      resetTransform(gridUnmount)
      resetTransform(imgUnmount)
      return
    }

    const mqMob = window.matchMedia('(max-width: 767px)')
    const mqFine = window.matchMedia('(pointer: fine)')
    const syncMedia = () => {
      isMobileRef.current = mqMob.matches
      finePointerRef.current = mqFine.matches
    }
    syncMedia()
    mqMob.addEventListener('change', syncMedia)
    mqFine.addEventListener('change', syncMedia)

    const schedule = () => {
      if (rafIdRef.current != null) return
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null
        const grid = gridLayerRef.current
        const img = imageLayerRef.current
        const sec = sectionRef.current

        if (!sec || !grid || !img) {
          resetTransform(grid)
          resetTransform(img)
          return
        }

        if (!heroVisibleRef.current) {
          resetTransform(grid)
          resetTransform(img)
          return
        }

        const scroll = window.scrollY
        const m = isMobileRef.current ? MOBILE_PARALLAX : 1
        const dm =
          heroVisibleRef.current && finePointerRef.current && !isMobileRef.current ? 1 : 0

        const { x: nx, y: ny } = pointerNormRef.current

        grid.style.willChange = 'transform'
        grid.style.transform = `translate3d(${nx * POINTER_MX_GRID * dm}px, ${-scroll * SCROLL_GRID * m + ny * POINTER_MY_GRID * dm}px, 0)`

        img.style.willChange = 'transform'
        img.style.transform = `translate3d(${nx * POINTER_MX_IMG * dm}px, ${-scroll * SCROLL_IMG * m + ny * POINTER_MY_IMG * dm}px, 0)`
      })
    }

    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(
      (entries) => {
        heroVisibleRef.current = entries.some((e) => e.isIntersecting)
        if (!heroVisibleRef.current) {
          resetTransform(gridLayerRef.current)
          resetTransform(imageLayerRef.current)
        }
        schedule()
      },
      { root: null, rootMargin: '64px', threshold: [0, 0.01] },
    )
    io.observe(section)
    {
      const r = section.getBoundingClientRect()
      heroVisibleRef.current = r.bottom > 0 && r.top < window.innerHeight
    }
    schedule()

    const onScroll = () => schedule()
    window.addEventListener('scroll', onScroll, { passive: true })

    const onPointerMove = (e: PointerEvent) => {
      const sec = sectionRef.current
      if (!sec) return

      pointerNormRef.current = { x: 0, y: 0 }

      const usePointer =
        heroVisibleRef.current && finePointerRef.current && !isMobileRef.current

      if (!usePointer) {
        schedule()
        return
      }

      const r = sec.getBoundingClientRect()
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom

      const halfW = r.width / 2
      const halfH = r.height / 2

      if (!inside || halfW < 8 || halfH < 8 || !Number.isFinite(halfW) || !Number.isFinite(halfH)) {
        schedule()
        return
      }

      pointerNormRef.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / halfW)),
        y: Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / halfH)),
      }

      schedule()
    }

    document.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      mqMob.removeEventListener('change', syncMedia)
      mqFine.removeEventListener('change', syncMedia)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointermove', onPointerMove)
      heroVisibleRef.current = false
      resetTransform(gridUnmount)
      resetTransform(imgUnmount)
    }
  }, [prefersReducedMotion])

  return { sectionRef, gridLayerRef, imageLayerRef }
}
