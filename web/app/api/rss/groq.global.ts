import type { PortableTextBlock } from '@portabletext/types'
import markDefs from '@/sanity/queries/common/blockEditorMarks'
import { functions } from '@/sanity/queries/common/functions'
import { sameLang } from '@/sanity/queries/common/langAndDrafts'
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

export const newsletterPublishDateTimeQuery = /* groq */ `
  select(
    customPublicationDate == true =>
      publishDateTime,
      coalesce(_updatedAt, firstPublishedAt, _createdAt)
  )
`

export const latestNews = /* groq */ `
${functions}
  *[_type == "news" && defined(subscriptionType) && ${sameLang}] | order(${newsletterPublishDateTimeQuery} desc)[0...5] {
    _id,
    "type":_type,
    "slug": slug.current,
    title,
    "hero": heroImage,
    subscriptionType,
    "publishDateTime": ${newsletterPublishDateTimeQuery},
    ingress[]{
    ...,
    ${markDefs},
    },
    lang
  }
`
export const latestMagazine = /* groq */ `
${functions}
  *[_type == "magazine" && shouldDistributeMagazine && ${sameLang}] | order(${newsletterPublishDateTimeQuery} desc)[0...5] {
    _id,
    "type":_type,
    "slug": slug.current,
    title,
    "hero": heroFigure,
    "publishDateTime": ${newsletterPublishDateTimeQuery},
    ingress[]{
    ...,
    ${markDefs},
    },
    lang
  }
`
