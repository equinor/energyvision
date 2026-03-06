import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { client } from '@/sanity/lib/client'

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

  if (!isValid) {
    return new Response('Missing or invalid token', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(previewUrl)
  //redirect(`/preview/${id}`)
}
