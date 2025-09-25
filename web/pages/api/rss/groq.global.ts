import { ImageWithCaptionData } from '../../../types'
import { ingressForNewsQuery } from '../../../lib/queries/common/newsSubqueries'
import { newsletterPublishDateTimeQuery } from '../../../lib/queries/common/publishDateTime'
import { PortableTextBlock } from '@portabletext/types'
import { noDrafts, sameLang } from '../../../lib/queries/common/langAndDrafts'
import { functions } from '../../../lib/queries/common/functions'

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
  *[_type == "news" && defined(subscriptionType) && ${sameLang} && ${noDrafts}] | order(${newsletterPublishDateTimeQuery} desc)[0...5] {
    _id,
    "type":_type,
    "slug": slug.current,
    title,
    "hero": heroImage,
    subscriptionType,
    "publishDateTime": ${newsletterPublishDateTimeQuery},
    ${ingressForNewsQuery},
    lang
  }
`
export const latestMagazine = /* groq */ `
${functions}
  *[_type == "magazine" && shouldDistributeMagazine && ${sameLang} && ${noDrafts}] | order(${newsletterPublishDateTimeQuery} desc)[0...5] {
    _id,
    "type":_type,
    "slug": slug.current,
    title,
    "hero": heroFigure,
    "publishDateTime": ${newsletterPublishDateTimeQuery},
    ${ingressForNewsQuery},
    lang
  }
`
