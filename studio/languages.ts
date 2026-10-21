import {
  defaultWebLanguage,
  getLanguages,
  isoToSchemaName,
} from '@energyvision/shared/satelliteConfig'
import { dataset } from './sanity.client'

export { isoToSchemaName }
export const languages = getLanguages(dataset)

export const defaultLanguage = languages[0]
export const defaultWebLang = languages?.find(
  lang => lang.id === (defaultWebLanguage[dataset] ?? defaultLanguage.id),
)
