// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'
import GreatBritain from './icons/GreatBritain'
import Norway from './icons/Norway'
// eslint-disable-next-line import/no-duplicates
import Brazil from './icons/Brazil'
// eslint-disable-next-line import/no-duplicates
import Germany from './icons/Brazil' // TODO: Replace

type Datasets = {
  [dataset: string]: string[]
}

const datasets: Datasets = {
  // Leave this as is for now. Should be replaced by development for global
  production: ['english', 'norwegian'],
  global: ['english', 'norwegian'],
  brazil: ['portuguese'],
  germany: ['german'],
}

type LanguagesType = {
  id: string
  name: string
  title: string
  locale: string
  flag: (_: { width: number; height: number }) => JSX.Element
}

const languages: LanguagesType[] = [
  { id: 'english', name: 'en_GB', title: 'English (UK)', locale: 'en', flag: GreatBritain },
  { id: 'norwegian', name: 'nb_NO', title: 'Norwegian', locale: 'no', flag: Norway },
  { id: 'portuguese', name: 'pt_BR', title: 'Portuguese (BR)', locale: 'pt', flag: Brazil },
  { id: 'german', name: 'de_DE', title: 'German', locale: 'de', flag: Germany },
]

const dataset: string = client.clientConfig.dataset

const filterLanguages = (dataset: string[]): LanguagesType[] => languages.filter((lang) => dataset.includes(lang.id))

const langs: LanguagesType[] = filterLanguages(datasets[dataset])

export default langs
