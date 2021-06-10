import { languages, baseLanguage } from './languages'

export const i18n = {
  base: baseLanguage.name,
  languages,
  fieldNames: {
    lang: '_lang',
    references: '_langRefs',
  },
}
