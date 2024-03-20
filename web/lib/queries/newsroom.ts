import markDefs from './common/blockEditorMarks'
import { sameLang } from './common/langAndDrafts'
import { seoAndSomeFields } from './common/seoAndSomeFields'

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
