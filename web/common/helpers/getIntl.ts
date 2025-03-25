'server-only'

import { createIntl } from '@formatjs/intl'
import { getNameFromLocale } from '../../lib/localization'
import { getClient } from '../../lib/sanity.server'
import { MessageFormatElement } from 'react-intl'
import formatTextSnippets from '../../common/helpers/formatTextSnippets'
import { textSnippetsQuery } from '../../lib/queries/textSnippets'

const getMessages = async (
  locale: string,
  preview = false,
): Promise<Record<string, MessageFormatElement[]> | Record<string, string>> => {
  const textSnippetsArray = await getClient(preview).fetch(textSnippetsQuery)
  const textSnippetsData = formatTextSnippets(textSnippetsArray)
  const lang = getNameFromLocale(locale)
  return textSnippetsData[lang]
}

export default async function getIntl(locale: string, preview: boolean) {
  return createIntl({
    locale: locale,
    messages: await getMessages(locale, preview),
  })
}
