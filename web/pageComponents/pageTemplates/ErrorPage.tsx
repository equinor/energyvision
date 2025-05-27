import { NextSeo } from 'next-seo'
import { toPlainText } from '@portabletext/react'
import RichText from '../shared/portableText/RichText'
import isEmpty from '../shared/portableText/helpers/isEmpty'
import BackgroundImage from '../errorPages/BackgroundImage'
import type { ErrorPageData } from '../../types/index'
import { metaTitleSuffix } from '../../languages'
import { Typography } from '@core/Typography'

const ErrorPage = ({ pageData }: { pageData: ErrorPageData }) => {
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
          <Typography as="h1" variant="3xl" className="mb-10">
            <span className="text-4xl block font-medium text-slate-blue-80">404</span>
            {title && <span>{toPlainText(title)}</span>}
          </Typography>
          {text && (
            <div>
              <RichText
                components={{
                  block: {
                    // Overriding the h2
                    h2: ({ children }) => (
                      <Typography as="h2" variant="xl">
                        {children}
                      </Typography>
                    ),
                    normal: ({ children }) => {
                      // eslint-disable-next-line
                      // @ts-ignore: Still struggling with the types here :/
                      if (isEmpty(children)) return null
                      return <Typography className="text-lg">{children}</Typography>
                    },
                  },
                }}
                value={text}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default ErrorPage
