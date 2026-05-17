import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function ScrollReveal({
  children,
  className,
  style,
  delayMs = 0,
  ...rest
}: React.ComponentPropsWithoutRef<'div'> & { delayMs?: number }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  /** When reduced motion is on, stays false but `revealed` still becomes true via `prefersReducedMotion || intersected`. */
  const [intersected, setIntersected] = useState(false)

  const revealed = prefersReducedMotion || intersected

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const ok = entries.some((e) => e.isIntersecting)
        if (ok) {
          setIntersected(true)
          io.disconnect()
        }
      },
      { root: null, rootMargin: '0px 0px -14% 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [prefersReducedMotion])

  const mergedStyle: CSSProperties = {
    ...(typeof style === 'object' && style ? style : {}),
    transitionDelay:
      revealed && !prefersReducedMotion && delayMs > 0
        ? `${delayMs}ms`
        : undefined,
  }

  return (
    <div
      ref={ref}
      {...rest}
      style={mergedStyle}
      className={cn(
        'motion-safe:transition-[opacity,transform]',
        'motion-safe:duration-[700ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]',
        'motion-reduce:transition-none',
        revealed
          ? 'translate-y-0 opacity-100'
          : 'translate-y-[1.125rem] opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
