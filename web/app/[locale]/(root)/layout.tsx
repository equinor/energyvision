import '../../globals.css'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
// eslint-disable-next-line import/no-unresolved
import { VisualEditing } from 'next-sanity/visual-editing'
import { Toaster } from 'sonner'
import { getFooterData } from '@/sanity/lib/fetchData'
import { SanityLive } from '@/sanity/lib/live'
import { getNameFromLocale } from '@/sanity/localization'
import DraftModeToast from '@/sections/DraftMode/DraftModeToast'
import Footer from '@/sections/Footer/Footer'
import { routing } from '../../../i18n/routing'
import { handleError } from '../../client-utils'
import { FriendlyCaptchaSdkWrapper } from '../FriendlyCaptchaWrapper'
import { GoogleTagManagerHead } from '../GTMHead'
import { SiteImprove } from '../SiteImprove'

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const { footerData } = await getFooterData(getNameFromLocale(locale))

  return (
    <html
      lang={locale}
      className={`${equinorRegular.className} ${equinorVariableWoff.className} ${equinorVariableWoff2.className}`}
    >
      <head>
        {/** TODO look into scripts */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document*/}
        <Script
          src='https://consent.cookiebot.com/uc.js'
          id='Cookiebot'
          strategy='afterInteractive'
          data-cbid='f1327b03-7951-45da-a2fd-9181babc783f'
          data-blockingmode='auto'
          data-culture={locale === 'no' ? 'nb' : locale}
        />
        <GoogleTagManagerHead />
        <SiteImprove />
      </head>
      <body>
        {/*         <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense> */}

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
          <FriendlyCaptchaSdkWrapper>
            {children}
            <Footer footerData={footerData} />
          </FriendlyCaptchaSdkWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
