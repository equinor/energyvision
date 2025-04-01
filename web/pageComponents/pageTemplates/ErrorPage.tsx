import { NextSeo } from 'next-seo'
import { toPlainText } from '@portabletext/react'
import { Heading, Text } from '@components'
import RichText from '../shared/portableText/RichText'
import isEmpty from '../shared/portableText/helpers/isEmpty'
import BackgroundImage from '../errorPages/BackgroundImage'
import type { ErrorPageData } from '../../types/index'
import { metaTitleSuffix } from '../../languages'

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
          <Heading level="h1" size="3xl" style={{ marginBottom: 'var(--space-xLarge)' }}>
            <span className="text-4xl block font-medium text-slate-blue-80">404</span>
            {title && <span>{toPlainText(title)}</span>}
          </Heading>
          {text && (
            <div>
              <RichText
                components={{
                  block: {
                    // Overriding the h2
                    h2: ({ children }) => (
                      <Heading level="h2" size="xl">
                        {children}
                      </Heading>
                    ),
                    normal: ({ children }) => {
                      // eslint-disable-next-line
                      // @ts-ignore: Still struggling with the types here :/
                      if (isEmpty(children)) return null
                      return <Text style={{ fontSize: 'var(--typeScale-3)' }}>{children}</Text>
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
