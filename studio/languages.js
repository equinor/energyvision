// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'
import getLanguages from '../satellitesConfig.js'

const dataset = client.clientConfig.dataset

export default getLanguages(dataset)
