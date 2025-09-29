// @ts-ignore: missing type declarations for side-effect import of global CSS
import '../../../globals.css'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '../../../../i18n/routing'
import { getHeaderData } from '@/sanity/lib/fetchData'
import { getNameFromLocale } from '@/lib/localization'
import Header from '@/sections/Header/Header'
import { Flags } from '@/common/helpers/datasetHelpers'

type Params = Promise<{ locale: string; slug: string }>

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale) || !Flags.HAS_MAGAZINE) {
    notFound()
  }
  const { menuData } = await getHeaderData({ slug, lang: getNameFromLocale(locale) })
  const slugs = [
    { slug: '/magazine', lang: 'en_GB' },
    { slug: '/no/magasin', lang: 'nb_NO' },
  ]

  return (
    <div className={`[:not(:has(.sticky-menu))]:pt-topbar`}>
      <Header slugs={slugs} menuData={menuData} />
      {children}
    </div>
  )
}
