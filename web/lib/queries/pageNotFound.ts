import markDefs from './common/blockEditorMarks'
import { functions } from './common/functions'
import { sameLang } from './common/langAndDrafts'

export const pageNotFoundQuery = /* groq */ `
${functions}
  *[_type == "pageNotFound" && ${sameLang}] {
    _id,
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    title,
    text[]{..., ${markDefs}},
    backgroundImage
  }
 `
