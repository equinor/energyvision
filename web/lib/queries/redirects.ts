export type RedirectsType = {
  lang: string
  to: string
} | null

export type ExternalRedirectsType = {
  to: string
} | null

export const redirects = /* groq */ `
  *[_type == "redirect" && (from == $slug || from == $slugWithLocale)][0]{
    "lang": lang,
    "to": to->slug.current
  }
`

export const externalRedirects = /* groq */ `
  *[_type == "externalRedirect" && (from == $slug || from == $slugWithLocale)][0]{
    to
  }
`
