import { dataset } from './src/lib/datasetHelpers'

// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET

const remoteUrl =
  dataset === 'global'
    ? 'https://web-energyvision-preprod.radix.equinor.com/'
    : `https://web-${dataset}-energyvision-preprod.radix.equinor.com`

const localUrl = process.env.SANITY_STUDIO_PROJECT_URL

export const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl

export default function resolveProductionUrl(doc) {
  const previewUrl = new URL(baseUrl)

  previewUrl.pathname = '/api/preview'
  previewUrl.searchParams.append('secret', previewSecret)

  if (doc?.slug?.current) {
    previewUrl.searchParams.append('slug', doc?.slug?.current)
  } else if (doc?._id) {
    previewUrl.searchParams.append('id', doc?._id)
  } else {
    // @TODO Handle this case better
    // Should only happen if the publisher tries to preview before they start to type
    console.warn('The content needs an id before it can be previewed')
    previewUrl.searchParams.append('slug', '/')
  }

  console.log('Preview url', previewUrl.toString())
  return previewUrl.toString()
}
