const languages = [
  { id: 'english', iso: 'en-GB', name: 'en_GB', title: 'English (UK)', locale: 'en' },
  { id: 'norwegian', iso: 'nb-NO', name: 'nb_NO', title: 'Norwegian', locale: 'no' },
  { id: 'portuguese', iso: 'pt-BR', name: 'pt_BR', title: 'Portuguese (BR)', locale: 'pt' },
  { id: 'german', iso: 'de-DE', name: 'de_DE', title: 'German', locale: 'de' },
]

/*
  The first language will be set as the default language
  Example:
    norway: ['norwegian', 'english']
  Norwegian will be the default language for the dataset norway
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
