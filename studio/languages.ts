import { getLanguages } from '@energyvision/shared/satelliteConfig'
import { dataset } from './sanity.client'

export const languages = getLanguages(dataset)

export const defaultLanguage = languages[0]
