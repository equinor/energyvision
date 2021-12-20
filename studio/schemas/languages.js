// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'
import GreatBritain from '../icons/GreatBritain'
import Norway from '../icons/Norway'
import Brazil from '../icons/Brazil'

let languages = [
  { id: 'english', name: 'en_GB', title: 'English (UK)', locale: 'en', flag: GreatBritain },
  { id: 'norwegian', name: 'nb_NO', title: 'Norwegian', locale: 'no', flag: Norway },
  { id: 'portuguese', name: 'pt_BR', title: 'Portuguese (BR)', locale: 'pt', flag: Brazil },
]

const dataset = client.clientConfig.dataset

if (dataset === 'production') {
  languages = languages.filter((lang) => lang.id === 'english' || lang.id === 'norwegian' || lang.id === 'portuguese')
} else {
  languages = languages.filter((lang) => lang.id === 'portuguese')
}

export default languages
