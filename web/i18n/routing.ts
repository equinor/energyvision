import { getValidLanguagesLocales } from '@/languages'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: getValidLanguagesLocales(),
  localePrefix: 'as-needed',
  localeDetection: false,
  // Used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/news': {
      no: '/nyheter',
    },
  },
})
