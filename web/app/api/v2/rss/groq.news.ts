import { ImageWithCaptionData } from '../../../../types'
import { ingressForNewsQuery } from '../../../../lib/queries/common/newsSubqueries'
import { publishDateTimeQuery } from '../../../../lib/queries/common/publishDateTime'
import { PortableTextBlock } from '@portabletext/types'
import { excludeCrudeOilAssays } from '../../../../lib/queries/news'
import { noDrafts, sameLang } from '../../../../lib/queries/common/langAndDrafts'

export type LatestNewsType = {
  _id: string
  slug: string
  title: string
  subscriptionType: string
  publishDateTime: string
  hero: ImageWithCaptionData
  ingress: PortableTextBlock
}

export const latestNews = /* groq */ `
  *[_type == "news" && ${excludeCrudeOilAssays} ${sameLang} && ${noDrafts}] | order(${publishDateTimeQuery} desc)[0...20] {
    _id,
    "slug": slug.current,
    title,
    subscriptionType,
    "hero": heroImage,
    "publishDateTime": ${publishDateTimeQuery},
    ${ingressForNewsQuery},
  }
`
