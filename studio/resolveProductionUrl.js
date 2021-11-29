// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET

// Replace `remoteUrl` with your deployed Next.js site
const remoteUrl = 'https://energyvision.app.radix.equinor.com/'
const localUrl = process.env.SANITY_STUDIO_PROJECT_URL

export default function resolveProductionUrl(doc) {
  const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl

  const previewUrl = new URL(baseUrl)

  previewUrl.pathname = '/api/preview'
  previewUrl.searchParams.append(`secret`, previewSecret)

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
