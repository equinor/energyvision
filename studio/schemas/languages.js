export const languages = [
  { name: 'en_GB', title: 'English (UK)', isDefault: true },
  { name: 'nb_NO', title: 'Norwegian' },
]

export const baseLanguage = languages[0]

export const routes = languages.map((lang) => ({ type: `route_${lang.name}` }))
