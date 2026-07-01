import {
  defaultWebLanguage,
  getLanguages,
} from '@energyvision/shared/satelliteConfig'
import { dataset } from './sanity.client'

export const languages = getLanguages(dataset)

export const defaultLanguage = languages[0]
export const defaultWebLang = languages?.find(
  lang => lang.id === (defaultWebLanguage[dataset] ?? defaultLanguage.id),
)
