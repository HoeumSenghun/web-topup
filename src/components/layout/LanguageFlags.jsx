'use client'

import { useTransition } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useRouter } from 'next/navigation'
import { setLocale } from '@/actions/preferences'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'

const LOCALES = [
  { code: 'en', country: 'GB', labelKey: 'lang.en' },
  { code: 'km', country: 'KH', labelKey: 'lang.km' },
]

export default function LanguageFlags() {
  const { locale } = useApp()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function switchTo(nextLocale) {
    if (nextLocale === locale || pending) return
    startTransition(async () => {
      await setLocale(nextLocale)
      router.refresh()
    })
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-surface-elevated p-1">
      {LOCALES.map(({ code, country, labelKey }) => {
        const isActive = locale === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            disabled={pending}
            className={`rounded-md p-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              isActive
                ? 'bg-brand/15 ring-1 ring-brand'
                : 'opacity-60 hover:opacity-100'
            }`}
            aria-label={t(locale, labelKey)}
            aria-pressed={isActive}
            title={t(locale, labelKey)}
          >
            <ReactCountryFlag
              countryCode={country}
              svg
              style={{ width: '1.35em', height: '1.35em', display: 'block' }}
              aria-hidden
            />
          </button>
        )
      })}
    </div>
  )
}
