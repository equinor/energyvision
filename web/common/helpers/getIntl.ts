import { textSnippetsQuery } from '../../lib/queries/textSnippets'
import { getClient } from '../../lib/sanity.server'
import formatTextSnippets from './formatTextSnippets'
import { defaultLanguage, getNameFromLocale } from '../../lib/localization'

export default async (locale: string, preview: boolean) => {
  const textSnippetsArray = await getClient(preview).fetch(textSnippetsQuery)
  const textSnippetsData = formatTextSnippets(textSnippetsArray)
  const lang = getNameFromLocale(locale)

  return {
    locale: locale,
    defaultLocale: defaultLanguage.locale,
    messages: textSnippetsData[lang],
  }
}
