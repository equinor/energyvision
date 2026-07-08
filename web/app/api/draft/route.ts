import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(request: NextRequest, _context: any) {
  //const secFetchDest = request.headers.get('sec-fetch-dest')
  //const referer = request.headers.get('referer')
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client,
    request.url,
  )

  if (!isValid) {
    return new Response('Missing or invalid token', { status: 401 })
  }

  let previewUrl = redirectTo
  if (redirectTo?.includes('/api/draft')) {
    const urlParts = redirectTo.split('/')
    previewUrl = `/${urlParts.at(-2)}/${urlParts.at(-1)}`
  }

  const draft = await draftMode()
  draft.enable()

  /*   
  Must stega filter page content props used for conditional rendering in the presentation tool, otherwise the page will not render correctly in the presentation tool.
  Something to do later as this will be a big job.
  setting a cookie for sec fetch dest to identify the request as coming from the presentation tool and the web is previewed inside it. Works SSR. 
  const cookieStore = await cookies()
  if (secFetchDest) {
    cookieStore.set('preview-fetch-dest', secFetchDest, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60,
    })
  } else {
    cookieStore.delete('preview-fetch-dest')
  } */

  redirect(previewUrl)
}
