/* import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export const POST = async (request: NextRequest) => {
  const { tags, isValid } = await validateRequest(request)
  if (!isValid) return new Response('No no no', { status: 400 })
  for (const _tag of tags) {
    const tag = `sanity:${_tag}`
    revalidateTag(tag)
    // eslint-disable-next-line no-console
    console.log(`revalidated tag: ${tag}`)
  }
}
 */

import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
  tags: string[]
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      return new Response('Missing environment variable SANITY_API_TOKEN', {
        status: 500,
      })
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_API_TOKEN,
      true,
    )

    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      })
    }
    if (!Array.isArray(body?.tags) || !body.tags.length) {
      const message = 'Bad Request'
      return new Response(JSON.stringify({ message, body }), { status: 400 })
    }
    console.log('tagbased revalidation tags', body.tags)

    body.tags.forEach(_tag => {
      const tag = `sanity:${_tag}`
      revalidateTag(tag, 'max')
      console.log(`revalidated tag: ${tag}`)
    })

    return NextResponse.json({ body })
  } catch (err) {
    console.error(err)
    return new Response((err as Error).message, { status: 500 })
  }
}
