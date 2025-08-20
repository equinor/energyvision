import { Flags } from '@/common/helpers/datasetHelpers'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

//const REQUIRES_SLUG = ['news', 'localNews', 'magazine']

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams, host } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const previewLocale = searchParams.get('locale')
  console.log('slug', slug)
  console.log('previewLocale', previewLocale)

  // Check the secret and next parameters
  // This secret should only be known to this Route Handler and the CMS
  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Missing or invalid token', { status: 401 })
  }

  /*   Check if we can avoid this
if (!req.query.slug && (REQUIRES_SLUG.includes(req.query.type) || req.query.type?.includes('route'))) {
    return res.status(400).json({ message: 'The document needs a slug before it can be previewed.' })
  } */

  // Fetch the headless CMS to check if the provided `slug` exists

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!slug) {
    return new Response('Invalid slug', { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode()
  draft.enable()

  const pathname = slug ?? '/'
  const locale = previewLocale ? `/${previewLocale}` : ''
  const baseUrl = '//' + host
  let url = ''
  if (Flags.HAS_NEWSROOM && ['/newsroom', '/drafts.newsroom'].includes(pathname)) {
    url = locale === 'no' ? `${baseUrl}/no/nyheter?preview` : `${baseUrl}/news?preview`
  } else if (Flags.HAS_MAGAZINE_INDEX && ['/magazineIndex', '/drafts.magazineIndex'].includes(pathname)) {
    url = locale === 'no' ? `${baseUrl}/no/magasin?preview` : `${baseUrl}/magazine?preview`
  } else if (['/pageNotFound', '/drafts.pageNotFound'].includes(pathname)) {
    url = `${baseUrl}${locale}/404?preview`
  } else if (['/internalServerError', '/drafts.internalServerError'].includes(pathname)) {
    url = `${baseUrl}${locale}/500?preview`
  } else {
    url = `${baseUrl}${locale}${pathname}`
  }

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(url)
}
