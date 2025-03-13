/**
 * Server-side Sanity utilities. By having these in a separate file from the
 * utilities we use on the client side, we are able to tree-shake (remove)
 * code that is not used on the client side.
 */
import { ClientPerspective, createClient } from 'next-sanity'
import { sanityConfig } from './config'

export type PreviewContext = {
  preview: boolean
  perspective?: ClientPerspective
}

export const sanityClient = createClient(sanityConfig)

export const sanityClientWithEquinorCDN = createClient({
  ...sanityConfig,
  apiHost: 'https://cdn.equinor.com',
})

export const previewClient = (perspective: ClientPerspective) =>
  createClient({
    ...sanityConfig,
    useCdn: false,
    perspective: perspective,
  })

export const getClient = (previewContext: PreviewContext) => {
  if (previewContext.preview && !previewContext.perspective) {
    throw Error('Perspective is missing to preview')
  }
  return previewContext.preview && previewContext.perspective ? previewClient(previewContext.perspective) : sanityClient
}
