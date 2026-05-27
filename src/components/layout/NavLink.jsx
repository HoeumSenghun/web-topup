'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function isNavActive(pathname, href) {
  if (href === '/') return pathname === '/'
  if (href === '/topup') {
    return pathname === '/topup' || pathname.startsWith('/topup/')
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function NavLink({ href, className, children, onNavigate }) {
  const pathname = usePathname()
  const active = isNavActive(pathname, href)

  return (
    <Link
      href={href}
      className={`${className}${active ? ' bg-surface-elevated text-text' : ''}`.trim()}
      onClick={() => onNavigate?.()}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
