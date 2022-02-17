/* eslint-disable @typescript-eslint/no-explicit-any */
import languages from '../../languages'

const getFormattedSnippets = (lang: string, snippets: any) => {
  return Object.assign(
    {},
    ...snippets.map((snippet: any) => {
      const key = snippet._id.replace('text_snippet_', '')
      return {
        [key]: snippet[lang],
      }
    }),
  )
}

const formatTextSnippets = (snippets: any): Record<string, Record<string, string>> => {
  const locales = languages.map((e) => e.locale)
  return locales.reduce(
    (o, locale) => ({
      ...o,
      [locale]: getFormattedSnippets(locale, snippets),
    }),
    {},
  )
}

export default formatTextSnippets
