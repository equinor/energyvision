import { NextSeo } from 'next-seo'
import { toPlainText } from '@portabletext/react'
import { Typography } from '@core/Typography'
import BackgroundImage from '../errorPages/BackgroundImage'
import type { ErrorPageData } from '../../types/index'
import { metaTitleSuffix } from '../../languages'
import Blocks from '../../pageComponents/shared/portableText/Blocks'

const ErrorPage = ({ pageData, statusCode }: { pageData: ErrorPageData; statusCode: 404 | 500 }) => {
  if (!pageData) return null
  const { title = '', text = '', backgroundImage } = pageData

  return (
    <>
      <NextSeo
        title={`${pageData?.documentTitle} - ${metaTitleSuffix}`}
        description={pageData?.metaDescription}
      ></NextSeo>
      <div className="relative">
        {backgroundImage && <BackgroundImage backgroundImage={backgroundImage} />}
        <div className="relative pt-16 pb-10 px-layout-md">
          <Typography as="h1" variant="3xl" className="pb-10">
            <span className="font-medium text-5xl text-slate-blue-80 w-full block">{statusCode}</span>
            {title && toPlainText(title)}
          </Typography>
          {text && <Blocks className="prose-md" value={text}></Blocks>}
        </div>
      </div>
    </>
  )
}
export default ErrorPage
