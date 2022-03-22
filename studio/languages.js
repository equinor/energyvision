import { getLanguages } from '../satellitesConfig'
import { DATASET } from './src/lib/datasetHelpers'

export const languages = getLanguages(DATASET)

export const defaultLanguage = languages[0]
