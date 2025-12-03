// @ts-ignore: missing type declarations for side-effect import of global CSS
import '@/globals.css'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import archivedNews from '@/lib/archive/archivedNewsPaths.json'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { getHeaderData } from '@/sanity/lib/fetchData'
import { getNameFromLocale } from '@/sanity/localization'
import type { PathType } from '@/sanity/queries/paths/getPaths'
import Header from '@/sections/Header/Header'

type Params = Promise<{ locale: string; slug: string[] }>

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  // Ensure that the incoming `locale` is valid
  const { locale, slug } = await params

  const pagePathArray = slug
  const pagePath = pagePathArray.join('/')

  if (!hasLocale(routing.locales, locale) || !Flags.HAS_ARCHIVED_NEWS) {
    notFound()
  }

  const { headerData } = await getHeaderData({
    //@ts-ignore: Fix slug here because [...slug] is string[]
    slug,
    lang: getNameFromLocale(locale),
  })
  const archivedItems = archivedNews.filter(
    e => e.slug === `/news/archive/${pagePath}`,
  )
  const slugs =
    archivedItems?.map((data: PathType) => ({
      slug: `${data.locale === 'no' ? '/no' : ''}${data.slug as string}`,
      lang: data.locale === 'en' ? 'en_GB' : 'nb_NO',
    })) ?? []

  return (
    <div className={`pt-topbar text-slate-80 peer-data-[sticky=true]:pt-0`}>
      <Header slugs={slugs} menuData={headerData} />
      {children}
      <div className='clear-both'></div>
    </div>
  )
}
