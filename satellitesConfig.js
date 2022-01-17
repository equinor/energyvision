/*
  {
    id: The key for this language
    title: The title as it will be labeled in Sanity studio
    iso: Iso version of the language, used by Next.js localisation and react-intl
    name: Name as used in the Sanity localisation feature (this one is hard to explain :sweat_smile:)
    locale: The actual locale name as used by Next.js and locale folders/structure ([site]/locale)
  }
*/

const languages = [
  { id: 'english', title: 'English (UK)', iso: 'en-GB', name: 'en_GB', locale: 'en' },
  { id: 'norwegian', title: 'Norwegian', iso: 'nb-NO', name: 'nb_NO', locale: 'no' },
  { id: 'portuguese', title: 'Portuguese (BR)', iso: 'pt-BR', name: 'pt_BR', locale: 'pt' },
  { id: 'german', title: 'German', iso: 'de-DE', name: 'de_DE', locale: 'de' },
]

/*
  The first language will be set as the default language. The default language is used as
  1. The main language in Sanity studio for translations (base language)
  2. The default language with Next.js localization support
  Example:
    norway: ['norwegian', 'english']
  Norwegian will be the default language for the dataset norway.
  
  In Sanity Norwegian will be the base language and English a translation of that
  In Next.js, the Norwegian version will be available as [site]/no and [site] where Next.js will
  redirect /no to /
  */
const datasets = {
  // Leave this as is for now. Should be replaced by development for global
  production: ['english', 'norwegian'],
  global: ['english', 'norwegian'],
  brazil: ['portuguese'],
  germany: ['german'],
}

const filterLanguages = (dataset) => languages.filter((lang) => dataset.includes(lang.id))

const getLanguages = (dataset) => filterLanguages(datasets[dataset])

module.exports = getLanguages
