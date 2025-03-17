import { ImageWithCaptionData } from '../../../types'
import { ingressForNewsQuery } from '../../../lib/queries/common/newsSubqueries'
import { publishDateTimeQuery } from '../../../lib/queries/common/publishDateTime'
import { PortableTextBlock } from '@portabletext/types'
import { noDrafts, sameLang } from '../../../lib/queries/common/langAndDrafts'

export type LatestNewsType = {
  _id: string
  slug: string
  title: string
  publishDateTime: string
  hero: ImageWithCaptionData
  ingress: PortableTextBlock
  subscriptionType: string
  lang: string
}

export const latestNews = /* groq */ `
  *[_type == "news" && ${sameLang} && ${noDrafts}] | order(${publishDateTimeQuery} desc)[0...5] {
    _id,
    "slug": slug.current,
    title,
    "hero": heroImage,
    subscriptionType,
    "publishDateTime": ${publishDateTimeQuery},
    ${ingressForNewsQuery},
    lang
  }
`
