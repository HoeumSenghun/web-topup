'use client'

import { AppProvider } from '@/context/AppContext'

export default function ClientProviders({ children, initialLocale, initialTheme, games }) {
  return (
    <AppProvider
      initialLocale={initialLocale}
      initialTheme={initialTheme}
      games={games}
    >
      {children}
    </AppProvider>
  )
}
