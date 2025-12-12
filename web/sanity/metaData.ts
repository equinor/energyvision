import { sameLang } from './queries/common/langAndDrafts'
import {
  lastUpdatedTimeQuery,
  publishDateTimeQuery,
} from './queries/common/publishDateTime'
import { seoAndSomeFields } from './queries/common/seoAndSomeFields'

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
    "translationSlugs": *[_type == "translation.metadata" && references(^.id)].translations[].value->{
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
    "slugs": {${contentRefSlugsQuery}},
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
    "slugs": {${singletonsSlugsQuery}}
  }[0]
`
export const newsPageMetaQuery = /* groq */ `
  *[_type == "news" && ${sameLang} && slug.current == $slug] {
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
    "slugs": {${inlineSlugsQuery}}
  }[0]
`

export const magazineroomMetaQuery = /* groq */ `
  *[_type == "magazineIndex" && ${sameLang}] {
    _id, //used for data filtering
    "title": title,
    "heroImage": heroFigure,
    "seoAndSome": ${seoAndSomeFields},
    "template": _type,
    "slugs": {${singletonsSlugsQuery}}
  }[0]
`

export const magazinePageMetaQuery = /* groq */ `
  *[_type == "magazine" && ${sameLang} && slug.current == $slug] {
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
    "slugs": {${inlineSlugsQuery}}
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
    "slugs": {${inlineSlugsQuery}},
  }[0]
`
