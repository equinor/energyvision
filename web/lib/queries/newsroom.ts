import linkSelectorFields, { linkReferenceFields } from './common/actions/linkSelectorFields'
import markDefs from './common/blockEditorMarks'
import { noDrafts, sameLang } from './common/langAndDrafts'
import { ingressForNewsQuery } from './common/newsSubqueries'
import { publishDateTimeQuery } from './common/publishDateTime'
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
    "subscriptionLink": subscriptionLink->${linkReferenceFields},
    subscriptionLinkTitle,
    localNewsPagesHeading,
    localNewsPages[]{
      ${linkSelectorFields},
    },
    backgroundImage,
    "fallbackImages": imageThumbnailFallbacks[]{...}
}`

const prevDirectionFilter = /* groq */ `
&& (coalesce(publishDateTime,firstPublishedAt, _createdAt) < $lastPublishedAt || (coalesce(publishDateTime,firstPublishedAt, _createdAt) == $lastPublishedAt && _id < $lastId))
`

const nextDirectionFilter = /* groq */ `
&& (coalesce(publishDateTime,firstPublishedAt, _createdAt) > $lastPublishedAt || (coalesce(publishDateTime,firstPublishedAt, _createdAt) == $lastPublishedAt && _id > $lastId))
`

export const allNewsDocuments = /* groq */ `
*[_type == "news" && ${sameLang} && ${noDrafts} ] | order(${publishDateTimeQuery} desc)[0...5] {
"id": _id,
"updatedAt": _updatedAt,
title,
heroImage,
"slug": slug.current,
"tags":tags[]->{
  "key": key.current,
  "label":title[$lang],
},
"countryTags":countryTags[]->{
  "key": key.current,
  "label":title[$lang],
},
"publishDateTime": ${publishDateTimeQuery},
${slugsForNewsAndMagazine},
${ingressForNewsQuery},
}`

export const getNewsArticlesByPage = (hasFirstId = false, hasLastId = false) => /* groq */ `
*[_type == 'news' && ${sameLang} && ${noDrafts}
  ${hasLastId ? nextDirectionFilter : ''}
  ${hasFirstId ? prevDirectionFilter : ''}
  ] | order(${publishDateTimeQuery} desc)[0...5]{
"id": _id,
"updatedAt": _updatedAt,
"slug": slug.current,
title,
heroImage,
"tags":tags[]->{
  "key": key.current,
  "label":title[$lang],
},
"countryTags":countryTags[]->{
  "key": key.current,
  "label":title[$lang],
},
"publishDateTime": ${publishDateTimeQuery},
${slugsForNewsAndMagazine},
${ingressForNewsQuery},
  }
`
