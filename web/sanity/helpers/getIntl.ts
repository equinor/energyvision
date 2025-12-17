//import translations from '../interface/translations.json'
import { defaultLanguage } from '@/languageConfig'
import { sanityFetch } from '@/sanity/lib/live'
import formatTextSnippets from './formatTextSnippets'
import { getNameFromLocale } from './localization'

export default async (locale: string) => {
  const { data: textSnippetsArray } = await sanityFetch({
    query: `*[_type == "textSnippet"]`,
  })
  const textSnippetsData = formatTextSnippets(textSnippetsArray ?? [])
  const lang = getNameFromLocale(locale)

  return {
    locale: locale,
    //@ts-ignore:config file, dunno why undefined possible
    defaultLocale: defaultLanguage.locale,
    messages: textSnippetsData[lang],
  }
}
