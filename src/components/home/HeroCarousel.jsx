'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import { heroBanners } from '@/data/mock'

const AUTO_MS = 5000
const SLIDE_PAD = 'px-5 py-8 sm:px-12 sm:py-10 lg:px-16'

export default function HeroCarousel() {
  const { locale } = useApp()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(null)

  const goTo = useCallback((index) => {
    setActive((index + heroBanners.length) % heroBanners.length)
  }, [])

  useEffect(() => {
    if (paused) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const timer = setInterval(() => {
      setActive((i) => (i + 1) % heroBanners.length)
    }, AUTO_MS)

    return () => clearInterval(timer)
  }, [paused])

  useEffect(() => {
    function onVisibilityChange() {
      setPaused(document.hidden)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 40) return
    if (delta < 0) goTo(active + 1)
    else goTo(active - 1)
  }

  return (
    <section
      id="home"
      className="relative overflow-x-hidden"
      aria-label="Promotions"
      aria-roledescription="carousel"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div
          className="relative h-[300px] touch-pan-y overflow-hidden rounded-2xl sm:h-[360px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {heroBanners.map((b, i) => (
            <div
              key={b.id}
              className={`absolute inset-0 bg-linear-to-br transition-opacity duration-500 ease-in-out ${b.gradient} ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={i !== active}
            />
          ))}

          <div className="gaming-grid-bg pointer-events-none absolute inset-0 z-[1] opacity-40" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ background: 'var(--hero-overlay)' }}
            aria-hidden
          />

          <div className="relative z-10 h-full">
            {heroBanners.map((b, i) => (
              <div
                key={b.id}
                className={`absolute inset-0 flex flex-col justify-center transition-opacity duration-500 ease-in-out ${SLIDE_PAD} ${
                  i === active
                    ? 'z-10 opacity-100'
                    : 'pointer-events-none z-0 opacity-0'
                }`}
                aria-hidden={i !== active}
              >
                <h1 className="max-w-xl text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {t(locale, b.titleKey)}
                </h1>
                <p className="mt-2 max-w-md text-sm text-white/85 sm:mt-3 sm:text-lg">
                  {t(locale, b.subtitleKey)}
                </p>
                <Link
                  href="/topup"
                  tabIndex={i === active ? 0 : -1}
                  className="mt-4 inline-flex w-fit max-w-full items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:mt-6 sm:px-6 sm:py-3"
                >
                  {t(locale, b.ctaKey)}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(active - 1)}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white transition hover:bg-black/60 sm:left-3 sm:p-2"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white transition hover:bg-black/60 sm:right-3 sm:p-2"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-4">
            {heroBanners.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-[width,background-color] duration-300 ${
                  i === active ? 'w-8 bg-white' : 'w-2 bg-white/50'
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
