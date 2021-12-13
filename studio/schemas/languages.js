import GreatBritain from '../icons/GreatBritain'
import Norway from '../icons/Norway'

export const languages = [
  { id: 'english', name: 'en_GB', title: 'English (UK)', flag: GreatBritain, isDefault: true },
  { id: 'norwegian', name: 'nb_NO', title: 'Norwegian', flag: Norway },
]

export const baseLanguage = languages[0]

export const routes = languages.map((lang) => ({ type: `route_${lang.name}` }))
