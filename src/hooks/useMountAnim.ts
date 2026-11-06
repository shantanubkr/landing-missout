import { useEffect, useState } from 'react'

/** Keep a node mounted through an exit animation, then unmount. */
export function useMountAnim(open: boolean, exitMs = 150) {
  const [mounted, setMounted] = useState(open)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      setLeaving(false)
      return
    }
    if (!mounted) return
    setLeaving(true)
    const t = window.setTimeout(() => {
      setMounted(false)
      setLeaving(false)
    }, exitMs)
    return () => window.clearTimeout(t)
  }, [open, exitMs, mounted])

  return { mounted, leaving }
}
