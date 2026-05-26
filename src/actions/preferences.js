'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { LOCALE_COOKIE, THEME_COOKIE, parseLocale, parseTheme } from '@/lib/preferences'

export async function setLocale(locale) {
  const next = parseLocale(locale) === 'km' ? 'km' : 'en'
  const jar = await cookies()
  jar.set(LOCALE_COOKIE, next, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  revalidatePath('/', 'layout')
}

export async function setTheme(theme) {
  const next = parseTheme(theme)
  const jar = await cookies()
  jar.set(THEME_COOKIE, next, { path: '/', maxAge: 60 * 60 * 24 * 365 })
}
