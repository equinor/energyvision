import { headers } from 'next/headers'

type SearchParams = Record<string, string | string[] | undefined>

export async function isInPresentationTool(searchParams?: SearchParams) {
  const requestHeaders = await headers()
  const referer = requestHeaders.get('referer')?.toLowerCase() ?? ''

  const previewParam = searchParams?.preview
  const hasPreviewParam = Array.isArray(previewParam)
    ? previewParam.length > 0
    : typeof previewParam === 'string' && previewParam.length > 0

  return hasPreviewParam || referer.includes('/presentation')
}
