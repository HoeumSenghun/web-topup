'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Gem } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import { navLinks, siteConfig } from '@/data/mock'
import LanguageFlags from '@/components/layout/LanguageFlags'
import ThemeToggle from '@/components/ui/ThemeToggle'
import NavLink from '@/components/layout/NavLink'
import GameSearch from '@/components/search/GameSearch'

export default function Navbar() {
  const { locale } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 border-b border-border backdrop-blur-md"
      style={{ background: 'var(--nav-bg)' }}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-cyan-400 text-white shadow-lg">
            <Gem className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden font-bold sm:block">
            <span className="gradient-text">{siteConfig.name}</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex lg:gap-2">
          {navLinks.map((link) => (
            <li key={link.key}>
              <NavLink
                href={link.href}
                section={link.section}
                className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-elevated hover:text-text"
              >
                {t(locale, link.key)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <GameSearch
            className="hidden sm:block"
            onNavigate={() => setMobileOpen(false)}
          />

          <LanguageFlags />

          <ThemeToggle />

          <button
            type="button"
            className="rounded-lg border border-border bg-surface-elevated p-2 text-text md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border px-4 py-4 md:hidden animate-fade-in"
        >
          <GameSearch
            className="mb-4"
            inputClassName="w-full rounded-lg border border-border bg-surface-elevated py-2.5 pl-9 pr-9 text-sm text-text outline-none focus:border-brand"
            onNavigate={() => setMobileOpen(false)}
          />
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.key}>
                <NavLink
                  href={link.href}
                  section={link.section}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text hover:bg-surface-elevated"
                  onNavigate={() => setMobileOpen(false)}
                >
                  {t(locale, link.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
