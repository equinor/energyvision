import { notFound } from 'next/navigation'
import * as rootParams from 'next/root-params'
import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import getIntl from '@/sanity/helpers/getIntl'
import { routing } from './routing'

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale()
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue
    } else {
      notFound()
    }
  } else if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getIntl(locale)
  return messages
})
