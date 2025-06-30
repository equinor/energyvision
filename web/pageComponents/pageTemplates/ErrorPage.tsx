import { NextSeo } from 'next-seo'
import { toPlainText } from '@portabletext/react'
import Blocks from '../shared/portableText/Blocks'
import BackgroundImage from '../errorPages/BackgroundImage'
import type { ErrorPageData } from '../../types/index'
import { metaTitleSuffix } from '../../languages'
import { Typography } from '@/core/Typography'

const ErrorPage = ({ pageData, statusCode }: { pageData: ErrorPageData; statusCode: 404 | 500 }) => {
  if (!pageData) return null
  const { title = '', text = '', backgroundImage } = pageData

  return (
    <>
      <NextSeo
        title={`${pageData?.documentTitle} - ${metaTitleSuffix}`}
        description={pageData?.metaDescription}
      ></NextSeo>
      <div className="relative min-h-[80vh]">
        {backgroundImage && <BackgroundImage backgroundImage={backgroundImage} />}
        <div className="relative pt-16 pb-10 px-layout-md">
          <Typography as="h1" className="pb-10 " variant="3xl">
            <span className="text-5xl block font-medium text-slate-blue-95">{statusCode}</span>
            {title && <span>{toPlainText(title)}</span>}
          </Typography>
          {text && <Blocks className="prose-md" value={text}></Blocks>}
        </div>
      </div>
    </>
  )
}
export default ErrorPage
