import { ImageWithCaptionData } from '../../../types'
import { ingressForNewsQuery } from '../../../lib/queries/common/newsSubqueries'
import { publishDateTimeQuery } from '../../../lib/queries/common/publishDateTime'
import { PortableTextBlock } from '@portabletext/types'

export type LatestNewsType = {
  _id: string
  slug: string
  title: string
  publishDateTime: string
  hero: ImageWithCaptionData
  ingress: PortableTextBlock
}

export const latestNews = /* groq */ `
  *[_type == "news" && _lang == $lang ][0...20] | order(${publishDateTimeQuery} desc) {
    _id,
    "slug": slug.current,
    title,
    "hero": heroImage,
    "publishDateTime": ${publishDateTimeQuery},
    ${ingressForNewsQuery},
  }
`
