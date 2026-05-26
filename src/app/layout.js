import { Inter, Noto_Sans_Khmer } from 'next/font/google'
import Script from 'next/script'
import { cookies } from 'next/headers'
import './globals.css'
import ClientProviders from '@/components/providers/ClientProviders'
import { defaultMetadata } from '@/lib/seo'
import { themeInitScript } from '@/lib/theme-init-script'
import { getGames } from '@/actions/games'
import { LOCALE_COOKIE, THEME_COOKIE, parseLocale, parseTheme } from '@/lib/preferences'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoKhmer = Noto_Sans_Khmer({
  subsets: ['khmer'],
  variable: '--font-noto-khmer',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata = defaultMetadata

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  const locale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value)
  const theme = parseTheme(cookieStore.get(THEME_COOKIE)?.value)
  const games = await getGames()

  return (
    <html
      lang={locale === 'km' ? 'km' : 'en'}
      className={`${inter.variable} ${notoKhmer.variable}`}
      data-theme={theme}
      data-locale={locale}
      style={{ colorScheme: theme }}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <Script id="ds-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ClientProviders
          initialLocale={locale}
          initialTheme={theme}
          games={games}
        >
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
