import {
  getArchivedNewsList,
  getSupportedLocalesAsStaticPathParams
} from './archive-utils'
import {Heading, Link, List} from "@components";
import {GetStaticPaths, GetStaticProps} from "next";

type OldLinks = {
  newsList: string[]
}
const allArchivedNews = ({newsList}: OldLinks): JSX.Element => {
  return (
    <>
      <Heading center={true}>2016 to 2018 archived news page list</Heading>
      <List>
        {newsList && newsList.map((value) => (
          <List.Item key={value}>
            <Link href={value}>
              {value}
            </Link>
          </List.Item>
        ))}
      </List>
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


