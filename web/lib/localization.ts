export const mapLocaleToLang = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'en_gb'
    case 'no':
      return 'nb_no'
    default:
      return 'en_gb'
  }
}
