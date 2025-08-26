import '../../globals.css'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '../../../i18n/routing'
import localFont from 'next/font/local'
import { getHeaderAndFooterData, getPageDataForHeader } from '@/sanity/lib/fetchData'
import { getNameFromLocale } from '@/lib/localization'
import Header from '@/sections/Header/Header'
import getPageSlugs from '@/common/helpers/getPageSlugs'

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

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const { menuData } = await getHeaderAndFooterData({ slug, lang: getNameFromLocale(locale) })
  const { pageData } = await getPageDataForHeader({ slug, lang: getNameFromLocale(locale) })
  const slugs = getPageSlugs(pageData)

  return (
    <html
      lang={locale}
      className={`${equinorRegular.className} ${equinorVariableWoff.className} ${equinorVariableWoff2.className}`}
    >
      <head>
        {/*eslint-disable-next-line react/no-unknown-property*/}
        <link rel="stylesheet" precedence="default" href="https://cdn.eds.equinor.com/font/equinor-font.css" />
      </head>
      <body>
        <NextIntlClientProvider>
          <div className="dark fixed inset-0 overflow-auto bg-slate-blue-95">
            <Header slugs={slugs} menuData={menuData} />
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
