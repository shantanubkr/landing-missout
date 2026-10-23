import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { FU_CONTAINER_CLASS, type FuContainerWidth } from '../../lib/design/findus'

export type FuContainerProps = {
  /** Desktop ~1280 / phone ~390 gutter applied. Default max 1160px. */
  width?: FuContainerWidth
  className?: string
  children?: ReactNode
}

/**
 * Centers content with horizontal gutter.
 * Desktop: 24px gutter · Phone: 16px gutter.
 */
export function FuContainer({ width = 'default', className, children }: FuContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6', FU_CONTAINER_CLASS[width], className)}>
      {children}
    </div>
  )
}
