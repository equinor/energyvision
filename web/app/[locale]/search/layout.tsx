import '../../globals.css'
import { Metadata, ResolvingMetadata } from 'next'
import { metaTitleSuffix } from '@/languages'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  _: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params
  const intl = await getTranslations()
  const title = intl('search_page_title')

  const url = `https://www.equinor.com/${locale === 'no' ? 'no' : ''}/search`
  return {
    title: `${title} - ${metaTitleSuffix}`,
    openGraph: {
      title: title,
      url,
      locale,
      type: 'website',
      siteName: 'Equinor',
    },
    alternates: {
      canonical: url,
      languages: {
        en: 'https://www.equinor.com/search',
        no: 'https://www.equinor.com/no/search',
        'x-default': 'https://www.equinor.com/search',
      },
    },
  }
}

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
