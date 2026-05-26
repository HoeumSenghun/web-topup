'use client'

import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import GameCard from '@/components/ui/GameCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function TrendingGames() {
  const { locale, games, isSearchActive } = useApp()
  const trending = games.filter((g) => g.trending).slice(0, 4)

  if (isSearchActive) return null

  return (
    <section id="promo" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t(locale, 'section.trending'), href: '#promo' }]} />
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-text sm:text-3xl">
          {t(locale, 'section.trending')}
        </h2>
        <p className="mt-1 text-text-muted">{t(locale, 'section.trending.sub')}</p>
      </header>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {trending.map((game) => (
          <GameCard key={game.id} game={game} compact />
        ))}
      </div>
    </section>
  )
}
