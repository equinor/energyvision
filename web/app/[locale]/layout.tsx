import '../globals.css'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '../../i18n/routing'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import { Toaster } from 'sonner'
import DraftModeToast from '@/sections/DraftMode/DraftModeToast'
import { VisualEditing } from 'next-sanity'
import { SanityLive } from '@/sanity/lib/live'
import { handleError } from '../client-utils'
import { getHeaderAndFooterData, getPageDataForHeader } from '@/sanity/lib/fetchData'
import { getNameFromLocale } from '@/lib/localization'
import Header from '@/sections/Header/Header'
import getPageSlugs from '@/common/helpers/getPageSlugs'
import Footer from '@/sections/Footer/Footer'

const equinorRegular = localFont({
  src: '../fonts/equinor/Equinor-Regular.woff',
})
const equinorVariableWoff = localFont({
  src: '../fonts/equinor/EquinorVariable-VF.woff',
})
const equinorVariableWoff2 = localFont({
  src: '../fonts/equinor/EquinorVariable-VF.woff2',
})

type Params = Promise<{ locale: string; slug: string }>

/* export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params
} */

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  // Ensure that the incoming `locale` is valid
  const { locale, slug } = await params
  console.log('Layout locale', locale)
  console.log('Layout slug', slug)
  const { isEnabled: isDraftMode } = await draftMode()

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const { menuData, footerData } = await getHeaderAndFooterData({ slug, lang: getNameFromLocale(locale) })
  const { pageData } = await getPageDataForHeader({ slug, lang: getNameFromLocale(locale) })
  const slugs = getPageSlugs(pageData)

  return (
    <html
      lang={locale}
      className={`${equinorRegular.className} ${equinorVariableWoff.className} ${equinorVariableWoff2.className}`}
    >
      <body>
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
          <div className={`has-[.sticky-menu]:pt-topbar`}>
            <Header slugs={slugs} menuData={menuData} stickyMenuData={pageData?.stickyMenu} />
            {children}
            <Footer footerData={footerData} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
