import '../../../globals.css'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '../../../../i18n/routing'
import { getHeaderData, getPageDataForHeader } from '@/sanity/lib/fetchData'
import { getNameFromLocale } from '@/sanity/localization'
import Header from '@/sections/Header/Header'
import getPageSlugs from '@/sanity/helpers/getPageSlugs'

type Params = Promise<{ locale: string }>
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  // Ensure that the incoming `locale` is valid
  const locale = (await params).locale

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const menuData = await getHeaderData({ slug: '/', lang: getNameFromLocale(locale) })
  const { pageData: data } = await getPageDataForHeader({ slug: '', lang: getNameFromLocale(locale) })
  const slugs = getPageSlugs(data.pageData)
  return (
    <>
      <Header slugs={slugs} menuData={menuData} stickyMenuData={data.pageData?.stickyMenu} />
      {children}
    </>
  )
}
