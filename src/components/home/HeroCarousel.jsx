'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import { heroBanners } from '@/data/mock'

const AUTO_MS = 5000

export default function HeroCarousel() {
  const { locale } = useApp()
  const [active, setActive] = useState(0)
  const banner = heroBanners[active]

  const goTo = useCallback((index) => {
    setActive((index + heroBanners.length) % heroBanners.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % heroBanners.length)
    }, AUTO_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative overflow-hidden" aria-label="Promotions">
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div
          className={`relative min-h-[280px] overflow-hidden rounded-2xl bg-linear-to-br sm:min-h-[360px] ${banner.gradient}`}
        >
          <div className="gaming-grid-bg absolute inset-0 opacity-40" aria-hidden />
          <div
            className="absolute inset-0"
            style={{ background: 'var(--hero-overlay)' }}
            aria-hidden
          />

          <div className="relative z-10 flex min-h-[280px] flex-col justify-center px-6 py-10 sm:min-h-[360px] sm:px-12 lg:px-16">
            {heroBanners.map((b, i) => (
              <div
                key={b.id}
                className={`transition-all duration-500 ${
                  i === active
                    ? 'relative opacity-100'
                    : 'pointer-events-none absolute inset-0 flex flex-col justify-center px-6 py-10 opacity-0 sm:px-12 lg:px-16'
                }`}
                aria-hidden={i !== active}
              >
                <h1 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {t(locale, b.titleKey)}
                </h1>
                <p className="mt-3 max-w-md text-base text-white/85 sm:text-lg">
                  {t(locale, b.subtitleKey)}
                </p>
                <Link
                  href="/topup"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {t(locale, b.ctaKey)}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(active - 1)}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur transition hover:bg-black/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur transition hover:bg-black/50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {heroBanners.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === active}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
