import Head from 'next/head'

type PageHeaderData = {
  title: string
  description: string
}
const NewsArchiveHead = ({ title }: PageHeaderData): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  )
}

export default NewsArchiveHead
