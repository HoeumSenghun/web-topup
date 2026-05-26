'use client'

import { Sun, Moon } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'

export default function ThemeToggle({ className = '' }) {
  const { locale, theme, toggleTheme, isThemeSwitching } = useApp()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={isThemeSwitching}
      className={`theme-toggle relative h-10 w-10 overflow-hidden rounded-full border border-border bg-surface-elevated text-text transition hover:border-brand disabled:opacity-70 ${className}`}
      aria-label={
        theme === 'dark' ? t(locale, 'theme.light') : t(locale, 'theme.dark')
      }
    >
      <span
        className={`theme-toggle-icon absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          theme === 'dark'
            ? 'translate-y-0 rotate-0 scale-100 opacity-100'
            : '-translate-y-full rotate-90 scale-75 opacity-0'
        }`}
        aria-hidden
      >
        <Sun className="h-5 w-5 text-amber-400" />
      </span>
      <span
        className={`theme-toggle-icon absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          theme === 'light'
            ? 'translate-y-0 rotate-0 scale-100 opacity-100'
            : 'translate-y-full -rotate-90 scale-75 opacity-0'
        }`}
        aria-hidden
      >
        <Moon className="h-5 w-5 text-indigo-300" />
      </span>
    </button>
  )
}
