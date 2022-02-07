import { NextSeo } from 'next-seo'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'
import { anchorClick } from '../../common/helpers/staticPageHelpers'

type OldTopicPageProps = {
  data: {
    title: string
    description: string
    content: string
  }
}

const OldTopicPage = ({ data }: OldTopicPageProps): JSX.Element => {
  const router = useRouter()
  useEffect(() => {
    document.getElementById('legacyScript')?.remove()
    const scriptTag = document.createElement('script')
    scriptTag.src = '/legacy/legacy.minified.js'
    scriptTag.id = 'legacyScript'
    document.body.appendChild(scriptTag)
  }, [router.asPath])

  const onLinkClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    anchorClick(e, router)
  }
  const onLinkClickedKeyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.which == 32 || e.which == 13) {
      anchorClick(e, router)
    }
  }
  if (!data?.content) {
    return <ErrorPage statusCode={404} />
  }

  // cookiebot script should be beforeInterative..
  return (
    <>
      <NextSeo title={data?.title} description={data?.description}></NextSeo>
      <Head>
        {/*   This is the old stuff and it's important that we only load it for the static
        page. This is not an optimal solution but how much time should we spend on this... */}
        {/*  eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/styles/legacy.minified.test.css" />
        {/* eslint-disable jsx-a11y/html-has-lang */}
        <html data-template="old-topic" />
      </Head>

      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="legacyStyles"
        onClick={onLinkClicked}
        onKeyDown={onLinkClickedKeyHandler}
        dangerouslySetInnerHTML={{
          __html: data?.content,
        }}
      />
    </>
  )
}

export default OldTopicPage
