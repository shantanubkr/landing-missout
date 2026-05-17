import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const MOBILE_PARALLAX = 0.5

const SCROLL_GRID = 0.056
const SCROLL_IMG = 0.118
const SCROLL_CARD_Y = 0.041
const SCROLL_CARD_X = 0.016

const POINTER_MX_GRID = 4.5
const POINTER_MY_GRID = 2.8
const POINTER_MX_IMG = 9
const POINTER_MY_IMG = 6
const POINTER_MX_CARD = 3.2
const POINTER_MY_CARD = 2.2

function resetTransform(el: HTMLElement | null) {
  if (!el) return
  el.style.willChange = ''
  el.style.transform = ''
}

export function useProductHeroParallax() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const gridLayerRef = useRef<HTMLDivElement | null>(null)
  const imageLayerRef = useRef<HTMLDivElement | null>(null)
  const discoverCardRef = useRef<HTMLDivElement | null>(null)
  const manageCardRef = useRef<HTMLDivElement | null>(null)

  const sectionVisibleRef = useRef(false)
  const isMobileRef = useRef(false)
  const finePointerRef = useRef(false)
  const pointerNormRef = useRef({ x: 0, y: 0 })
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const gridU = gridLayerRef.current
    const imgU = imageLayerRef.current
    const discU = discoverCardRef.current
    const manU = manageCardRef.current

    if (prefersReducedMotion) {
      resetTransform(gridU)
      resetTransform(imgU)
      resetTransform(discU)
      resetTransform(manU)
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
        const disc = discoverCardRef.current
        const man = manageCardRef.current
        const sec = sectionRef.current

        const clearAll = () => {
          resetTransform(grid)
          resetTransform(img)
          resetTransform(disc)
          resetTransform(man)
        }

        if (!sec || !grid || !img || !disc || !man) {
          clearAll()
          return
        }

        if (!sectionVisibleRef.current) {
          clearAll()
          return
        }

        const scroll = window.scrollY
        const m = isMobileRef.current ? MOBILE_PARALLAX : 1
        const dm =
          sectionVisibleRef.current && finePointerRef.current && !isMobileRef.current ? 1 : 0
        const { x: nx, y: ny } = pointerNormRef.current

        const gx = nx * POINTER_MX_GRID * dm
        const gy = -scroll * SCROLL_GRID * m + ny * POINTER_MY_GRID * dm
        grid.style.willChange = 'transform'
        grid.style.transform = `translate3d(${gx}px, ${gy}px, 0)`

        const ix = nx * POINTER_MX_IMG * dm
        const iy = -scroll * SCROLL_IMG * m + ny * POINTER_MY_IMG * dm
        img.style.willChange = 'transform'
        img.style.transform = `translate3d(${ix}px, ${iy}px, 0)`

        const cy = -scroll * SCROLL_CARD_Y * m + ny * POINTER_MY_CARD * dm
        const cxDisc = -scroll * SCROLL_CARD_X * m - nx * POINTER_MX_CARD * dm
        const cxMan = scroll * SCROLL_CARD_X * m + nx * POINTER_MX_CARD * dm

        disc.style.willChange = 'transform'
        disc.style.transform = `translate3d(${cxDisc}px, ${cy}px, 0)`

        man.style.willChange = 'transform'
        man.style.transform = `translate3d(${cxMan}px, ${cy}px, 0)`
      })
    }

    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(
      (entries) => {
        sectionVisibleRef.current = entries.some((e) => e.isIntersecting)
        if (!sectionVisibleRef.current) {
          resetTransform(gridLayerRef.current)
          resetTransform(imageLayerRef.current)
          resetTransform(discoverCardRef.current)
          resetTransform(manageCardRef.current)
        }
        schedule()
      },
      { root: null, rootMargin: '72px', threshold: [0, 0.02] },
    )
    io.observe(section)
    {
      const r = section.getBoundingClientRect()
      sectionVisibleRef.current = r.bottom > 0 && r.top < window.innerHeight
    }
    schedule()

    window.addEventListener('scroll', schedule, { passive: true })

    const onPointerMove = (e: PointerEvent) => {
      const sec = sectionRef.current
      if (!sec) return
      pointerNormRef.current = { x: 0, y: 0 }

      const usePointer =
        sectionVisibleRef.current && finePointerRef.current && !isMobileRef.current

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
      window.removeEventListener('scroll', schedule)
      document.removeEventListener('pointermove', onPointerMove)
      sectionVisibleRef.current = false
      resetTransform(gridU)
      resetTransform(imgU)
      resetTransform(discU)
      resetTransform(manU)
    }
  }, [prefersReducedMotion])

  return {
    sectionRef,
    gridLayerRef,
    imageLayerRef,
    discoverCardRef,
    manageCardRef,
  }
}
