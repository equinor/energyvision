import { SeoData } from '../../types'
import { PortableTextBlock } from '@portabletext/types'
import { PortableText } from '@portabletext/react'

type NewsRoomPageTemplateProps = {
  locale?: string
  data?: any

  content?: any
  href?: string
}

const NewsRoomPageTemplate = ({ locale, data, content }: NewsRoomPageTemplateProps) => {
  const { pageData, newsList } = data
  const { ingress, title, seoAndSome } = pageData || {}
  console.log('page content', content)
  return (
    <>
      {/*       <Seo seoAndSome={seoAndSome} slug={slug} pageTitle={title} /> */}
      <main>
        {title && <PortableText value={title} />}
        <div>Dette er det nye nyhetsrommet</div>
      </main>
    </>
  )
}

export default NewsRoomPageTemplate
