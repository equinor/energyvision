import {
  type DatasetsKeys,
  defaultWebLanguage,
  getDomain,
  getLanguages,
  getMetaTitleSuffix,
} from '@shared/sitesConfig'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as DatasetsKeys

export const languages = getLanguages(dataset)

//@ts-ignore: configuration files set with lang
export const getValidLanguagesLocales = () =>
  getLanguages(dataset).map(lang => lang.locale)

export const defaultLanguage =
  languages.find(lang => lang.id === defaultWebLanguage[dataset]) ??
  languages[0]

export const domain = getDomain(dataset)

export const metaTitleSuffix = getMetaTitleSuffix(dataset)
