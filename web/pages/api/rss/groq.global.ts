import { ImageWithCaptionData } from '../../../types'
import { ingressForNewsQuery } from '../../../lib/queries/common/newsSubqueries'
import { publishDateTimeQuery } from '../../../lib/queries/common/publishDateTime'
import { PortableTextBlock } from '@portabletext/types'
import { excludeCrudeOilAssays } from '../../../lib/queries/news'
import { sameLang } from '../../../lib/queries/common/langAndDrafts'

export type LatestNewsType = {
  _id: string
  slug: string
  title: string
  publishDateTime: string
  hero: ImageWithCaptionData
  ingress: PortableTextBlock
}

export const latestNews = /* groq */ `
  *[_type == "news" && ${excludeCrudeOilAssays} ${sameLang}] | order(${publishDateTimeQuery} desc)[0...20] {
    _id,
    "slug": slug.current,
    title,
    "hero": heroImage,
    "publishDateTime": ${publishDateTimeQuery},
    ${ingressForNewsQuery},
  }
`
