import '../../globals.css'
import { Metadata, ResolvingMetadata } from 'next'
import { metaTitleSuffix } from '@/languages'
import { getTranslations } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { GoogleTagManagerHead } from '../GTMHead'
import Script from 'next/script'
import { SiteImprove } from '../SiteImprove'
import { Suspense } from 'react'
import { NavigationEvents } from '../NavigationEvents'
import localFont from 'next/font/local'

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
type Params = Promise<{ locale: string }>

const equinorRegular = localFont({
  src: '../../fonts/equinor/Equinor-Regular.woff',
})
const equinorVariableWoff = localFont({
  src: '../../fonts/equinor/EquinorVariable-VF.woff',
})
const equinorVariableWoff2 = localFont({
  src: '../../fonts/equinor/EquinorVariable-VF.woff2',
})

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { locale } = await params
  return (
    <html
      lang={locale}
      className={`${equinorRegular.className} ${equinorVariableWoff.className} ${equinorVariableWoff2.className}`}
    >
      <head>
        <Script
          src="https://consent.cookiebot.com/uc.js"
          id="Cookiebot"
          strategy="beforeInteractive"
          data-cbid="f1327b03-7951-45da-a2fd-9181babc783f"
          data-blockingmode="auto"
          data-culture={locale == 'no' ? 'nb' : locale}
        />
        <GoogleTagManagerHead />
        <SiteImprove />
        {/*eslint-disable-next-line react/no-unknown-property*/}
        <link rel="stylesheet" precedence="default" href="https://cdn.eds.equinor.com/font/equinor-font.css" />
      </head>
      <body>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
