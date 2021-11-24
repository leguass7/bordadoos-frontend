import React, { useState, useMemo } from 'react'

import { ThemeContext } from './ThemeContext'
import { appThemeDark, appThemeLigth } from './themes'
import type { MatchingRules, ThemeProviderProps } from './types'

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  const theme = useMemo(() => {
    return isDark ? appThemeDark : appThemeLigth
  }, [isDark])

  // @ts-ignore
  const matchRules: MatchingRules = useMemo(
    () => [
      ['primary', 'secondary', 'contrast', 'black', theme.colors.white],
      ['white', theme.colors.black],
      ['border', theme.colors.black]
    ],
    [theme]
  )

  return <ThemeContext.Provider value={{ isDark, setIsDark, theme, matchRules }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
