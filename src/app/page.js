import { Suspense } from 'react'
import HomePage from '@/components/home/HomePage'
import { getJsonLd } from '@/lib/seo'

export default function Page() {
  const jsonLd = getJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
    </>
  )
}
