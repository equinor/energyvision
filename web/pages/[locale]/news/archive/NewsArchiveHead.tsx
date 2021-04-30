import Head from "next/head";

//const styleSheetLocation = `/etc.clientlibs/z/clientlibs/clientlib.min.de138a71a0f77931f77c17c829588101.css`

type PageHeaderData = {
  title: string
  description: string
}
const NewsArchiveHead = ({title}: PageHeaderData): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
  )
}

export default NewsArchiveHead
