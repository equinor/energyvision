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
]

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (dataset === 'production') {
  languages = languages.filter((lang) => lang.locale === 'en' || lang.locale === 'no' || lang.locale === 'pt')
} else {
  languages = languages.filter((lang) => lang.locale === 'en' || lang.locale === 'no')
}

module.exports = languages
