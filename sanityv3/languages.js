import { getLanguages } from '../satellitesConfig'
import { dataset } from './src/lib/datasetHelpers'

export const languages = getLanguages(dataset)

export const defaultLanguage = languages[0]
