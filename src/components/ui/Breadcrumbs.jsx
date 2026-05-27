'use client'

import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'

export default function Breadcrumbs({ items = [] }) {
  const { locale } = useApp()

  const crumbs = [
    { label: t(locale, 'breadcrumb.home'), href: '/' },
    ...items,
  ]

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
        {crumbs.map((item, i) => (
          <li key={item.href + item.label} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-border">
                /
              </span>
            )}
            {i === crumbs.length - 1 ? (
              <span className="text-text font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-brand transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
