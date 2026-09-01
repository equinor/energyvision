//import translations from '../interface/translations.json'

import { cacheLife } from 'next/cache'
import { defaultLanguage } from '@/languageConfig'
import { routeSanityFetch } from '@/sanity/lib/fetch'
import formatTextSnippets from './formatTextSnippets'
import { getNameFromIso } from './localization'

export default async (locale: string) => {
  'use cache'
  cacheLife('max')
  const { data: textSnippetsArray } = await routeSanityFetch({
    query: `*[_type == "textSnippet"]`,
    tags: ['textSnippet'],
    requestTag: 'text-snippets',
  })
  const textSnippetsData = formatTextSnippets(textSnippetsArray ?? [])
  const lang = getNameFromIso(locale)

  return {
    locale: locale,
    //@ts-ignore:config file, dunno why undefined possible
    defaultLocale: defaultLanguage.locale,
    messages: textSnippetsData[lang],
  }
}
