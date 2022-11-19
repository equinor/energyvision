import { defaultLanguage } from '../../../languages'

export const sameLang = /* groq */ `
  _lang == $lang
`

export const noDrafts = /* groq */ `
  !(_id in path('drafts.**'))
`

export const fixPreviewForDrafts = /* groq */ `
  ((defined(_lang) && ${sameLang}) || (!defined(_lang) && $lang == "${defaultLanguage.name}"))
`
