import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** New pages start at the top. Hash links still land on their `#id`. */
export function useHashScroll() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}
