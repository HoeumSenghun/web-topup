'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import { heroBanners, promoTicker } from '@/data/mock'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function PromotionsPage() {
  const { locale } = useApp()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t(locale, 'nav.promo'), href: '/promo' }]} />
      <header className="mb-10">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-text sm:text-3xl">
          <Sparkles className="h-7 w-7 text-brand" aria-hidden />
          {t(locale, 'page.promo.title')}
        </h1>
        <p className="mt-2 max-w-2xl text-text-muted">{t(locale, 'page.promo.sub')}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {heroBanners.map((banner) => (
          <article
            key={banner.id}
            className={`relative overflow-hidden rounded-2xl bg-linear-to-br p-6 shadow-lg ${banner.gradient}`}
          >
            <div className="gaming-grid-bg absolute inset-0 opacity-30" aria-hidden />
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white">
                {t(locale, banner.titleKey)}
              </h2>
              <p className="mt-2 text-sm text-white/85">
                {t(locale, banner.subtitleKey)}
              </p>
              <Link
                href="/topup"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-indigo-700 transition hover:scale-105"
              >
                {t(locale, 'hero.cta')}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold text-text">
          {t(locale, 'page.promo.deals')}
        </h2>
        <ul className="space-y-3">
          {promoTicker.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-text"
            >
              {t(locale, item.key)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
