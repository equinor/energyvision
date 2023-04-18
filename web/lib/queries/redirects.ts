import { noDrafts } from './common/langAndDrafts'

export type RedirectsType = {
  lang: string
  to: string
} | null

export type ExternalRedirectsType = {
  to: string
} | null

const from = /* groq */ `(from == $slug || from == $slug + '.html' || from == $slugWithLocale || from == $slugWithLocale + '.html')`

export const redirects = /* groq */ `
  *[_type == "redirect" && ${from} && ${noDrafts}][0]{
    "lang": _lang,
    "to": to->slug.current
  }
`

export const externalRedirects = /* groq */ `
  *[_type == "externalRedirect" && ${from} && ${noDrafts}][0]{
    to
  }
`
