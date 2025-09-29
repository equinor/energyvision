import '../../../../../../globals.css'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '../../../../../../../i18n/routing'
import { getHeaderData } from '@/sanity/lib/fetchData'
import { getNameFromLocale } from '@/lib/localization'
import Header from '@/sections/Header/Header'
import archivedNews from '../../../../../../../lib/archive/archivedNewsPaths.json'
import { PathType } from '@/sanity/queries/paths/getPaths'
import { Flags } from '@/common/helpers/datasetHelpers'

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: any }) {
  // Ensure that the incoming `locale` is valid
  const { locale, slug } = await params

  const pagePathArray = slug
  const pagePath = pagePathArray.join('/')

  if (!hasLocale(routing.locales, locale) || !Flags.HAS_ARCHIVED_NEWS) {
    notFound()
  }
  const { menuData } = await getHeaderData({ slug, lang: getNameFromLocale(locale) })
  const archivedItems = archivedNews.filter((e) => e.slug === `/news/archive/${pagePath}`)
  const slugs =
    archivedItems?.map((data: PathType) => ({
      slug: `${data['locale'] == 'no' ? '/no' : ''}${data['slug'] as string}`,
      lang: data['locale'] === 'en' ? 'en_GB' : 'nb_NO',
    })) ?? []

  return (
    <>
      <head>
        {/*  eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/legacy/styles/legacy.minified.css" />
        {/*  eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/legacy/styles/legacy.spacing.css" />
        {/*eslint-disable-next-line react/no-unknown-property*/}
      </head>
      <div className={`text-slate-80 [:not(:has(.sticky-menu))]:pt-topbar`}>
        <Header slugs={slugs} menuData={menuData} />
        {children}
        <div className="clear-both"></div>
      </div>
    </>
  )
}
