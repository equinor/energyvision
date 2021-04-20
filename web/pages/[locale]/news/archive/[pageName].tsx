import NewsArchiveHead from "./NewsArchiveHead";
import {GetStaticPaths, GetStaticProps} from "next";
import {
  archiveServerHostname,
  get2016To2018NewsStaticPaths,
  pageResponseData
} from "./archive-utils";

const NewsPage2016To2018 = ({title, description, content}: pageResponseData): JSX.Element => {
  return (
    <>
      <NewsArchiveHead title={title}
                       description={description}/>
      {/* Header */}
      <div
        dangerouslySetInnerHTML={{
          __html: content
        }}/>
      {/* Footer */}
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const response = await fetch(`${archiveServerHostname}/${params?.locale}/news/${params?.pageName}.json`)
  const pageDate = await response.json()
  return {
    props: {
      pageData: pageDate,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pathsList = get2016To2018NewsStaticPaths()
  return {
    paths: pathsList,
    fallback: false
  }
}

export default NewsPage2016To2018
