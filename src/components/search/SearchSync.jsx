'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useApp } from '@/context/AppContext'

export default function SearchSync() {
  const searchParams = useSearchParams()
  const { setSearchQuery } = useApp()

  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setSearchQuery(q)
  }, [searchParams, setSearchQuery])

  return null
}
