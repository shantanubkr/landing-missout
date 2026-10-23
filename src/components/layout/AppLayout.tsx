import { Outlet } from 'react-router-dom'
import { FuFooter, FuPageHeader } from '../findus'

export function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-[var(--fu-canvas)]">
      <FuPageHeader />
      <main className="flex-1 overflow-x-clip">
        <Outlet />
      </main>
      <FuFooter tone="surface" />
    </div>
  )
}
