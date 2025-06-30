import { defaultLanguage } from '../../../languages'

export const sameLang = /* groq */ `
  lang == $lang
`

export const fixPreviewForDrafts = /* groq */ `
  ((defined(lang) && ${sameLang}) || (!defined(lang) && $lang == "${defaultLanguage.name}"))
`
