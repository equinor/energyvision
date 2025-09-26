// @ts-ignore: missing type declarations for side-effect import of global CSS
import '../../globals.css'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '../../../i18n/routing'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import { Toaster } from 'sonner'
import DraftModeToast from '@/sections/DraftMode/DraftModeToast'
import { VisualEditing } from 'next-sanity'
import { SanityLive } from '@/sanity/lib/live'
import { handleError } from '../../client-utils'
import { getHeaderData } from '@/sanity/lib/fetchData'
import { getNameFromLocale } from '@/lib/localization'
import Header from '@/sections/Header/Header'
import Footer from '@/sections/Footer/Footer'
import { Flags } from '@/common/helpers/datasetHelpers'

const equinorRegular = localFont({
  src: '../../fonts/equinor/Equinor-Regular.woff',
})
const equinorVariableWoff = localFont({
  src: '../../fonts/equinor/EquinorVariable-VF.woff',
})
const equinorVariableWoff2 = localFont({
  src: '../../fonts/equinor/EquinorVariable-VF.woff2',
})

type Params = Promise<{ locale: string; slug: string }>

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  // Ensure that the incoming `locale` is valid
  const { locale, slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  if (!hasLocale(routing.locales, locale) || !Flags.HAS_MAGAZINE) {
    notFound()
  }
  const { menuData, footerData } = await getHeaderData({ slug, lang: getNameFromLocale(locale) })
  const slugs = [
    { slug: '/magazine', lang: 'en_GB' },
    { slug: '/no/magasin', lang: 'nb_NO' },
  ]

  return (
    <div className={`[:not(:has(.sticky-menu))]:pt-topbar`}>
      <Header slugs={slugs} menuData={menuData} />
      {children}
      <Footer footerData={footerData} />
    </div>
  )
}
