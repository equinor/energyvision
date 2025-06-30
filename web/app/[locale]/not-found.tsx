'use client'
import { useLocale } from 'next-intl'
import { getComponentsData } from '@/sanity/lib/fetchData'
import { pageNotFoundQuery } from '@/sanity/queries/pageNotFound'
import Error from 'next/error'
import { getNameFromLocale } from '@/lib/localization'

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default async function NotFound() {
  const locale = useLocale()
  console.log('locale not found inside [locale]', locale)
  const { menuData, pageData, footerData } = await getComponentsData({
    pageNotFoundQuery,
    { lang: getNameFromLocale(locale)
     },
  })
  return (
    <div className="relative min-h-[80vh]">
      {backgroundImage && <BackgroundImage backgroundImage={backgroundImage} />}
      <div className="relative pt-16 pb-10 px-layout-md">
        <Typography as="h1" className="pb-10 " variant="3xl">
          <span className="text-5xl block font-medium text-slate-blue-80">{statusCode}</span>
          {title && <span>{toPlainText(title)}</span>}
        </Typography>
        {text && <Blocks className="prose-md" value={text}></Blocks>}
      </div>
    </div>
  )
}
