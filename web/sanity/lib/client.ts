/*import { ClientConfig, createClient } from '@sanity/client'*/
import { type ClientConfig, createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, studioUrl } from '../lib/api'
import { token } from './token'

const sanityConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  perspective: 'published',
  useCdn: true,
  stega: {
    studioUrl,
    // Set logger to 'console' for more verbose logging
    // logger: console,
    filter: props => {
      if (props.sourcePath.at(-1) === 'title') {
        return true
      }

      return props.filterDefault(props)
    },
  },
}

export const client = createClient({
  ...sanityConfig,
  token,
})
//only for next config
export const notSecuredTokenClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
})

export const noCdnClient = () =>
  createClient({
    ...sanityConfig,
    useCdn: false,
  })
