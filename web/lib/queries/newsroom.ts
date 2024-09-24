import linkSelectorFields, { linkReferenceFields } from './common/actions/linkSelectorFields'
import markDefs from './common/blockEditorMarks'
import { noDrafts, sameLang } from './common/langAndDrafts'
import { ingressForNewsQuery } from './common/newsSubqueries'
import { lastUpdatedTimeQuery, publishDateTimeQuery } from './common/publishDateTime'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import slugsForNewsAndMagazine from './slugsForNewsAndMagazine'

// need to order this on _id because of pagination
export const allNewsDocuments = /* groq */ `
*[_type == "news" && ${sameLang} && ${noDrafts} ] | order(_id)[0...50] {
"id": _id,
"updatedAt": _updatedAt,
title,
heroImage,
"tags":tags[]->{
  "label": key.current
},
"countryTags":countryTags[]->{
  "label": key.current
},
"publishDateTime": ${publishDateTimeQuery},
${slugsForNewsAndMagazine},
${ingressForNewsQuery},
}`

//&& (${publishDateTimeQuery} < $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id < $lastId))
const prevDirectionFilter = /* groq */ `
&& _id < $lastId
`
//&& (${publishDateTimeQuery} > $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id > $lastId))
const nextDirectionFilter = /* groq */ `
&& _id > $lastId
`
// dir
export const getNewsDocuments = (hasFirstId = false, hasLastId = false) => /* groq */ `
  *[_type == "news" && ${sameLang} && ${noDrafts}
  ${hasLastId ? nextDirectionFilter : ''}
  ${hasFirstId ? prevDirectionFilter : ''}] | order(_id)[0...20] {
  "id": _id,
  "updatedAt": _updatedAt,
  title,
  heroImage,
  "tags":tags[]->{
    "label": key.current
  },
  "countryTags":countryTags[]->{
    "label": key.current
  },
  "publishDateTime": ${publishDateTimeQuery},
  ${slugsForNewsAndMagazine},
  ${ingressForNewsQuery},
  }`

//Order these after connecting articles, can find this in groq too?
export const allNewsTopicTags = /* groq */ `
*[_type == "tag" && ${noDrafts}]{
"id": _id,
"key": key.current,
"title":title[$lang],
"connectedNews": count(*[_type=='news' && references(^._id)])
}`

export const allNewsCountryTags = /* groq */ `
*[_type == "countryTag" && ${noDrafts}] {
"id": _id,
"key": key.current,
"title":title[$lang],
"connectedNews": count(*[_type=='news' && references(^._id)])
}`

export const allNewsYearTags = /* groq */ `{
    "newsYears": *[_type == "news" && ${sameLang} ] | order(${publishDateTimeQuery} desc)
    {"years":string::split(${publishDateTimeQuery}, '-')[0]}.years,
  }.newsYears`

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

export const getNewsBySingleCriteria = (hasFirstId = false, hasLastId = false) => /* groq */ `
  *[_type == 'news' && ${sameLang} && ${noDrafts}
  ${hasLastId ? nextDirectionFilter : ''}
  ${hasFirstId ? prevDirectionFilter : ''}
  &&  
  ( count(tags[_ref in $tags[]]) > 0 || 
    count(countryTags[_ref in $countryTags[]]) > 0 || 
    string::split(${publishDateTimeQuery},'-')[0] match $years[]
  )
  ] | order(_id)[0...20]{
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
export const getNewsByTopicAndAnotherCriteria = (hasFirstId = false, hasLastId = false) => /* groq */ `
  *[_type == 'news' && ${sameLang} && ${noDrafts}
  ${hasLastId ? nextDirectionFilter : ''}
  ${hasFirstId ? prevDirectionFilter : ''} &&
  ( count(tags[_ref in $tags[]]) > 0 && 
    (string::split(${publishDateTimeQuery},'-')[0] match $years[] ||
      count(countryTags[_ref in $countryTags[]]) > 0)
  )
  ] | order(_id)[0...20]{
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
export const getNewsByCountryAndAnotherCriteria = (hasFirstId = false, hasLastId = false) => /* groq */ `
  *[_type == 'news' && ${sameLang} && ${noDrafts}
  ${hasLastId ? nextDirectionFilter : ''}
  ${hasFirstId ? prevDirectionFilter : ''}
  &&
  ( count(countryTags[_ref in $countryTags[]]) > 0 && 
    (string::split(${publishDateTimeQuery},'-')[0] match $years[] ||
      count(tags[_ref in $tags[]]) > 0)
  )
  ] | order(_id)[0...20]{
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
export const getNewsByYearAndAnotherCriteria = (hasFirstId = false, hasLastId = false) => /* groq */ `
  *[_type == 'news' && ${sameLang} && ${noDrafts}
  ${hasLastId ? nextDirectionFilter : ''}
  ${hasFirstId ? prevDirectionFilter : ''} 
  &&  
  ( string::split(${publishDateTimeQuery},'-')[0] match $years[] && 
    (count(countryTags[_ref in $countryTags[]]) > 0 || 
    count(tags[_ref in $tags[]]) > 0
    )
  )
  ]| order(_id)[0...20]{
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
export const getNewsByThreeCriteria = (hasFirstId = false, hasLastId = false) => /* groq */ `
  *[_type == 'news' && ${sameLang} && ${noDrafts}
  ${hasLastId ? nextDirectionFilter : ''}
  ${hasFirstId ? prevDirectionFilter : ''}
  &&  
  (string::split(${publishDateTimeQuery},'-')[0] match $years[] &&
    count(tags[_ref in $tags[]]) > 0 && 
    count(countryTags[_ref in $countryTags[]]) > 0
  )
  ]| order(_id)[0...20]{
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
