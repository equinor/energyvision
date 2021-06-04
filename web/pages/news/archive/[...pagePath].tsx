//import NewsArchiveHead from './NewsArchiveHead'
import { GetStaticPaths, GetStaticProps } from 'next'
import * as fs from 'fs'

export type pageResponseData = {
  title: string
  description: string
  content: string
}

const OldArchivedNewsPage = ({ title, description, content }: pageResponseData): JSX.Element => {
  return (
    <>
      {/*   <NewsArchiveHead title={title} description={description} /> */}
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

//const archiveServerHostname = 'http://localhost:3010'

// @TODO: Language
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pagePathArray = params?.pagePath as string[]
  const pagePath = pagePathArray.join('/')

  // @TODO: I don't understand the archive or not part of the url
  // const response = await fetch(`${archiveServerHostname}/en/news/archive/${pagePath}.json`)

  // const response = await fetch(`${archiveServerHostname}/en/news/${pagePath}.json`)
  const response = await fetch(`https://envis-legacy.azureedge.net/legacy/en/news/${pagePath}.json`)
  const pageDate = await response.json()

  console.log('page data', pageDate)
  return {
    props: {
      title: pageDate.title,
      description: pageDate.description,
      content: pageDate.content,
    },
  }
}

const removeHTMLExtension = (path: string): string => {
  return path.replace('.html', '')
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = []

  const newsPagesList = fs
    .readFileSync(process.cwd() + `/pages/news/archive/resources/news2016To2018.txt`)
    .toString()
    .replace(/\r/g, '')
    .split(/\n/)

  newsPagesList.map((pagePath: string) => {
    const pageName = removeHTMLExtension(pagePath.substr(pagePath.lastIndexOf('/') + 1))

    paths.push(pageName)
  })

  // Only static generate a couple of the pages for testing purposes
  const slicedPaths = paths.slice(0, 9)

  return {
    paths: slicedPaths.map((pagePath: string) => ({ params: { pagePath: [pagePath] } })),
    fallback: true,
  }
}

export default OldArchivedNewsPage
