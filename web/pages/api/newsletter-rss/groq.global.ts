import type { PortableTextBlock } from '@portabletext/types'
import { functions } from '../../../lib/queries/common/functions'
import { noDrafts, sameLang } from '../../../lib/queries/common/langAndDrafts'
import { ingressForNewsQuery } from '../../../lib/queries/common/newsSubqueries'
import { publishDateTimeQuery } from '../../../lib/queries/common/publishDateTime'
import type { ImageWithCaptionData } from '../../../types'

export type LatestNewsType = {
  _id: string
  type: string
  slug: string
  title: string | PortableTextBlock[]
  publishDateTime: string
  hero: ImageWithCaptionData
  ingress: PortableTextBlock
  subscriptionType: string
  lang: string
}

//add groq to collect only ones with category

export const latestNews = /* groq */ `
${functions}
  *[_type == "news" && ((defined(subscriptionType) && ${sameLang}) || subscriptionType == "Crude") && ${noDrafts}] | order(${publishDateTimeQuery} desc)[0...5] {
    _id,
    "type":_type,
    "slug": slug.current,
    title,
    "hero": heroImage,
    subscriptionType,
    "publishDateTime": ${publishDateTimeQuery},
    ${ingressForNewsQuery},
    lang
  }
`
export const latestMagazine = /* groq */ `
${functions}
  *[_type == "magazine" && shouldDistributeMagazine && ${sameLang} && ${noDrafts}] | order(${publishDateTimeQuery} desc)[0...5] {
    _id,
    "type":_type,
    "slug": slug.current,
    title,
    "hero": heroFigure,
    "publishDateTime": ${publishDateTimeQuery},
    ${ingressForNewsQuery},
    lang
  }
`
