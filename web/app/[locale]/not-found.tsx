import { useLocale } from 'next-intl'
import { getPageData } from '@/sanity/lib/fetchData'
import { pageNotFoundQuery } from '@/sanity/queries/pageNotFound'
import Error from 'next/error'
import { getNameFromLocale } from '@/lib/localization'
import BackgroundImage from '@/pageComponents/errorPages/BackgroundImage'
import { Typography } from '@/core/Typography'
import { toPlainText } from '@portabletext/react'
import Blocks from '@/pageComponents/shared/portableText/Blocks'

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default async function NotFound() {
  const locale = useLocale()
  console.log('[locale]>notFound locale', locale)
  const { pageData } = await getPageData({
    query: pageNotFoundQuery,
    queryParams: { lang: getNameFromLocale(locale) },
  })
  const { backgroundImage, title, text } = pageData
  return (
    <div className="relative min-h-[80vh]">
      {backgroundImage && <BackgroundImage backgroundImage={backgroundImage} />}
      <div className="relative pt-16 pb-10 px-layout-md">
        <Typography as="h1" className="pb-10 " variant="3xl">
          <span className="text-5xl block font-medium text-slate-blue-80">404</span>
          {title && <span>{toPlainText(title)}</span>}
        </Typography>
        {text && <Blocks className="prose-md" value={text}></Blocks>}
      </div>
    </div>
  )
}
