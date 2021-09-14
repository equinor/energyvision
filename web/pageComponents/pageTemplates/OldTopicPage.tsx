import { NextSeo } from 'next-seo'
import ErrorPage from 'next/error'

type OldTopicPageProps = {
  data: {
    title: string
    description: string
    content: string
  }
}

const OldTopicPage = ({ data }: OldTopicPageProps): JSX.Element => {
  if (!data?.content) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <NextSeo title={data?.title} description={data?.description}></NextSeo>
      <div
        dangerouslySetInnerHTML={{
          __html: data?.content,
        }}
      />
    </>
  )
}

export default OldTopicPage
