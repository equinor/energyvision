import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
  id: string
  _type: string
  slug?: {
    current: string
  }
}

/*
 * tags to handle
 * 'siteMenu','simpleMenu'
 * 'footer'
 * 'magazine'. tags: [`magazine:${slug}`],
 * 'event' - is connected to page so not needed?
 * page tags: ['page', `page:${slug}`],
 * news tags: [`news:${slug}`, `localNews:${slug}`],
 * newsroom tags: ['newsroom'],
 */

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
    if (!body?._type) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 })
    }

    //const docId = body?.id

    console.log('tagbased revalidation', body._type, body?.slug?.current)

    /*     const docsWithoutSlugCurrent = [
      'page',
      'magazineIndex',
      'newsroom',
      'event',
      'homePage',
    ] */
    //@ts-ignore

    // Revalidate the specific document if it has a slug
    if (body.slug?.current) {
      revalidateTag(`${body._type}:${body.slug.current}`, 'max')
    } else {
      // Revalidate the entire document type (e.g., newsroom)
      revalidateTag(body._type, 'max') //(body._type)
    }

    //return NextResponse.json({ body })
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error(err)
    return new Response((err as Error).message, { status: 500 })
  }
}
