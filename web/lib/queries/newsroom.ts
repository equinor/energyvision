import linkSelectorFields, { linkReferenceFields } from './common/actions/linkSelectorFields'
import markDefs from './common/blockEditorMarks'
import { noDrafts, sameLang } from './common/langAndDrafts'
import { ingressForNewsQuery } from './common/newsSubqueries'
import { lastUpdatedTimeQuery, publishDateTimeQuery } from './common/publishDateTime'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import slugsForNewsAndMagazine from './slugsForNewsAndMagazine'

//Order these after connecting articles, can find this in groq too?
export const allNewsTopicTags = /* groq */ `
*[_type == "tag" && ${noDrafts}]{
"id": _id,
"key": key.current,
"title":title[$lang],
"connectedNews": count(*[_type=='news' && ${sameLang} && ${noDrafts} && references(^._id)])
}`

export const allNewsCountryTags = /* groq */ `
*[_type == "countryTag" && ${noDrafts}] {
"id": _id,
"key": key.current,
"title":title[$lang],
"connectedNews": count(*[_type=='news' && ${sameLang} && ${noDrafts} && references(^._id)])
}`

export const allNewsYearTags = /* groq */ `{
    "newsYears": *[_type == "news" && ${sameLang} && ${noDrafts} ] | order(${publishDateTimeQuery} desc)
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

export const allNewsDocuments = /* groq */ `
*[_type == "news" && ${sameLang} && ${noDrafts} ] | order(${publishDateTimeQuery} desc)[0...20] {
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

const topicFilter = /* groq */ `
&& count(tags[_ref in $tags[]]) > 0
`
const countryFilter = /* groq */ `
&& count(countryTags[_ref in $countryTags[]]) > 0
`
const yearFilter = /* groq */ `
&& string::split(${publishDateTimeQuery},'-')[0] in $years
`
//&& (${publishDateTimeQuery} < $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id < $lastId))
const prevDirectionFilter = /* groq */ `
&& (${publishDateTimeQuery} < $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id < $lastId))
`
//&& (${publishDateTimeQuery} > $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id > $lastId))
const nextDirectionFilter = /* groq */ `
&& (${publishDateTimeQuery} > $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id > $lastId))
`

export const getNewsByFilters = (
  hasTopic = false,
  hasCountry = false,
  hasYear = false,
  hasFirstId = false,
  hasLastId = false,
) => /* groq */ `
  *[_type == 'news' && ${sameLang} && ${noDrafts}
  ${hasLastId ? nextDirectionFilter : ''}
  ${hasFirstId ? prevDirectionFilter : ''}
  ${hasTopic ? topicFilter : ''}
  ${hasCountry ? countryFilter : ''}
  ${hasYear ? yearFilter : ''}
  ] | order(${publishDateTimeQuery} desc)[0...20]{
    "type": _type,
    "id": _id,
    "updatedAt":  ${lastUpdatedTimeQuery},
    title,
    heroImage,
    "publishDateTime": ${publishDateTimeQuery},
    "slug": slug.current,
    ${ingressForNewsQuery},
    "tags":tags[]->{
    "label": key.current
  },
  "countryTags":countryTags[]->{
    "label": key.current
  },
  }
`
