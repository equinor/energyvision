import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import getConfig from 'next/config'
import { removeHTMLExtension } from '../../lib/archive/archiveUtils'
import { Menu } from '../shared/Menu'

const { publicRuntimeConfig } = getConfig()

type PageResponseData = {
  title: string
  description: string
  content: string
  slug: string
}

type OldTopicPageProps = {
  data: PageResponseData
}

const OldTopicPage = ({ data }: OldTopicPageProps): JSX.Element => {
  return (
          <div
            dangerouslySetInnerHTML={{
              __html: data?.content,
            }}
          />
  )
}

export default OldTopicPage
