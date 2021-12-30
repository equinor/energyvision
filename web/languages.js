let languages = [
  {
    iso: 'en-GB',
    name: 'en_GB',
    title: 'English',
    locale: 'en',
  },
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
  {
    iso: 'de-DE',
    name: 'de_DE',
    title: 'German',
    locale: 'de',
  },
]

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (dataset === 'production') {
  languages = languages.filter((lang) => lang.locale === 'en' || lang.locale === 'no' || lang.locale === 'pt')
} else if (dataset === 'brazil') {
  languages = languages.filter((lang) => lang.locale === 'pt')
} else if (dataset === 'germany') {
  languages = languages.filter((lang) => lang.locale === 'de')
} else {
  languages = languages.filter((lang) => lang.locale === 'en')
}

module.exports = languages
