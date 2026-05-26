'use client'

import { UserCircle2, Hash, Info } from 'lucide-react'
import { t } from '@/lib/i18n'
import { getGameAccountConfig, ACCOUNT_TYPES } from '@/data/game-accounts'

const inputClass =
  'w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-lg font-medium tracking-wide text-text outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25'

function key(prefix, field) {
  return `form.account.${prefix}.${field}`
}

export default function AccountFields({
  game,
  locale,
  playerId,
  serverId,
  onPlayerIdChange,
  onServerIdChange,
}) {
  const config = getGameAccountConfig(game.id)
  const prefix = config.i18nPrefix
  const isDual = config.type === ACCOUNT_TYPES.USER_SERVER_ID
  const example = config.example ?? {}

  const preview = isDual && playerId && serverId
    ? `(${playerId}) (${serverId})`
    : playerId || null

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand">
          <Info className="h-4 w-4" aria-hidden />
          {t(locale, key(prefix, 'whereTitle'))}
        </p>
        <div className="flex items-stretch gap-3 rounded-lg bg-surface-elevated p-3 ring-1 ring-border">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: game.color }}
          >
            {game.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 text-sm">
            {isDual ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-text-muted">{t(locale, key(prefix, 'playerId'))}:</span>
                  <span className="rounded bg-amber-500/15 px-2 py-0.5 font-mono font-semibold text-amber-700 dark:text-amber-300">
                    {example.playerId}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-text-muted">{t(locale, key(prefix, 'serverId'))}:</span>
                  <span className="rounded bg-cyan-500/15 px-2 py-0.5 font-mono font-semibold text-cyan-700 dark:text-cyan-300">
                    {example.serverId}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-text-muted">{t(locale, key(prefix, 'playerId'))}:</span>
                <span className="rounded bg-amber-500/15 px-2 py-0.5 font-mono font-semibold text-amber-700 dark:text-amber-300">
                  {example.playerId}
                </span>
              </div>
            )}
          </div>
        </div>
        <p className="mt-2 text-xs text-text-muted">{t(locale, key(prefix, 'whereDesc'))}</p>
      </div>

      <div className={`grid gap-4 ${isDual ? 'sm:grid-cols-2' : ''}`}>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-text">
            <UserCircle2 className="h-4 w-4 text-brand" aria-hidden />
            {t(locale, key(prefix, 'playerId'))}
          </span>
          <input
            type="text"
            inputMode={config.type === ACCOUNT_TYPES.USERNAME ? 'text' : 'numeric'}
            pattern={config.type === ACCOUNT_TYPES.USERNAME ? undefined : '[0-9]*'}
            autoComplete="off"
            name={`${game.id}-player-id`}
            maxLength={config.type === ACCOUNT_TYPES.UID ? 9 : undefined}
            value={playerId}
            onChange={(e) => {
              const raw = e.target.value
              const value =
                config.type === ACCOUNT_TYPES.USERNAME
                  ? raw.replace(/[^a-zA-Z0-9._-]/g, '')
                  : raw.replace(/\D/g, '')
              onPlayerIdChange(value)
            }}
            placeholder={t(locale, key(prefix, 'playerId.placeholder'))}
            className={inputClass}
          />
          <span className="mt-1.5 block text-xs text-text-muted">
            {t(locale, key(prefix, 'playerId.hint'))}
          </span>
        </label>

        {isDual && (
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-text">
              <Hash className="h-4 w-4 text-brand" aria-hidden />
              {t(locale, key(prefix, 'serverId'))}
            </span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              name={`${game.id}-server-id`}
              maxLength={5}
              value={serverId}
              onChange={(e) => onServerIdChange(e.target.value.replace(/\D/g, ''))}
              placeholder={t(locale, key(prefix, 'serverId.placeholder'))}
              className={inputClass}
            />
            <span className="mt-1.5 block text-xs text-text-muted">
              {t(locale, key(prefix, 'serverId.hint'))}
            </span>
          </label>
        )}
      </div>

      {preview && isDual && (
        <p className="rounded-lg bg-surface px-3 py-2 text-center font-mono text-sm text-text-muted">
          {t(locale, 'form.account.preview')}:{' '}
          <span className="font-semibold text-text">{preview}</span>
        </p>
      )}
    </div>
  )
}
