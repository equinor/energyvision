import markDefs from './common/blockEditorMarks'
import { noDrafts, sameLang } from './common/langAndDrafts'
import { ingressForNewsQuery } from './common/newsSubqueries'
import { lastUpdatedTimeQuery, publishDateTimeQuery } from './common/publishDateTime'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import slugsForNewsAndMagazine from './slugsForNewsAndMagazine'

export const newsroomQuery = /* groq */ `
  *[_type == "newsroom" && ${sameLang}] {
    _id,
    "seoAndSome": ${seoAndSomeFields},
    title,
    ingress[]{
      ...,
      ${markDefs},
    },
    subscriptionHeading,
    subscriptionLink,
    subscriptionLinkTitle,
    localNewsPagesHeading,
    localNewsPages[]{
      ...
    },
    backgroundImage
  }`

export const allNewsDocuments = /* groq */ `
*[_type == "news" && ${sameLang} && ${noDrafts} ] | order(${publishDateTimeQuery} desc)[0...10] {
"id": _id,
"updatedAt": _updatedAt,
title,
heroImage,
"publishDateTime": ${publishDateTimeQuery},
${slugsForNewsAndMagazine},
${ingressForNewsQuery},
}`

export const allNewsTopicTags = /* groq */ `
*[_type == "tag" && ${noDrafts}]{
"id": _id,
"key": key.current,
"title":title[$lang]
}`
export const allNewsCountryTags = /* groq */ `
*[_type == "countryTag" && ${noDrafts}]{
"id": _id,
"key": key.current,
"title":title[$lang]
}`

export const getNewsByTopic = /* groq */ `
  *[_type == "news"
    && count(tags[_ref in $tags[].id]) > 0
    && ${sameLang} && ${noDrafts})
  ] | order(${publishDateTimeQuery} desc)[0...3]{
    "type": _type,
    "id": _id,
    "updatedAt":  ${lastUpdatedTimeQuery},
    title,
    heroImage,
    "publishDateTime": ${publishDateTimeQuery},
    "slug": slug.current,
    ${ingressForNewsQuery},
  }
`

export const getNewsByCountryAndOrTopicAndOrYear = /* groq */ `
  *[_type == 'news'
    && count(tags[_ref in $tags[].id]) > 0
    && ${sameLang} && ${noDrafts}
  ] | order(${publishDateTimeQuery} desc){
    "type": _type,
    "id": _id,
    "updatedAt":  ${lastUpdatedTimeQuery},
    title,
    heroImage,
    "publishDateTime": ${publishDateTimeQuery},
    "slug": slug.current,
    ${ingressForNewsQuery},
  }
`
