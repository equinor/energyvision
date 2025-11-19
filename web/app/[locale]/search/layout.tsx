// @ts-ignore: missing type declarations for side-effect import of global CSS
import '../../globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { metaTitleSuffix } from '@/languages.mjs'
import { GoogleTagManagerHead } from '../GTMHead'
import { NavigationEvents } from '../NavigationEvents'
import { SiteImprove } from '../SiteImprove'

export async function generateMetadata({
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { locale } = await params
  return (
    <html
      lang={locale}
      className={`${equinorRegular.className} ${equinorVariableWoff.className} ${equinorVariableWoff2.className}`}
    >
      <head>
        {/* TODO look into script placement */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document*/}
        <Script
          src='https://consent.cookiebot.com/uc.js'
          id='Cookiebot'
          strategy='beforeInteractive'
          data-cbid='f1327b03-7951-45da-a2fd-9181babc783f'
          data-blockingmode='auto'
          data-culture={locale === 'no' ? 'nb' : locale}
        />
        <GoogleTagManagerHead />
        <SiteImprove />
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
