import { getValidLanguagesLocales } from '@/languages'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: getValidLanguagesLocales(),
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      'en-GB': '/en',
    },
  },
  localeDetection: false,
  // Used when no locale matches
  defaultLocale: 'en-GB',
  /** Opt-out as using CMS to manage pathnames */
  alternateLinks: false,
  /*   pathnames: {
    '/': '/',
    '/news': {
      no: '/nyheter',
    },
  }, */
})
