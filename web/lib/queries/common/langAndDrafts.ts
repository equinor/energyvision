export const sameLang = /* groq */ `
  _lang == $lang
`

export const noDrafts = /* groq */ `
  !(_id in path('drafts.**'))
`
