'use client'

import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import { siteConfig } from '@/data/mock'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

const linkRowClass =
  'flex items-center justify-center gap-3 rounded-xl border border-border bg-surface-elevated px-5 py-4 text-sm text-text transition hover:border-brand hover:bg-surface sm:justify-start'

export default function ContactPage() {
  const { locale } = useApp()

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t(locale, 'nav.contact'), href: '/contact' }]} />
      <header className="mb-10 text-center sm:text-left">
        <h1 className="text-2xl font-bold text-text sm:text-3xl">
          {t(locale, 'page.contact.title')}
        </h1>
        <p className="mt-2 text-text-muted">{t(locale, 'page.contact.sub')}</p>
      </header>

      <ul className="space-y-4">
        <li>
          <a href={`mailto:${siteConfig.email}`} className={linkRowClass}>
            <Mail className="h-5 w-5 shrink-0 text-brand" aria-hidden />
            <span>{siteConfig.email}</span>
          </a>
        </li>
        <li>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
            className={linkRowClass}
          >
            <Phone className="h-5 w-5 shrink-0 text-brand" aria-hidden />
            <span>{siteConfig.phone}</span>
          </a>
        </li>
        <li>
          <div className={linkRowClass}>
            <MessageCircle className="h-5 w-5 shrink-0 text-brand" aria-hidden />
            <span>
              Telegram: <strong className="text-text">{siteConfig.telegram}</strong>
            </span>
          </div>
        </li>
        <li>
          <div className={`${linkRowClass} text-text-muted`}>
            <MapPin className="h-5 w-5 shrink-0 text-brand" aria-hidden />
            <span>{t(locale, 'page.contact.location')}</span>
          </div>
        </li>
      </ul>

      <p className="mt-10 rounded-xl border border-brand/20 bg-brand/5 p-4 text-center text-sm text-text-muted sm:text-left">
        {t(locale, 'page.contact.hours')}
      </p>
    </div>
  )
}
