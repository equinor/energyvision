import linkSelectorFields from './common/actions/linkSelectorFields'
import markDefs from './common/blockEditorMarks'
import { functions } from './common/functions'
import { sameLang } from './common/langAndDrafts'
import { ingressForNewsQuery } from './common/newsSubqueries'
import { publishDateTimeQuery } from './common/publishDateTime'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import { inlineSlugsQuery, singletonsSlugsQuery } from './metaData'

export const newsroomQuery = /* groq */ `
  ${functions}
  *[_type == "newsroom" && ${sameLang}] {
    _id,
    "seoAndSome": ${seoAndSomeFields},
    title,
    ingress[]{
      ...,
      ${markDefs},
    },
    "slugs": {${singletonsSlugsQuery}},
    subscriptionHeading,
    "subscriptionLink": links::getLinkFields(subscriptionLink),
    subscriptionLinkTitle,
    localNewsPagesHeading,
    localNewsPages[]{
      ${linkSelectorFields},
    },
    backgroundImage,
    "fallbackImages": imageThumbnailFallbacks[]{...}
}[0]`

const prevDirectionFilter = /* groq */ `
&& (${publishDateTimeQuery} > $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id > $lastId))
`

const nextDirectionFilter = /* groq */ `
&& (${publishDateTimeQuery} < $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id < $lastId))
`

export const allNewsDocuments = /* groq */ `
*[_type == "news" && ${sameLang} ] | order(${publishDateTimeQuery} desc)[0...30] {
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
"slugs":{${inlineSlugsQuery}},
${ingressForNewsQuery},
}`

export const getNewsArticlesByPage = (
  hasFirstId = false,
  hasLastId = false,
) => /* groq */ `
*[_type == 'news' && ${sameLang}
  ${hasLastId ? nextDirectionFilter : ''}
  ${hasFirstId ? prevDirectionFilter : ''}
  ] | order(${publishDateTimeQuery} desc)[0...30]{
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
"slugs":{${inlineSlugsQuery}},
${ingressForNewsQuery},
  }
`
