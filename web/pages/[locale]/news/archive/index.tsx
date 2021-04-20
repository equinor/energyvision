import {
  getArchivedNewsList,
  getSupportedLocalesAsStaticPathParams
} from './archive-utils'
import {GetStaticPaths, GetStaticProps} from "next";
import {Link} from "@components";

const allArchivedNews = (newsList: string[]): JSX.Element => {
  return (
    <>
      <h2> 2016 to 2018 archived news page list</h2>
      <ul>
        {newsList.map((value) => (
          <li key={value}>
            <Link href={value}>
              {value}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const newsList = getArchivedNewsList(params?.locale as string)
  return {
    props: {
      newsList: newsList,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const supportedLocales = getSupportedLocalesAsStaticPathParams()
  return {
    paths: supportedLocales,
    fallback: false
  }
}

export default allArchivedNews


