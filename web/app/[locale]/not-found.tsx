import { getLocale } from 'next-intl/server'
import { getNameFromLocale } from '@/sanity/helpers/localization'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { pageNotFoundQuery } from '@/sanity/queries/pageNotFound'
import NotFoundPage from '@/templates/notFound/NotFoundPage'

// Note that `app/[locale]/[...slug]/page.tsx`
// is necessary for this page to render.
export default async function NotFound() {
  const locale = await getLocale()
  const { data: pageData } = await sanityFetch({
    query: pageNotFoundQuery,
    params: { lang: getNameFromLocale(locale) },
    tags: ['notFound'],
  })

  return <NotFoundPage {...pageData} />
}
