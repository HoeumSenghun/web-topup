'use client'

import { Suspense } from 'react'
import Navbar from '@/components/layout/Navbar'
import PromoTicker from '@/components/layout/PromoTicker'
import Footer from '@/components/layout/Footer'
import SearchSync from '@/components/search/SearchSync'

export default function SiteShell({ children }) {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <SearchSync />
      </Suspense>
      <PromoTicker />
      <main>{children}</main>
      <Footer />
    </>
  )
}
