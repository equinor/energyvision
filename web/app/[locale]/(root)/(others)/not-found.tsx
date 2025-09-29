import { getNameFromLocale } from '@/lib/localization'
import { getPageData } from '@/sanity/lib/fetchData'
import { pageNotFoundQuery } from '@/sanity/queries/pageNotFound'
import NotFoundPage from '@/templates/notFound/NotFoundPage'
import { getLocale } from 'next-intl/server'

// Note that `app/[locale]/[...slug]/page.tsx`
// is necessary for this page to render.
export default async function NotFound() {
  const locale = await getLocale()
  const { pageData } = await getPageData({
    query: pageNotFoundQuery,
    queryParams: { lang: getNameFromLocale(locale) },
  })

  return <NotFoundPage {...pageData} />
}
