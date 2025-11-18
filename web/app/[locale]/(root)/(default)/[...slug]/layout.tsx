import '../../../../globals.css'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '../../../../../i18n/routing'
import { getHeaderData, getPageDataForHeader } from '@/sanity/lib/fetchData'
import { getNameFromLocale } from '@/sanity/localization'
import Header from '@/sections/Header/Header'
import getPageSlugs from '@/sanity/helpers/getPageSlugs'

type Params = Promise<{ locale: string; slug: string | string[] }>
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  // Ensure that the incoming `locale` is valid
  const locale = (await params).locale
  const slug = (await params).slug as string[]

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const { headerData } = await getHeaderData({ slug: slug.join('/'), lang: getNameFromLocale(locale) })
  const { pageData: data } = await getPageDataForHeader({ slug: '', lang: getNameFromLocale(locale) })
  const slugs = getPageSlugs(data.pageData)
  return (
    <>
      <Header slugs={slugs} menuData={headerData} stickyMenuData={data.pageData?.stickyMenu} />
      {children}
    </>
  )
}
