import { useSyncExternalStore } from 'react'

const MQ = '(max-width: 767px)'

/** Parallax intensity on phone-sized viewports (`max-width: 767px`, matches Tailwind `md`). */
export const MOBILE_PARALLAX_SCALE = 0.5

function subscribe(cb: () => void) {
  const mq = window.matchMedia(MQ)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function getScale() {
  return window.matchMedia(MQ).matches ? MOBILE_PARALLAX_SCALE : 1
}

export function useMobileParallaxScale(): number {
  return useSyncExternalStore(subscribe, getScale, () => 1)
}
