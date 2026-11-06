import { useEffect, useRef, type ReactNode } from 'react'

type CursorRotateProps = {
  /** Resting rotation in degrees. */
  rest?: number
  /** Total travel, in degrees. The star leans span/2 each way from rest. */
  span?: number
  /** 0–1 easing per frame. Lower is lazier. */
  ease?: number
  className?: string
  children: ReactNode
}

/**
 * Leans its child toward the cursor across `span` degrees (default 180: 90 left,
 * 90 right). Maps the pointer's x across the viewport and eases the turn.
 */
export function CursorRotate({
  rest = 0,
  span = 180,
  ease = 0.12,
  className = '',
  children,
}: CursorRotateProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const half = span / 2
    let current = rest
    let target = rest
    let frame = 0

    const tick = () => {
      current += (target - current) * ease
      el.style.transform = `rotate(${current}deg)`
      frame = Math.abs(target - current) > 0.08 ? requestAnimationFrame(tick) : 0
    }
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const t = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1))
      target = rest + t * half
      kick()
    }
    const onLeave = () => {
      target = rest
      kick()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    el.style.transform = `rotate(${rest}deg)`

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [rest, span, ease])

  return (
    <div ref={ref} className={className} style={{ transform: `rotate(${rest}deg)`, willChange: 'transform' }}>
      {children}
    </div>
  )
}
