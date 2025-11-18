// @ts-ignore: missing type declarations for side-effect import of global CSS
import '../../../globals.css'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '../../../../i18n/routing'
import { getHeaderData } from '@/sanity/lib/fetchData'
import { getLocaleFromName, getNameFromLocale } from '@/sanity/localization'
import Header from '@/sections/Header/Header'
import { Flags } from '@/sanity/helpers/datasetHelpers'

type Params = Promise<{ locale: string }>

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params

  if (!hasLocale(routing.locales, locale) || !Flags.HAS_NEWSROOM) {
    notFound()
  }
  const slugs = [
    { slug: '/news', lang: 'en_GB' },
    { slug: '/no/nyheter', lang: 'nb_NO' },
  ]
  const slug = slugs.find((it) => it.lang == getLocaleFromName(locale))?.slug
  const { headerData } = await getHeaderData({ slug, lang: getNameFromLocale(locale) })

  return (
    <div className={`[:not(:has(.sticky-menu))]:pt-topbar`}>
      <Header slugs={slugs} menuData={headerData} />
      {children}
    </div>
  )
}
