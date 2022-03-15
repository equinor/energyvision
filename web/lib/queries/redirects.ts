export type RedirectsType = {
  lang: string
  to: string
} | null

export const redirects = /* groq */ `
  *[_type == "redirect" && (from == $slug || from == $slugWithLocale)][0]{
    "lang": _lang,
    "to": to->slug.current
  }
`
