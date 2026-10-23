import { cn } from '../../lib/cn'
import { iconPaths, iconViewBoxes, type IconName } from './paths'

export type { IconName }

export type MissoutIconProps = {
  name: IconName
  className?: string
  size?: number
  title?: string
}

/** Pixel icon from missout-v2 — tint via `text-*` / `currentColor`. */
export function MissoutIcon({ name, className, size = 20, title }: MissoutIconProps) {
  const viewBox = iconViewBoxes[name as keyof typeof iconViewBoxes] ?? '0 0 24 24'

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: iconPaths[name] }}
    />
  )
}
