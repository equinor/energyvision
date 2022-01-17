import languages from '../languages'

export const i18n = {
  //@TODO BOOM This is indeed not a rocket solid solution for satellite pages
  base: languages[0].name,
  languages,
  fieldNames: {
    lang: '_lang',
    references: '_langRefs',
  },
}
