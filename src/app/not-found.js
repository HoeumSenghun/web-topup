import SiteShell from '@/components/layout/SiteShell'
import NotFoundContent from '@/components/errors/NotFoundContent'
import { siteConfig } from '@/data/mock'

export const metadata = {
  title: siteConfig.name,
  description: `The page you requested was not found on ${siteConfig.name}.`,
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  )
}
