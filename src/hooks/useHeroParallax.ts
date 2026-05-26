import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Intensity multiplier for hero depth on narrow viewports (scroll only; mouse ignored). */
const MOBILE_PARALLAX = 0.48

/** Scroll-derived depth (fraction of `window.scrollY`, negative = lags upward). */
const SCROLL_GRID = 0.066
/** Hero background graphic — slightly stronger depth vs grid */
const SCROLL_IMG = 0.138

/** Side product pills (Missout / Backstage): modest drift + tilt vs scroll */
const PILLS_PARALLAX_Y = 0.048
const PILLS_PARALLAX_X = 0.018
/** Max |rotation| per pill (degrees), scaled by normalized scroll magnitude */
const PILL_ROT_CLAMP = 2.35

/** Max pointer influence (normalized −1…1 × these px). Desktop fine pointer only. */
const POINTER_MX_GRID = 5
const POINTER_MY_GRID = 3.2
const POINTER_MX_IMG = 11
const POINTER_MY_IMG = 7.2

function resetTransform(el: HTMLElement | null) {
  if (!el) return
  el.style.willChange = ''
  el.style.transform = ''
}

function clampDeg(n: number, max: number) {
  return Math.max(-max, Math.min(max, n))
}

export function useHeroParallax() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const gridLayerRef = useRef<HTMLDivElement | null>(null)
  const imageLayerRef = useRef<HTMLDivElement | null>(null)

  /** Parallax wrappers around `<FloatingProductPill>` (desktop + md:hidden row) */
  const missoutPillRef = useRef<HTMLDivElement | null>(null)
  const backstagePillRef = useRef<HTMLDivElement | null>(null)
  const missoutPillMobileRef = useRef<HTMLDivElement | null>(null)
  const backstagePillMobileRef = useRef<HTMLDivElement | null>(null)

  const heroVisibleRef = useRef(false)
  const isMobileRef = useRef(false)
  const finePointerRef = useRef(false)
  const pointerNormRef = useRef({ x: 0, y: 0 })
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const gridUnmount = gridLayerRef.current
    const imgUnmount = imageLayerRef.current
    const pillMuUnmount = missoutPillRef.current
    const pillBkUnmount = backstagePillRef.current
    const pillMuMoUnmount = missoutPillMobileRef.current
    const pillBkMoUnmount = backstagePillMobileRef.current

    if (prefersReducedMotion) {
      resetTransform(gridUnmount)
      resetTransform(imgUnmount)
      resetTransform(pillMuUnmount)
      resetTransform(pillBkUnmount)
      resetTransform(pillMuMoUnmount)
      resetTransform(pillBkMoUnmount)
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
        const pillMu = missoutPillRef.current
        const pillBk = backstagePillRef.current
        const pillMuMo = missoutPillMobileRef.current
        const pillBkMo = backstagePillMobileRef.current
        const sec = sectionRef.current

        const clearAll = () => {
          resetTransform(grid)
          resetTransform(img)
          resetTransform(pillMu)
          resetTransform(pillBk)
          resetTransform(pillMuMo)
          resetTransform(pillBkMo)
        }

        if (!sec || !grid || !img) {
          clearAll()
          return
        }

        if (!heroVisibleRef.current) {
          clearAll()
          return
        }

        const scroll = window.scrollY
        const m = isMobileRef.current ? MOBILE_PARALLAX : 1
        const dm =
          heroVisibleRef.current && finePointerRef.current && !isMobileRef.current
            ? 1
            : 0

        const { x: nx, y: ny } = pointerNormRef.current

        const gxG = nx * POINTER_MX_GRID * dm
        const gyG =
          -scroll * SCROLL_GRID * m + ny * POINTER_MY_GRID * dm

        grid.style.willChange = 'transform'
        grid.style.transform = `translate3d(${gxG}px, ${gyG}px, 0)`

        const gxI = nx * POINTER_MX_IMG * dm
        const gyI = -scroll * SCROLL_IMG * m + ny * POINTER_MY_IMG * dm

        img.style.willChange = 'transform'
        img.style.transform = `translate3d(${gxI}px, ${gyI}px, 0)`

        const pillPx = nx * 2.2 * dm
        const pillPy = ny * 1.6 * dm
        const pyP = -scroll * PILLS_PARALLAX_Y * m + pillPy
        const pxL = -scroll * PILLS_PARALLAX_X * m - pillPx
        const pxR = scroll * PILLS_PARALLAX_X * m + pillPx
        const rotBase = clampDeg(scroll * 0.00345 * m, PILL_ROT_CLAMP)
        const rotL = rotBase
        const rotR = -rotBase

        const applyPill = (
          el: HTMLDivElement | null,
          tx: number,
          ty: number,
          rot: number,
        ) => {
          if (!el) return
          el.style.willChange = 'transform'
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`
        }

        applyPill(pillMu, pxL, pyP, rotL)
        applyPill(pillBk, pxR, pyP, rotR)
        applyPill(pillMuMo, pxL, pyP, rotL)
        applyPill(pillBkMo, pxR, pyP, rotR)
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
          resetTransform(missoutPillRef.current)
          resetTransform(backstagePillRef.current)
          resetTransform(missoutPillMobileRef.current)
          resetTransform(backstagePillMobileRef.current)
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
        heroVisibleRef.current &&
        finePointerRef.current &&
        !isMobileRef.current

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

      if (
        !inside ||
        halfW < 8 ||
        halfH < 8 ||
        !Number.isFinite(halfW) ||
        !Number.isFinite(halfH)
      ) {
        schedule()
        return
      }

      pointerNormRef.current = {
        x: Math.max(
          -1,
          Math.min(1, (e.clientX - (r.left + r.width / 2)) / halfW),
        ),
        y: Math.max(
          -1,
          Math.min(1, (e.clientY - (r.top + r.height / 2)) / halfH),
        ),
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
      resetTransform(pillMuUnmount)
      resetTransform(pillBkUnmount)
      resetTransform(pillMuMoUnmount)
      resetTransform(pillBkMoUnmount)
    }
  }, [prefersReducedMotion])

  return {
    sectionRef,
    gridLayerRef,
    imageLayerRef,
    missoutPillRef,
    backstagePillRef,
    missoutPillMobileRef,
    backstagePillMobileRef,
  }
}
