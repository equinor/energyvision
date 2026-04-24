import type { PortableTextBlock } from '@portabletext/types'
import type { Figure } from '@/core/Image/Image'
import markDefs from '@/sanity/queries/common/blockEditorMarks'
import { functions } from '@/sanity/queries/common/functions'
import { sameLang } from '@/sanity/queries/common/langAndDrafts'
import { publishDateTimeQuery } from '@/sanity/queries/common/publishDateTime'

export type LatestNewsType = {
  _id: string
  type: string
  slug: string
  title: string | PortableTextBlock[]
  publishDateTime: string
  hero: Figure
  ingress: PortableTextBlock
  subscriptionType: string
  lang: string
}
const publishedSinceYesterday = /* groq */ `
dateTime(${publishDateTimeQuery}) > dateTime(now()) - 86400
`
//add groq to collect only ones with category that has been published since yesterday

export const latestNews = /* groq */ `
${functions}
  *[_type == "news" &&  ${publishedSinceYesterday} &&  ((defined(subscriptionType) && ${sameLang}) || subscriptionType == "Crude")] | order(${publishDateTimeQuery} desc)[0...5] {
    _id,
    "type":_type,
    "slug": slug.current,
    title,
    "hero": heroImage,
    subscriptionType,
    "publishDateTime": ${publishDateTimeQuery},
    ingress[]{
    ...,
    ${markDefs},
    },
    lang
  }
`
export const latestMagazine = /* groq */ `
${functions}
  *[_type == "magazine" && shouldDistributeMagazine && ${sameLang} && ${publishedSinceYesterday}] | order(${publishDateTimeQuery} desc)[0...5] {
    _id,
    "type":_type,
    "slug": slug.current,
    title,
    "hero": heroFigure,
    "publishDateTime": ${publishDateTimeQuery},
    ingress[]{
    ...,
    ${markDefs},
    },
    lang
  }
`
