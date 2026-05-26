'use client'

import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import GameCard from '@/components/ui/GameCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function GamesGrid() {
  const { locale, filteredGames, isSearchActive, searchQuery } = useApp()

  const resultsLabel = t(locale, 'search.results').replace(
    '{count}',
    String(filteredGames.length)
  )

  return (
    <section id="games" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 scroll-mt-20">
      <Breadcrumbs items={[{ label: t(locale, 'section.games'), href: '/#games' }]} />
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-text sm:text-3xl">
          {t(locale, 'section.games')}
        </h2>
        {isSearchActive ? (
          <p className="mt-1 text-text-muted">
            {resultsLabel}
            <span className="mx-1 text-border">·</span>
            <span className="font-medium text-brand">&quot;{searchQuery}&quot;</span>
          </p>
        ) : (
          <p className="mt-1 text-text-muted">{t(locale, 'section.games.sub')}</p>
        )}
      </header>

      {filteredGames.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface-elevated p-8 text-center text-text-muted">
          {t(locale, 'search.noResults')}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  )
}
