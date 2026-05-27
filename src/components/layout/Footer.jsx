'use client'

import Link from 'next/link'
import { Gem, Mail, Phone, MessageCircle } from 'lucide-react'
import NavLink from '@/components/layout/NavLink'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import {
  siteConfig,
  footerCategories,
  footerQuickLinks,
  navLinks,
} from '@/data/mock'

const colClass = 'w-full max-w-xs text-left sm:max-w-none'
const listClass = 'space-y-2'
const linkRowClass = 'flex items-center justify-start gap-2'

export default function Footer() {
  const { locale } = useApp()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid justify-items-center gap-10 sm:grid-cols-2 sm:justify-items-start lg:grid-cols-4">
          <div className={colClass}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-cyan-400 text-white">
                <Gem className="h-5 w-5" aria-hidden />
              </span>
              <span className="gradient-text">{siteConfig.name}</span>
            </Link>
            <p className="mt-3 text-sm text-text-muted">{siteConfig.tagline}</p>
          </div>

          <div className={colClass}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text">
              {t(locale, 'footer.quicklinks')}
            </h3>
            <ul className={listClass}>
              {footerQuickLinks.map((link) => (
                <li key={link.key}>
                  <NavLink
                    href={link.href}
                    className="text-sm text-text-muted transition hover:text-brand"
                  >
                    {t(locale, link.key)}
                  </NavLink>
                </li>
              ))}
              {navLinks.slice(0, 3).map((link) => (
                <li key={link.key}>
                  <NavLink
                    href={link.href}
                    className="text-sm text-text-muted transition hover:text-brand"
                  >
                    {t(locale, link.key)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className={colClass}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text">
              {t(locale, 'footer.categories')}
            </h3>
            <ul className={listClass}>
              {footerCategories.map((cat) => (
                <li key={cat.key}>
                  <NavLink
                    href={cat.href}
                    className="text-sm text-text-muted transition hover:text-brand"
                  >
                    {t(locale, cat.key)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className={colClass}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text">
              {t(locale, 'footer.contact')}
            </h3>
            <ul className="space-y-3 text-sm text-text-muted">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={`${linkRowClass} transition hover:text-brand`}
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className={`${linkRowClass} transition hover:text-brand`}
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  {siteConfig.phone}
                </a>
              </li>
              <li className={linkRowClass}>
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                Telegram: {siteConfig.telegram}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-text-muted">
          <p>
            © {year} {siteConfig.name}. {t(locale, 'footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
