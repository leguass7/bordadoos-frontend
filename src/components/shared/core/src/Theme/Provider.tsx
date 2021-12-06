import React, { useState, useMemo } from 'react'

import { ThemeContext } from './ThemeContext'
import { appThemeDark, appThemeLigth } from './themes'
import type { MatchingRules, ThemeProviderProps } from './types'

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme: themeConfig }) => {
  const [isDark, setIsDark] = useState(false)

  const localTheme = useMemo(() => {
    if (themeConfig) return themeConfig
    return isDark ? appThemeDark : appThemeLigth
  }, [isDark, themeConfig])

  const [theme, setTheme] = useState(localTheme)

  // @ts-ignore
  const matchRules: MatchingRules = useMemo(
    () => [
      ['primary', 'secondary', 'contrast', 'black', theme.colors.white],
      ['white', theme.colors.primary],
      ['border', theme.colors.black]
    ],
    [theme]
  )

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, theme: localTheme, setTheme, matchRules }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
