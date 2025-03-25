import { Config } from 'next-i18n-router/dist/types'
import { defaultLanguage, languages } from './languages'

const locales = languages.map((lang) => lang.locale)

export const i18nConfig: Config = {
  locales: locales,
  defaultLocale: defaultLanguage.locale,
  prefixDefault: false,
  localeDetector: false,
  serverSetCookie: 'never',
}
