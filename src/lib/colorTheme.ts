export type ColorTheme = 'light' | 'dark'

export const COLOR_THEME_STORAGE_KEY = 'missout-color-theme'

export function getSystemColorTheme(): ColorTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getStoredColorTheme(): ColorTheme | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(COLOR_THEME_STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

export function getInitialColorTheme(): ColorTheme {
  return getStoredColorTheme() ?? getSystemColorTheme()
}

export function applyColorTheme(theme: ColorTheme) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

export function persistColorTheme(theme: ColorTheme) {
  if (typeof window === 'undefined') return
  localStorage.setItem(COLOR_THEME_STORAGE_KEY, theme)
}
