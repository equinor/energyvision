import {
  defaultWebLanguage,
  getLanguages,
} from '@energyvision/shared/satelliteConfig'
import { dataset } from './sanity.client'

export const languages = getLanguages(dataset)

export const defaultLanguage =
  languages.find(lang => {
    return lang.id === defaultWebLanguage[dataset]
  }) ?? languages[0]
