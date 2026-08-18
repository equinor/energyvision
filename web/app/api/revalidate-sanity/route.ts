import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import {
  documentCacheTag,
  documentTypeCacheTag,
  IS_FETCH_OPTIMIZED,
  SANITY_CACHE_TAG,
} from '@/sanity/lib/fetch'

const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET || ''

/**
 * Replaces Sanity Live when the optimized fetch is enabled.
 * Only published documents trigger a revalidation, drafts are ignored.
 */
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
