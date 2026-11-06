import type { ReactNode } from 'react'
import { FigmaFooter } from './figma/FigmaFooter'
import { SiteNav } from './site/SiteNav'

export function FigmaSiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen w-full bg-white pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px))]">
        {children}
      </main>
      <FigmaFooter />
    </>
  )
}
