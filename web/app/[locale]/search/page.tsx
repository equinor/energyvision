'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Search = dynamic(
  () =>
    import('@/sections/searchBlocks/Search').then(
      (searchModule) => searchModule.Search,
    ),
  { ssr: false },
);

/*export async function generateStaticParams() {
  return Flags.HAS_SEARCH ? [{ locale: 'nb-NO' }, { locale: 'en-GB' }] : []
}*/

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

export default function Page() {
  useEffect(() => {
    if (window.location.search) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return <Search />;
}
