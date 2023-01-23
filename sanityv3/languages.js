import { getLanguages } from '../satellitesConfig.js'
import { dataset } from './src/lib/datasetHelpers'

export const languages = getLanguages(dataset)

export const defaultLanguage = languages[0]
