import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest, context: any) {
  const { searchParams } = new URL(request.url)
  console.log('DRAFT GET : request', request)
  const secret = searchParams.get('secret')
  const id = searchParams.get('id')

  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Missing or invalid token', { status: 401 })
  }

  redirect(`/preview/${id}`)
}
