import '../globals.css'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageProvider } from '@/contexts/pageContext'
import { getLocaleFromIso, getNameFromIso } from '@/sanity/helpers/localization'
import { routeSanityFetch, SanityLive } from '@/sanity/lib/live'
import { footerAndErrorImageQuery } from '@/sanity/queries/footer'
import Footer from '@/sections/Footer/Footer'
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

/* export const metadata: Metadata = {
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
} */

//the [locale] segment corresponds to the locale (iso format), not the prefix(/no).

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { locale } = await params

  setRequestLocale(locale)
  const t = await getTranslations()

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const queryParams = {
    lang: getNameFromIso(locale) ?? 'en_GB',
  }

  const { data: footerAndErrorImageData }: { data: any } =
    await routeSanityFetch({
      query: footerAndErrorImageQuery,
      params: queryParams,
    })

  const { errorImage, ...footerData } = footerAndErrorImageData || {}

  async function loadVisualEditing() {
    if ((await draftMode()).isEnabled) {
      const DraftModeToolbar = dynamic(
        () => import('@/sections/DraftMode/DraftModeToolbar'),
      )
      const VisualEditing = dynamic(() =>
        import('next-sanity/visual-editing').then(mod => mod.VisualEditing),
      )
      return (
        <>
          <DraftModeToolbar />
          <VisualEditing />
        </>
      )
    }
  }

  return (
    <html lang={locale} className={`${equinor.className} `}>
      <body className='has-data-no-sticky:pt-topbar'>
        <NextLink
          href='#mainTitle'
          className='sr-only bg-moss-green-50 text-sm transition focus:not-sr-only focus:flex focus:w-full focus:items-center focus:justify-center focus:p-4 focus:underline'
        >
          {t('skipToContent') ?? 'Skip to main content'}
        </NextLink>
        <SanityLive />
        {loadVisualEditing()}
        <NextIntlClientProvider>
          <PageProvider initialErrorImage={errorImage}>{children}</PageProvider>
          <Footer {...footerData} />
          <GoToTopButton />
        </NextIntlClientProvider>
      </body>
      {/** TODO look into scripts */}
      {
        <Script
          src='https://consent.cookiebot.com/uc.js'
          id='Cookiebot'
          strategy='beforeInteractive'
          data-cbid='f1327b03-7951-45da-a2fd-9181babc783f'
          data-blockingmode='auto'
          data-culture={locale === 'nb-NO' ? 'nb' : getLocaleFromIso(locale)}
        />
      }
      <GoogleTagManagerHead />
      <SiteImprove />
    </html>
  )
}
