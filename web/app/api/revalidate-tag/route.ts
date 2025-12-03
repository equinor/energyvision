import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { groq } from 'next-sanity'
import { parseBody } from 'next-sanity/webhook'
import { client } from '@/sanity/lib/client'

type WebhookPayload = {
  id: string
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
    const docId = body?.id
    const docType = body?.tags?.[0]

    if (!Array.isArray(body?.tags) || !body.tags.length) {
      const message = 'Bad Request'
      return new Response(JSON.stringify({ message, body }), { status: 400 })
    }
    console.log('tagbased revalidation tags', body.tags)

    const docsWithoutSlugCurrent = [
      'page',
      'magazineIndex',
      'newsroom',
      'event',
      'homePage',
      'landingPage',
    ]
    //@ts-ignore
    if (docsWithoutSlugCurrent.includes(docType)) {
      const routes = await client.fetch(
        groq`*[_type match "route_*" && content._ref == $id]{"slug": slug.current}`,
        {
          id: docId,
        },
      )

      routes.forEach((route: any) => {
        const tag = `sanity:${docType}:${route.slug}`
        revalidateTag(tag, 'max')
        console.log(`revalidated tag: ${tag}`)
      })
    } else {
      body.tags.forEach(_tag => {
        const tag = `sanity:${_tag}`
        revalidateTag(tag, 'max')
        console.log(`revalidated tag: ${tag}`)
      })
    }

    return NextResponse.json({ body })
  } catch (err) {
    console.error(err)
    return new Response((err as Error).message, { status: 500 })
  }
}
