import { archiveServerHostname, getOldArchivedNewsStaticPaths, pageResponseData } from './archive-utils'
import NewsArchiveHead from './NewsArchiveHead'
import { GetStaticPaths, GetStaticProps } from 'next'

const OldArchivedNewsPage = ({ title, description, content }: pageResponseData): JSX.Element => {
  return (
    <>
      <NewsArchiveHead title={title} description={description} />
      {/* Header */}
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      {/* Footer */}
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pagePathArray = params?.pagePath as string[]
  const pagePath = pagePathArray.join('/')
  const response = await fetch(`${archiveServerHostname}/${params?.locale}/news/archive/${pagePath}.json`)
  const pageDate = await response.json()

  return {
    props: {
      title: pageDate.title,
      description: pageDate.description,
      content: pageDate.content,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pathsList = getOldArchivedNewsStaticPaths()
  return {
    paths: pathsList,
    fallback: false,
  }
}

export default OldArchivedNewsPage
