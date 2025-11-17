import formatTextSnippets from './formatTextSnippets'
import { sanityFetch } from '@/sanity/lib/live'
import { getNameFromLocale } from '../localization'

import translations from '../interface/translations.json'
import { defaultLanguage } from '@/languageConfig'

export default async (locale: string) => {
  const { data: textSnippetsArray } = await sanityFetch({
    query: `*[_type == "textSnippet"]`,
  })
  console.log('textSnippetsArray', textSnippetsArray)
  console.log('translations', translations)
  const textSnippetsData = formatTextSnippets(textSnippetsArray ?? [])
  const lang = getNameFromLocale(locale)

  return {
    locale: locale,
    //@ts-ignore:config file, dunno why undefined possible
    defaultLocale: defaultLanguage.locale,
    messages: textSnippetsData[lang],
  }
}
