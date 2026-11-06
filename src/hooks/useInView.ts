import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'

type InViewTrigger = 'view' | 'load'

/** Flips to true once: on first intersection ('view') or after fonts are ready ('load'). */
export function useInView<T extends Element>(trigger: InViewTrigger = 'view') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (trigger === 'load') {
      let cancelled = false
      const fonts = document.fonts?.ready ?? Promise.resolve()
      void fonts.then(() => {
        if (!cancelled) requestAnimationFrame(() => setInView(true))
      })
      return () => {
        cancelled = true
      }
    }

    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [trigger])

  return [ref, inView] as const
}

type RevealOpts = {
  delay?: number
  trigger?: InViewTrigger
  y?: number
  scale?: number
  duration?: number
}

/** Class + style + ref for a one-shot fade/slide. Pair with `.anim-fade-up`. */
export function useReveal<T extends Element>(opts: RevealOpts = {}) {
  const { delay = 0, trigger = 'view', y, scale, duration } = opts
  const [ref, inView] = useInView<T>(trigger)
  const className = `anim-fade-up${inView ? ' is-in' : ''}`
  const style = {
    '--d': `${delay}ms`,
    ...(y != null ? { '--reveal-y': `${y}px` } : {}),
    ...(scale != null ? { '--reveal-s': scale } : {}),
    ...(duration != null ? { '--reveal-ms': `${duration}ms` } : {}),
  } as CSSProperties
  return { ref: ref as RefObject<T>, inView, className, style }
}
