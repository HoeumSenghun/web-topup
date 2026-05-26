'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import { searchGames, hasSearchQuery } from '@/services/search.service'
import GameIcon from '@/components/icons/GameIcon'

const MAX_SUGGESTIONS = 6

export default function GameSearch({ className = '', inputClassName = '', onNavigate }) {
  const router = useRouter()
  const pathname = usePathname()
  const { locale, games, searchQuery, setSearchQuery } = useApp()
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const results = useMemo(
    () => searchGames(games, searchQuery).slice(0, MAX_SUGGESTIONS),
    [games, searchQuery]
  )

  const showDropdown = open && hasSearchQuery(searchQuery)

  useEffect(() => {
    function onDocClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  function goToGamesSection(query) {
    const q = query.trim()
    onNavigate?.()
    setOpen(false)
    setActiveIndex(-1)

    if (pathname === '/') {
      setSearchQuery(q)
      const url = q ? `/?q=${encodeURIComponent(q)}#games` : '/#games'
      router.replace(url, { scroll: false })
      requestAnimationFrame(() => {
        document.getElementById('games')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      const url = q ? `/?q=${encodeURIComponent(q)}#games` : '/#games'
      router.push(url)
    }
  }

  function clearSearch() {
    setSearchQuery('')
    setActiveIndex(-1)
    inputRef.current?.focus()
    if (pathname === '/') {
      router.replace('/#games', { scroll: false })
    }
  }

  function handleKeyDown(e) {
    if (!showDropdown && e.key === 'Enter' && searchQuery.trim()) {
      e.preventDefault()
      goToGamesSection(searchQuery)
      return
    }

    if (!showDropdown) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && results[activeIndex]) {
        onNavigate?.()
        setOpen(false)
        router.push(`/topup/${results[activeIndex].id}`)
      } else {
        goToGamesSection(searchQuery)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <label className="relative block">
        <span className="sr-only">{t(locale, 'nav.search')}</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden
        />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="game-search-listbox"
          aria-autocomplete="list"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t(locale, 'nav.search')}
          className={
            inputClassName ||
            'w-full rounded-lg border border-border bg-surface-elevated py-2 pl-9 pr-9 text-sm text-text outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 sm:w-40 lg:w-52'
          }
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-muted transition hover:bg-surface hover:text-text"
            aria-label={t(locale, 'search.clear')}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </label>

      {showDropdown && (
        <div
          id="game-search-listbox"
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,20rem)] overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-xl sm:w-72"
          style={{ boxShadow: 'var(--card-shadow)' }}
        >
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-text-muted">
              {t(locale, 'search.noResults')}
            </p>
          ) : (
            <ul className="max-h-72 overflow-y-auto py-2">
              {results.map((game, index) => (
                <li key={game.id} role="option" aria-selected={activeIndex === index}>
                  <Link
                    href={`/topup/${game.id}`}
                    onClick={() => {
                      onNavigate?.()
                      setOpen(false)
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition ${
                      activeIndex === index
                        ? 'bg-brand/10 text-text'
                        : 'text-text hover:bg-surface'
                    }`}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${game.color}22`, color: game.color }}
                    >
                      <GameIcon gameId={game.id} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span className="block truncate font-medium">{game.name}</span>
                      <span className="block truncate text-xs capitalize text-text-muted">
                        {game.category}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-border p-2">
            <button
              type="button"
              onClick={() => goToGamesSection(searchQuery)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand/10 px-3 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand/20"
            >
              {t(locale, 'search.viewAll')}
              {results.length > 0 && (
                <span className="rounded-full bg-brand px-2 py-0.5 text-xs text-white">
                  {searchGames(games, searchQuery).length}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
