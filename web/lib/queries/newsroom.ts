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
    backgroundImage
  }`

export const allNewsDocuments = /* groq */ `
  *[_type == "news" && ${sameLang} && ${noDrafts} ] | order(${publishDateTimeQuery} desc)[0...10] {
  "id": _id,
  "updatedAt": _updatedAt,
  title,
  heroImage,
  "publishDateTime": ${publishDateTimeQuery},
  ${slugsForNewsAndMagazine('news')},
  ${ingressForNewsQuery},
  }`
