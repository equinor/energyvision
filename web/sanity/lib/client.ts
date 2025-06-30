import { ClientConfig, createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { token } from './token'

const sanityConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  token,
  perspective: 'published',
  useCdn: true,
  stega: {
    studioUrl,
    // Set logger to 'console' for more verbose logging
    // logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true
      }

      return props.filterDefault(props)
    },
  },
}

export const client = createClient({ ...sanityConfig })

export const sanityClientWithEquinorCDN = createClient({
  ...sanityConfig,
  apiHost: 'https://cdn.equinor.com',
})
