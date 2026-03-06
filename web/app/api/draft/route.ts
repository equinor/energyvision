import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { Flags } from '@/sanity/helpers/datasetHelpers'

export async function GET(request: NextRequest, context: any) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client,
    request.url,
  )

  let previewUrl = redirectTo
  if (redirectTo?.includes('/api/draft')) {
    const urlParts = redirectTo.split('/')
    previewUrl = `/${urlParts.at(-2)}/${urlParts.at(-1)}`
  }

  // Check the secret and next parameters
  // This secret should only be known to this Route Handler and the CMS
  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Missing or invalid token', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  const pathname = slug ?? '/'
  const locale = previewLocale ? `/${previewLocale}` : ''
  const baseUrl = '//' + host
  let url = ''
  if (
    Flags.HAS_NEWSROOM &&
    ['/newsroom', '/drafts.newsroom'].includes(pathname)
  ) {
    url =
      locale === 'no'
        ? `${baseUrl}/no/nyheter?preview`
        : `${baseUrl}/news?preview`
  } else if (
    Flags.HAS_MAGAZINE &&
    ['/magazineIndex', '/drafts.magazineIndex'].includes(pathname)
  ) {
    url =
      locale === 'no'
        ? `${baseUrl}/no/magasin?preview`
        : `${baseUrl}/magazine?preview`
  } else if (['/pageNotFound', '/drafts.pageNotFound'].includes(pathname)) {
    url = `${baseUrl}${locale}/404?preview`
  } else if (
    ['/internalServerError', '/drafts.internalServerError'].includes(pathname)
  ) {
    url = `${baseUrl}${locale}/500?preview`
  } else {
    url = `${baseUrl}${locale}${pathname}`
  }

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(url)
}
