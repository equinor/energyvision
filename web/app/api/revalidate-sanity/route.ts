import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { groq } from 'next-sanity'
import { parseBody } from 'next-sanity/webhook'
import { client } from '@/sanity/lib/client'

type WebhookPayload = {
  id: string
  _type: string
  slug: string
  lang: string
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
    const docId = body?.id
    const docType = body?._type
    const docLang = body?.lang
    const docSlug = body?.slug

    if (!docType && !docSlug && !docLang) {
      const message = 'Bad Request'
      return new Response(JSON.stringify({ message, body }), { status: 400 })
    }

    const docsWithoutSlugCurrent = [
      'page',
      'magazineIndex',
      'newsroom',
      'event',
      'homePage',
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
        const tag = `${docType}:${route.slug}`
        revalidateTag(tag, 'max')
        console.log(`revalidated tag: ${tag}`)
      })
    } else {
      /*body.tags.forEach(_tag => {
        const tag = `sanity:${_tag}`
        revalidateTag(tag, 'max')
        console.log(`revalidated tag: ${tag}`)
      })*/
      const tag = `${docType}:${docSlug ?? docLang}`
      revalidateTag(tag, 'max')
      console.log(`revalidated tag: ${tag}`)
    }

    return NextResponse.json({ body })
  } catch (err) {
    console.error(err)
    return new Response((err as Error).message, { status: 500 })
  }
}
/*import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import {
  documentCacheTag,
  documentTypeCacheTag,
  IS_FETCH_OPTIMIZED,
  SANITY_CACHE_TAG,
} from '@/sanity/lib/fetch'

const REVALIDATE_SECRET = process.env.SANITY_API_TOKEN || ''

/*
 * Replaces Sanity Live when the optimized fetch is enabled.
 * Only published documents trigger a revalidation, drafts are ignored.
 
export async function POST(req: NextRequest) {
  if (!REVALIDATE_SECRET) {
    return Response.json(
      { success: false, message: 'Revalidation secret is not configured' },
      { status: 500 },
    )
  }

  const signature = req.headers.get(SIGNATURE_HEADER_NAME) || ''
  const body = await req.text()

  if (!(await isValidSignature(body, signature, REVALIDATE_SECRET))) {
    return Response.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 },
    )
  }

  if (!IS_FETCH_OPTIMIZED) {
    return Response.json({
      success: true,
      message: 'Optimized fetch is disabled, nothing to revalidate',
    })
  }

  const { _id, _type } = JSON.parse(body) as { _id?: string; _type?: string }

  if (!(_id && _type)) {
    return Response.json(
      { success: false, message: 'Missing _id or _type in payload' },
      { status: 400 },
    )
  }

  if (_id.startsWith('drafts.') || _id.startsWith('versions.')) {
    return Response.json({ success: true, message: 'Draft ignored', id: _id })
  }

  const tags = [
    SANITY_CACHE_TAG,
    documentTypeCacheTag(_type),
    documentCacheTag(_id),
  ]

  for (const tag of tags) {
    revalidateTag(tag, 'max')
  }

  return Response.json({ success: true, tags })
}
*/
