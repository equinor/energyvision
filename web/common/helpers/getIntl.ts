import formatTextSnippets from './formatTextSnippets'
import { getNameFromLocale } from '../../lib/localization'
import { defaultLanguage } from '../../languages'
import { textSnippetsQuery } from '@/sanity/queries/textSnippets'
import { sanityFetch } from '@/sanity/lib/live'

export default async (locale: string) => {
  const {data: textSnippetsArray} = await sanityFetch({
      query: textSnippetsQuery
    })
  const textSnippetsData = formatTextSnippets(textSnippetsArray ?? [])
  const lang = getNameFromLocale(locale)

  return {
    locale: locale,
    defaultLocale: defaultLanguage.locale,
    messages: textSnippetsData[lang],
  }
}
