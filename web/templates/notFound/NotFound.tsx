'use client'

import BackgroundImage from '@/pageComponents/errorPages/BackgroundImage'
import { Typography } from '@/core/Typography'
import { toPlainText } from '@portabletext/react'
import Blocks from '@/pageComponents/shared/portableText/Blocks'
import { getPageData } from '@/sanity/lib/fetchData'
import { pageNotFoundQuery } from '@/sanity/queries/pageNotFound'
import { getNameFromLocale } from '@/lib/localization'
import { useLocale } from 'next-intl'

/* const fetchPageData = async (locale: string) => {
  const { pageData } = await getPageData({
    query: pageNotFoundQuery,
    queryParams: { lang: getNameFromLocale(locale) },
  })
  return pageData
} */

export default function NotFound({ backgroundImage, title, text }: { title?: any; backgroundImage?: any; text?: any }) {
  const locale = useLocale()
  console.log('notFound locale', locale)

  /*   const { backgroundImage, title, text } = pageData */

  return (
    <div className="relative min-h-[80vh]">
      NOT FOUND CLIENT COMPONENT
      {/*       {backgroundImage && <BackgroundImage backgroundImage={backgroundImage} />}
      <div className="relative pt-16 pb-10 px-layout-md">
        <Typography as="h1" className="pb-10 " variant="3xl">
          <span className="text-5xl block font-medium text-slate-blue-80">404</span>
          {title && <span>{toPlainText(title)}</span>}
        </Typography>
        {text && <Blocks className="prose-md" value={text}></Blocks>}
      </div> */}
    </div>
  )
}
