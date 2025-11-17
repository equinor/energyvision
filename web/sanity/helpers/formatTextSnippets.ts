/* eslint-disable @typescript-eslint/no-explicit-any */

import { languages } from "@/languageConfig"


const getFormattedSnippets = (lang: string, snippets: any) => {
  return Object.assign(
    {},
    ...snippets.map((snippet: any) => {
      const key = snippet._id.replace('text_snippet_', '').replace('drafts.', '')

      return {
        [key]: snippet[lang] || '',
      }
    }),
  )
}

const formatTextSnippets = (snippets: any): Record<string, Record<string, string>> => {
  //@ts-ignore:todo possibly undefined
  const langs = languages.map((e) => e.name)
  return langs.reduce(
    (o:any, lang:any) => ({
      ...o,
      [lang]: getFormattedSnippets(lang, snippets),
    }),
    {},
  )
}

export default formatTextSnippets
