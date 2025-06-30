import { getClient, PreviewContext } from '../../lib/sanity.server'
import formatTextSnippets from './formatTextSnippets'
import { getNameFromLocale } from '../../lib/localization'
import { defaultLanguage } from '../../languages'
import { textSnippetsQuery } from '@/sanity/queries/textSnippets'

export default async (locale: string, previewContext: PreviewContext) => {
  const textSnippetsArray = await getClient(previewContext).fetch(textSnippetsQuery)
  const textSnippetsData = formatTextSnippets(textSnippetsArray)
  const lang = getNameFromLocale(locale)

  return {
    locale: locale,
    defaultLocale: defaultLanguage.locale,
    messages: textSnippetsData[lang],
  }
}
