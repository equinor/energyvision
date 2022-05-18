/* eslint-disable @typescript-eslint/no-var-requires */
const { getLanguages, defaultWebLanguage, getDomain, getMetaTitleSuffix } = require('../satellitesConfig.js')

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

const languages = getLanguages(dataset)

const defaultLanguage = languages.find((lang) => lang.id === defaultWebLanguage[dataset]) || languages[0]

const domain = getDomain(dataset)

const metaTitleSuffix = getMetaTitleSuffix(dataset)

module.exports = { dataset, languages, defaultLanguage, domain, metaTitleSuffix }
