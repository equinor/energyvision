import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || ''

export async function POST(req: NextRequest) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME)
  const body = await req.text()

  if (!body) {
    return new Response(JSON.stringify({ error: 'Empty body received' }), { status: 400 })
  }

  if (!isValidSignature(body, signature || '', SANITY_API_TOKEN)) {
    console.log('Unauthorized request: Revalidate Endpoint')
    return new Response(JSON.stringify({ success: false, msg: 'Unauthorized!' }), { status: 401 })
  }

  let data: { slug?: string; tags?: string[]; _type?: string; _id?: string }
  try {
    data = JSON.parse(body)
  } catch (err) {
    console.error('Invalid JSON:', err)
    return new Response(JSON.stringify({ error: 'Invalid JSON format' }), { status: 400 })
  }

  // ✅ Tag-based validation
  if (!data.tags || !data.tags.includes('news')) {
    console.log('Skipping revalidation: Tag "news" not found')
    return new Response(JSON.stringify({ revalidated: false, msg: 'Tag "news" not present', data: data }), { status: 200 })
  }

  let res = revalidateTag('news', 'max')
  return new Response(JSON.stringify({ data: "Revalidated successfully" }), { status: 200 })
}