import '../../globals.css'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '../../../i18n/routing'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import { Toaster } from 'sonner'
import DraftModeToast from '@/sections/DraftMode/DraftModeToast'
// eslint-disable-next-line import/no-unresolved
import { VisualEditing } from 'next-sanity/visual-editing'
import { SanityLive } from '@/sanity/lib/live'
import { handleError } from '../../client-utils'
import { getFooterData } from '@/sanity/lib/fetchData'
import { getNameFromLocale } from '@/lib/localization'
import Footer from '@/sections/Footer/Footer'
import Script from 'next/script'
import { SiteImprove } from '../SiteImprove'
import { GoogleTagManagerHead } from '../GTMHead'
import { Suspense } from 'react'
import { NavigationEvents } from '../NavigationEvents'

const equinorRegular = localFont({
  src: '../../fonts/equinor/Equinor-Regular.woff',
})
const equinorVariableWoff = localFont({
  src: '../../fonts/equinor/EquinorVariable-VF.woff',
})
const equinorVariableWoff2 = localFont({
  src: '../../fonts/equinor/EquinorVariable-VF.woff2',
})

type Params = Promise<{ locale: string }>

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const footerData = await getFooterData(getNameFromLocale(locale))

  return (
    <html
      lang={locale}
      className={`${equinorRegular.className} ${equinorVariableWoff.className} ${equinorVariableWoff2.className}`}
    >
      <head>
        {/** TODO look into scripts */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document*/}
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
        <>
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /sections/DraftMode/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          <NextIntlClientProvider>
            {children}
            <Footer footerData={footerData} />
          </NextIntlClientProvider>
        </>
      </body>
    </html>
  )
}
