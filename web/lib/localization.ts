type Locale = 'en' | 'no'
type Lang = 'en_GB' | 'nb_NO'

export const mapLocaleToLang = (locale: string): Lang => {
  switch (locale) {
    case 'en':
      return 'en_GB'
    case 'no':
      return 'nb_NO'
    default:
      return 'en_GB'
  }
}

export const mapLangTolocale = (lang: string): Locale => {
  switch (lang) {
    case 'en_GB':
      return 'en'
    case 'nb_NO':
      return 'no'
    default:
      return 'en'
  }
}
