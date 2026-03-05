import { defineRouting } from 'next-intl/routing'
import { defaultLanguage, getValidLanguagesLocales } from '@/languageConfig'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: getValidLanguagesLocales(),
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      'en-GB': '/en',
      'nb-NO': '/no',
      'pt-BR': '/pt',
      'es-AR': '/es',
      'ja-JP': '/ja',
      'ko-KR': '/ko',
      'cy-CY': '/cy',
    },
  },
  localeDetection: false,
  // Used when no locale matches
  defaultLocale: defaultLanguage.iso,
  /** Opt-out as using CMS to manage pathnames */
  alternateLinks: false,
})
