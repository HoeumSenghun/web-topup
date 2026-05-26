'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToHash() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return

    function scroll() {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    scroll()
    window.addEventListener('hashchange', scroll)
    return () => window.removeEventListener('hashchange', scroll)
  }, [pathname])

  return null
}
