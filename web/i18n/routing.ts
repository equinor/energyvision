import { defineRouting } from 'next-intl/routing'
import { getValidLanguagesLocales } from '@/languageConfig'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: getValidLanguagesLocales(),
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
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
  defaultLocale: 'en-GB',
  /** Opt-out as using CMS to manage pathnames */
  alternateLinks: false,
})
