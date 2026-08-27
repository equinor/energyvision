import { connection } from 'next/server'
import { Suspense } from 'react'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { Search } from '@/sections/searchBlocks/Search'

export function generateStaticParams() {
  return Flags.HAS_SEARCH ? [{ locale: 'nb-NO' }, { locale: 'en-GB' }] : []
}

/* export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
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
} */

async function SearchContent() {
  // TODO: Cache Components adoption. Added to unblock the build: remove this connection() to re-trigger the error and review the fix options.
  await connection()

  return <Search />
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  )
}
