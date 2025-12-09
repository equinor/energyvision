import { sameLang } from "./queries/common/langAndDrafts";
import { lastUpdatedTimeQuery, publishDateTimeQuery } from "./queries/common/publishDateTime";
import { seoAndSomeFields } from "./queries/common/seoAndSomeFields";

export const newsroomMetaQuery = /* groq */ `
  *[_type == "newsroom" && ${sameLang}] {
    _id, //used for data filtering
    "title": content->title,
    "seoAndSome": content->${seoAndSomeFields},
    "template": content->_type,
  }[0]
`

export const magazineroomMetaQuery = /* groq */ `
  *[_type == "magazineIndex" && ${sameLang}] {
    _id, //used for data filtering
    "title": content->title,
    "seoAndSome": content->${seoAndSomeFields},
    "template": content->_type,
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