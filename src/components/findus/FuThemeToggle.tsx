import { MissoutIcon } from '../icons'
import { useColorTheme } from './ColorThemeProvider'
import { cn } from '../../lib/cn'
import { fuFocusRing } from '../../lib/design/findusMotion'

export type FuThemeToggleProps = {
  className?: string
}

export function FuThemeToggle({ className }: FuThemeToggleProps) {
  const { theme, toggleTheme } = useColorTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={cn(
        'inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] text-[var(--fu-ink-secondary)] transition-colors hover:border-[var(--fu-card-border-hover)] hover:bg-[var(--fu-surface)] hover:text-[var(--fu-ink)]',
        fuFocusRing,
        className,
      )}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      <MissoutIcon name={isDark ? 'sun' : 'moon'} size={18} className="text-current" />
    </button>
  )
}
