/* eslint-disable @typescript-eslint/no-var-requires */
const getLanguages = require('../satellitesConfig.js')

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

const languages = getLanguages(dataset)

module.exports = languages
