/* eslint-disable @typescript-eslint/no-explicit-any */
import languages from '../../languages'

const getFormattedSnippets = (lang: string, snippets: any) => {
  return Object.assign(
    {},
    ...snippets.map((snippet: any) => {
      const key = snippet._id.replace('text_snippet_', '')
      return {
        [key]: snippet[lang] || '',
      }
    }),
  )
}

const formatTextSnippets = (snippets: any): Record<string, Record<string, string>> => {
  const langs = languages.map((e) => e.name)
  return langs.reduce(
    (o, lang) => ({
      ...o,
      [lang]: getFormattedSnippets(lang, snippets),
    }),
    {},
  )
}

export default formatTextSnippets
