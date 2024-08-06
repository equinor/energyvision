import {
  defaultWebLanguage,
  getDomain,
  getFriendlyCaptchaConstants,
  getLanguages,
  getMetaTitleSuffix,
} from '../satellitesConfig.js'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const languages = getLanguages(dataset)

export const defaultLanguage = languages.find((lang) => lang.id === defaultWebLanguage[dataset]) || languages[0]

export const domain = getDomain(dataset)

export const metaTitleSuffix = getMetaTitleSuffix(dataset)

export const friendlycaptcha = getFriendlyCaptchaConstants(dataset)
