import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const DEFAULT_OFFSET = 112

/** Smooth-scroll to `location.hash` target with sticky-header offset. */
export function useHashScroll(pathname: string, offset = DEFAULT_OFFSET) {
  const { hash, pathname: currentPath } = useLocation()

  useLayoutEffect(() => {
    if (currentPath !== pathname || !hash) return

    const id = hash.slice(1)
    const target = document.getElementById(id)
    if (!target) return

    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }, [currentPath, hash, offset, pathname])
}

export function scrollToSection(sectionId: string, offset = DEFAULT_OFFSET) {
  const target = document.getElementById(sectionId)
  if (!target) return false

  const top = target.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
  return true
}
