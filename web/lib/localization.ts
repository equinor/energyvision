export const DEFAULT_LANGUAGE = {
  iso: 'en-GB',
  name: 'en_GB',
  title: 'English',
  locale: 'en',
}

export const LANGUAGES = [
  DEFAULT_LANGUAGE,
  {
    iso: 'nb-NO',
    name: 'nb_NO',
    title: 'Norwegian',
    locale: 'no',
  },
  {
    iso: 'pt-BR',
    name: 'pt_BR',
    title: 'Portuguese',
    locale: 'pt',
  },
]

export const getNameFromLocale = (locale: string | undefined): string => {
  return LANGUAGES.find((language) => language.locale === locale)?.name || DEFAULT_LANGUAGE.name
}

export const getIsoFromLocale = (locale: string | undefined): string => {
  return LANGUAGES.find((language) => language.locale === locale)?.iso || DEFAULT_LANGUAGE.iso
}
