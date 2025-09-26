import '../../globals.css'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '../../../i18n/routing'
import { getHeaderData, getPageDataForHeader } from '@/sanity/lib/fetchData'
import { getNameFromLocale } from '@/lib/localization'
import Header from '@/sections/Header/Header'
import getPageSlugs from '@/common/helpers/getPageSlugs'

type Params = Promise<{ locale: string; slug: string }>
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  // Ensure that the incoming `locale` is valid
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const menuData = await getHeaderData({ slug, lang: getNameFromLocale(locale) })
  const { pageData: data } = await getPageDataForHeader({ slug: '', lang: getNameFromLocale(locale) })
  const slugs = getPageSlugs(data.pageData)
  return (
    <>
      {/*           <div className={`flex flex-col [:not(:has(.sticky-menu))]:pt-topbar`}> */}
      <Header slugs={slugs} menuData={menuData} stickyMenuData={data.pageData?.stickyMenu} />
      {children}
      {/*           </div> */}
    </>
  )
}
