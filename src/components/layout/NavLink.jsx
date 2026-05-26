'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${sectionId}`)
  }
}

export default function NavLink({
  href,
  section,
  className,
  children,
  onNavigate,
}) {
  const pathname = usePathname()
  const router = useRouter()
  const sectionId = section ?? (href.includes('#') ? href.split('#')[1] : null)

  function handleClick(e) {
    onNavigate?.()

    if (!sectionId) return

    if (pathname === '/') {
      e.preventDefault()
      scrollToSection(sectionId)
      return
    }

    e.preventDefault()
    router.push(`/#${sectionId}`)
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
