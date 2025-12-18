import { sameLang } from './common/langAndDrafts'
import {
  lastUpdatedTimeQuery,
  publishDateTimeQuery,
} from './common/publishDateTime'
import { seoAndSomeFields } from './common/seoAndSomeFields'

//page, magazine, landingpage,news, localnews, event
export const contentRefSlugsQuery = /* groq */ `
    "currentSlug": {
      "slug": slug.current,
      "lang":$lang,
    },
    "translationSlugs": *[_type == "translation.metadata" && references(^.content._ref)].translations[].value->{
      "slug" : *[_type match "route*" && references(^._id)][0].slug.current,
      lang
    }`
export const inlineSlugsQuery = /* groq */ `
    "currentSlug": {
      "slug": slug.current,
      lang
    },
    "translationSlugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      "slug": slug.current,
      lang
    }`
//newsroom, magazineIndex
export const singletonsSlugsQuery = /* groq */ `
      "currentSlug": {
        "slug": *[(_type match "route_" + $lang) && references(^._id)][0].slug.current,
        "lang":$lang,
      },
      "translationSlugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      "slug" : *[_type match "route*" && references(^._id)][0].slug.current, 
      lang,
      }
`

export const pageMetaQuery = /* groq */ `
  *[(_type match "route_" + $lang) && slug.current == $slug] {
    _id, //used for data filtering
    "slug": slug.current,
    "slugs": {${contentRefSlugsQuery}}.translationSlugs,
    "title": content->title,
    "heroImage": content->heroImage,
    "seoAndSome": content->${seoAndSomeFields},
    "template": content->_type,
  }[0]
`
export const homePageMetaQuery = /* groq */ `
*[_type == "translation.metadata" && references(*[_id=="route_homepage"][0].content._ref)][0].translations[_key==$lang][0].value->{
    "title": title,
    "seoAndSome": ${seoAndSomeFields},
    "heroImage": heroFigure,
    "slugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      lang,
    }
}
`
export const newsroomMetaQuery = /* groq */ `
  *[_type == "newsroom" && ${sameLang}] {
    _id, //used for data filtering
    "title": title,
    "seoAndSome": ${seoAndSomeFields},
    "template": _type,
    "slugs": {${singletonsSlugsQuery}}.translationSlugs
  }[0]
`
export const docWithSlugMetaQuery = /* groq */ `
  *[_type == $type && ${sameLang} && slug.current == $slug] {
    _id, //used for data filtering
    title,
    heroImage,
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
    "slugs": {${inlineSlugsQuery}}.translationSlugs
  }[0]
`
export const magazineroomMetaQuery = /* groq */ `
  *[_type == "magazineIndex" && ${sameLang}] {
    _id, //used for data filtering
    "title": title,
    "heroImage": heroFigure,
    "seoAndSome": ${seoAndSomeFields},
    "template": _type,
    "slugs": {${singletonsSlugsQuery}}.translationSlugs
  }[0]
`
