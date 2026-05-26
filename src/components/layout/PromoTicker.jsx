'use client'

import { Sparkles } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import { promoTicker } from '@/data/mock'

export default function PromoTicker() {
  const { locale } = useApp()
  const items = promoTicker.map((p) => t(locale, p.key))
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden border-b border-border bg-linear-to-r from-indigo-600/90 to-cyan-600/90 py-2 text-sm font-medium text-white"
      role="marquee"
      aria-live="polite"
    >
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((text, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
