import '../globals.css'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { VisualEditing } from 'next-sanity/visual-editing'
import { PageProvider } from '@/contexts/pageContext'
import { dataset } from '@/languageConfig'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { getNameFromIso } from '@/sanity/helpers/localization'
import { routeSanityFetch, SanityLive } from '@/sanity/lib/live'
import { footerAndErrorImageQuery } from '@/sanity/queries/footer'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import DraftModeToolbar from '@/sections/DraftMode/DraftModeToolbar'
import GoToTopButton from '@/sections/GoToTopButton'
import { routing } from '../../i18n/routing'
import { GoogleTagManagerHead } from './GTMHead'
import { SiteImprove } from './SiteImprove'

const equinor = localFont({
  src: [
    { path: '../fonts/equinor/Equinor-Regular.woff' },
    { path: '../fonts/equinor/EquinorVariable-VF.woff' },
    { path: '../fonts/equinor/EquinorVariable-VF.woff2' },
  ],
})

type Params = Promise<{ locale: string }>

//the [locale] segment corresponds to the locale (iso format), not the prefix(/no).

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const queryParams = {
    lang: getNameFromIso(locale) ?? 'en_GB',
  }

  const [siteMenuData, footerAndErrorImageData] = await Promise.all([
    routeSanityFetch({
      query: Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery,
      params: queryParams,
      tags: ['siteMenu', 'subMenu'],
      requestTag: 'menu',
    }),
    routeSanityFetch({
      query: footerAndErrorImageQuery,
      params: queryParams,
      tags: ['footer', 'settings'],
      requestTag: 'footer',
    }),
  ])

  console.log('footer params', queryParams)
  console.log(footerAndErrorImageQuery)
  const { errorImage, ...footerData } = footerAndErrorImageData.data || {}

  return (
    <html lang={locale} className={`${equinor.className} `}>
      <body>
        <GoToTopButton />
        <SanityLive />
        {dataset === 'global-development' && (await draftMode()).isEnabled && (
          <>
            <DraftModeToolbar />
            <VisualEditing />
          </>
        )}
        <NextIntlClientProvider>
          <PageProvider
            initialFooterData={footerData}
            initialErrorImage={errorImage}
            initialSiteMenuData={siteMenuData.data}
          >
            {children}
          </PageProvider>
        </NextIntlClientProvider>
      </body>
      {/** TODO look into scripts */}
      <Script
        src='https://consent.cookiebot.com/uc.js'
        id='Cookiebot'
        strategy='afterInteractive'
        data-cbid='f1327b03-7951-45da-a2fd-9181babc783f'
        data-blockingmode='auto'
        data-culture={locale === 'nb_NO' ? 'nb' : locale}
      />
      <GoogleTagManagerHead />
      <SiteImprove />
    </html>
  )
}
