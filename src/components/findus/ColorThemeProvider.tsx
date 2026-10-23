import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  applyColorTheme,
  getInitialColorTheme,
  persistColorTheme,
  type ColorTheme,
} from '../../lib/colorTheme'

type ColorThemeContextValue = {
  theme: ColorTheme
  setTheme: (theme: ColorTheme) => void
  toggleTheme: () => void
}

const ColorThemeContext = createContext<ColorThemeContextValue | null>(null)

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ColorTheme>(getInitialColorTheme)

  useEffect(() => {
    applyColorTheme(theme)
    persistColorTheme(theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme: setThemeState,
      toggleTheme: () => setThemeState((current: ColorTheme) => (current === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  )

  return <ColorThemeContext.Provider value={value}>{children}</ColorThemeContext.Provider>
}

export function useColorTheme(): ColorThemeContextValue {
  const context = useContext(ColorThemeContext)
  if (!context) {
    throw new Error('useColorTheme must be used within ColorThemeProvider')
  }
  return context
}
