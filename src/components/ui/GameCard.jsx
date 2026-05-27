'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import GameIcon from '@/components/icons/GameIcon'

export default function GameCard({ game, compact = false }) {
  const { locale } = useApp()
  const pathname = usePathname()
  const href = `/topup/${game.id}`
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`group relative flex w-full flex-col items-center rounded-xl border bg-surface-elevated text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
        isActive ? 'border-brand game-card-selected shadow-lg' : 'border-border'
      } ${compact ? 'p-3' : 'p-5'}`}
      style={{ boxShadow: isActive ? 'var(--card-shadow)' : undefined }}
      aria-current={isActive ? 'page' : undefined}
    >
      <span
        className={`relative flex items-center justify-center overflow-hidden rounded-xl ${compact ? 'h-14 w-14' : 'h-16 w-16'}`}
        style={{ backgroundColor: `${game.color}22`, color: game.color }}
      >
        <GameIcon
          gameId={game.id}
          className={`transition-opacity duration-200 group-hover:opacity-30 ${compact ? 'h-7 w-7' : 'h-8 w-8'}`}
        />
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 px-1 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:text-xs"
          aria-hidden
        >
          {t(locale, 'hero.cta')}
        </span>
      </span>
      <span
        className={`mt-3 text-center font-semibold text-text ${compact ? 'text-xs' : 'text-sm'}`}
      >
        {game.name}
      </span>
      {!compact && (
        <span className="mt-1 text-xs capitalize text-text-muted">{game.category}</span>
      )}
      <span className="sr-only">
        {t(locale, 'nav.topup')} {game.name}
      </span>
    </Link>
  )
}
