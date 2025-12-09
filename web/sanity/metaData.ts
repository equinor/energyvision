import { sameLang } from './queries/common/langAndDrafts'
import {
  lastUpdatedTimeQuery,
  publishDateTimeQuery,
} from './queries/common/publishDateTime'
import { seoAndSomeFields } from './queries/common/seoAndSomeFields'

const slugsQuery = /* groq */ `
    "currentSlug": defined(slug.current){
      "slug": slug.current,
      "lang":$lang,
    },
    "slugsFromTranslations": *[_type == "translation.metadata" && references(^.content._ref)].translations[].value->{
    "slug":*[_type match "route*" && content._ref == ^._id][0].slug.current,
    lang,
}`
const singletonsQuery = /* groq */ `
      "currentSlug": *[(_type match "route_" + $lang) && references(^._id)][0].slug.current,
      "translations": *[_type == "translation.metadata" && references(^._id)].translations[],
      "translationSlugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      "slug" : *[_type match "route*" && references(^._id)][0].slug.current, 
      lang
`

export const newsroomMetaQuery = /* groq */ `
  *[_type == "newsroom" && ${sameLang}] {
    _id, //used for data filtering
    "title": title,
    "seoAndSome": ${seoAndSomeFields},
    "template": _type,
    "slugs": {
        ${slugsQuery}
    }
  }[0]
`

export const magazineroomMetaQuery = /* groq */ `
  *[_type == "magazineIndex" && ${sameLang}] {
    _id, //used for data filtering
    "title": title,
    "seoAndSome": ${seoAndSomeFields},
    "template": _type,
  }[0]
`

export const magazinePageMetaQuery = /* groq */ `
  *[_type == "magazine" && ${sameLang} && slug.current == $slug] {
    _id, //used for data filtering
    title,
    "slug": slug.current,
    "seoAndSome":{
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    openGraphImage,
    },
    "template": _type,
    "publishDateTime": ${publishDateTimeQuery},
    "firstPublishedAt": coalesce(firstPublishedAt, _createdAt),
    "updatedAt":  ${lastUpdatedTimeQuery},
  }[0]
`

export const localNewsMetaQuery = /* groq */ `
  *[_type == "localNews" && ${sameLang} && slug.current == $slug] {
    _id, //used for data filtering
    title,
    "slug": slug.current,
    "seoAndSome":{
        "documentTitle": seo.documentTitle,
        "metaDescription": seo.metaDescription,
        openGraphImage,
    },
    "template": _type,
    "publishDateTime": ${publishDateTimeQuery},
    "updatedAt":  ${lastUpdatedTimeQuery},
  }[0]
`
