import '../../../../../globals.css'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '../../../../../../i18n/routing'
import localFont from 'next/font/local'
import { getHeaderAndFooterData } from '@/sanity/lib/fetchData'
import { getNameFromLocale } from '@/lib/localization'
import Header from '@/sections/Header/Header'
import Footer from '@/sections/Footer/Footer'
import archivedNews from '../../../../../../lib/archive/archivedNewsPaths.json'
import { PathType } from '@/sanity/queries/paths/getPaths'
import { Flags } from '@/common/helpers/datasetHelpers'

const equinorRegular = localFont({
  src: '../../../../../fonts/equinor/Equinor-Regular.woff',
})
const equinorVariableWoff = localFont({
  src: '../../../../../fonts/equinor/EquinorVariable-VF.woff',
})
const equinorVariableWoff2 = localFont({
  src: '../../../../../fonts/equinor/EquinorVariable-VF.woff2',
})

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: any }) {
  // Ensure that the incoming `locale` is valid
  const { locale, slug } = await params

  const pagePathArray = slug
  const pagePath = pagePathArray.join('/')

  if (!hasLocale(routing.locales, locale) || !Flags.HAS_ARCHIVED_NEWS) {
    notFound()
  }
  const { menuData, footerData } = await getHeaderAndFooterData({ slug, lang: getNameFromLocale(locale) })
  const archivedItems = archivedNews.filter((e) => e.slug === `/news/archive/${pagePath}`)
  const slugs =
    archivedItems?.map((data: PathType) => ({
      slug: `${data['locale'] == 'no' ? '/no' : ''}${data['slug'] as string}`,
      lang: data['locale'] === 'en' ? 'en_GB' : 'nb_NO',
    })) ?? []

  return (
    <html
      lang={locale}
      className={`${equinorRegular.className} ${equinorVariableWoff.className} ${equinorVariableWoff2.className}`}
    >
      <head>
        {/*eslint-disable-next-line react/no-unknown-property*/}
        <script
          src="https://consent.cookiebot.com/uc.js"
          id="Cookiebot"
          data-cbid="f1327b03-7951-45da-a2fd-9181babc783f"
          async
        />
        {/*  eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/legacy/styles/legacy.minified.css" />
        {/*  eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/legacy/styles/legacy.spacing.css" />
        {/*eslint-disable-next-line react/no-unknown-property*/}
        <link rel="stylesheet" precedence="default" href="https://cdn.eds.equinor.com/font/equinor-font.css" />
      </head>
      <body>
        <NextIntlClientProvider>
          <div className={`text-slate-80 [:not(:has(.sticky-menu))]:pt-topbar`}>
            <Header slugs={slugs} menuData={menuData} />
            {children}
            <Footer footerData={footerData} className={'clear-both'} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
