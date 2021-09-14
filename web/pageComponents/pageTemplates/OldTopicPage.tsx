import { NextSeo } from 'next-seo'
import ErrorPage from 'next/error'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// TODO fix the eslint issues
import archivedStyles from '@equinor/energyvision-legacy-css'

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
      <style jsx global>
        {archivedStyles}
      </style>
      <div
        dangerouslySetInnerHTML={{
          __html: data?.content,
        }}
      />
    </>
  )
}

export default OldTopicPage
