'use client'

import Link from 'next/link'
import { Home, Gamepad2, ArrowRight, Ghost } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import { siteConfig } from '@/data/mock'

export default function NotFoundContent() {
  const { locale } = useApp()

  return (
    <section
      className="relative flex min-h-[calc(100vh-12rem)] items-center justify-center overflow-hidden px-4 py-16 sm:py-24"
      aria-labelledby="not-found-title"
    >
      <div className="gaming-grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface-elevated shadow-lg">
          <Ghost className="h-10 w-10 text-brand" aria-hidden />
        </div>

        <p className="gradient-text text-7xl font-black tracking-tighter sm:text-8xl">
          {t(locale, 'notFound.code')}
        </p>

        <h1
          id="not-found-title"
          className="mt-4 text-2xl font-bold text-text sm:text-3xl"
        >
          {t(locale, 'notFound.title')}
        </h1>

        <p className="mt-3 text-base text-text-muted sm:text-lg">
          {t(locale, 'notFound.description')}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-brand-light hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Home className="h-4 w-4" aria-hidden />
            {t(locale, 'notFound.home')}
          </Link>
          <Link
            href="/#games"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated px-6 py-3.5 text-sm font-bold text-text transition hover:border-brand hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Gamepad2 className="h-4 w-4" aria-hidden />
            {t(locale, 'notFound.games')}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <p className="mt-10 text-xs text-text-muted">
          {siteConfig.name} · {siteConfig.tagline}
        </p>
      </div>
    </section>
  )
}
