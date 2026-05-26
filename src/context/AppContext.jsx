'use client'

import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import { setTheme as persistTheme } from '@/actions/preferences'
import { searchGames, hasSearchQuery } from '@/services/search.service'

const THEME_TRANSITION_MS = 420

const AppContext = createContext(null)

function applyThemeToDom(theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.style.colorScheme = theme
}

function runThemeTransition(theme) {
  const root = document.documentElement
  root.classList.add('theme-transition')
  applyThemeToDom(theme)
  window.setTimeout(() => {
    root.classList.remove('theme-transition')
  }, THEME_TRANSITION_MS)
}

export function AppProvider({ children, initialLocale, initialTheme, games = [] }) {
  const [theme, setTheme] = useState(initialTheme)
  const [isThemeSwitching, setIsThemeSwitching] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    applyThemeToDom(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setIsThemeSwitching(true)
    setTheme(next)
    runThemeTransition(next)
    persistTheme(next).finally(() => {
      setIsThemeSwitching(false)
    })
  }, [theme])

  const filteredGames = useMemo(
    () => searchGames(games, searchQuery),
    [games, searchQuery]
  )

  const isSearchActive = hasSearchQuery(searchQuery)

  return (
    <AppContext.Provider
      value={{
        locale: initialLocale,
        theme,
        toggleTheme,
        isThemeSwitching,
        searchQuery,
        setSearchQuery,
        filteredGames,
        isSearchActive,
        games,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
