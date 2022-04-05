/* eslint-disable @typescript-eslint/no-var-requires */
const { getLanguages, defaultWebLanguage } = require('../satellitesConfig.js')

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

const languages = getLanguages(dataset)

const defaultLanguage = languages.find((lang) => lang.id === defaultWebLanguage[dataset]) || languages[0]

module.exports = { languages, defaultLanguage }
