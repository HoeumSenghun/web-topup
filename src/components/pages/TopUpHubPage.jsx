'use client'

import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import GameCard from '@/components/ui/GameCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function TopUpHubPage() {
  const { locale, games, filteredGames, isSearchActive, searchQuery } = useApp()
  const trending = games.filter((g) => g.trending)
  const list = isSearchActive ? filteredGames : games

  const resultsLabel = t(locale, 'search.results').replace(
    '{count}',
    String(list.length)
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t(locale, 'nav.topup'), href: '/topup' }]} />
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-text sm:text-3xl">
          {t(locale, 'section.topup')}
        </h1>
        <p className="mt-1 text-text-muted">{t(locale, 'page.topup.sub')}</p>
      </header>

      {!isSearchActive && trending.length > 0 && (
        <section className="mb-12" aria-labelledby="topup-trending-heading">
          <h2
            id="topup-trending-heading"
            className="mb-4 text-lg font-semibold text-text"
          >
            {t(locale, 'section.trending')}
          </h2>
          <p className="mb-6 text-sm text-text-muted">
            {t(locale, 'section.trending.sub')}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trending.map((game) => (
              <GameCard key={game.id} game={game} compact />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="topup-all-heading">
        <h2 id="topup-all-heading" className="mb-4 text-lg font-semibold text-text">
          {t(locale, 'section.games')}
        </h2>
        {isSearchActive ? (
          <p className="mb-6 text-sm text-text-muted">
            {resultsLabel}
            <span className="mx-1 text-border">·</span>
            <span className="font-medium text-brand">&quot;{searchQuery}&quot;</span>
          </p>
        ) : (
          <p className="mb-6 text-sm text-text-muted">
            {t(locale, 'section.games.sub')}
          </p>
        )}

        {list.length === 0 ? (
          <p className="rounded-xl border border-border bg-surface-elevated p-8 text-center text-text-muted">
            {t(locale, 'search.noResults')}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
