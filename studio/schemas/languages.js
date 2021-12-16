import GreatBritain from '../icons/GreatBritain'
import Norway from '../icons/Norway'
import Brazil from '../icons/Brazil'

export const languages = [
  { id: 'english', name: 'en_GB', title: 'English (UK)', flag: GreatBritain, isDefault: true },
  { id: 'norwegian', name: 'nb_NO', title: 'Norwegian', flag: Norway },
  { id: 'portuguese', name: 'pt_BR', title: 'Portuguese (BR)', flag: Brazil },
]

export const baseLanguage = languages[0]

export const routes = languages.map((lang) => ({ type: `route_${lang.name}` }))
