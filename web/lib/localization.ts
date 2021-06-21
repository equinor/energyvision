export const mapLocaleToLang = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'en_GB'
    case 'no':
      return 'nb_NO'
    default:
      return 'en_GB'
  }
}
