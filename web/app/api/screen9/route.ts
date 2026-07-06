import type { NextRequest } from 'next/server'

const SCREEN9_BASE_URL = 'https://rest.screen9.com'
/* const SCREEN9_ACCOUNT_ID = process.env.SANITY_STUDIO_SCREEN9_ACCOUNT_ID
const SCREEN9_TOKEN = process.env.SANITY_STUDIO_SCREEN9_TOKEN */

export const dynamic = 'force-dynamic'

const buildTargetUrl = (request: NextRequest) => {
  const incoming = new URL(request.url)
  const targetPath = incoming.pathname.replace('/api/screen9', '') || '/'
  return `${SCREEN9_BASE_URL}${targetPath}${incoming.search}`
}

const proxyRequest = async (request: NextRequest) => {
  const targetUrl = buildTargetUrl(request)
  const headers = new Headers(request.headers)

  headers.delete('host')

  const response = await fetch(targetUrl, {
    method: 'GET',
    headers,
    cache: 'no-store',
  })

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
}

export async function GET(request: NextRequest) {
  /*   if (!SCREEN9_ACCOUNT_ID || !SCREEN9_TOKEN) {
    return new Response('Missing Screen9 credentials', { status: 500 })
  } */

  /*   const expectedAuth = `Basic ${Buffer.from(
    `${SCREEN9_ACCOUNT_ID}:${SCREEN9_TOKEN}`,
  ).toString('base64')}`
  const receivedAuth = request.headers.get('authorization')
  const isValidSignature = receivedAuth === expectedAuth */

  /*   if (!isValidSignature) {
    return new Response('Invalid signature', { status: 401 })
  } */

  return proxyRequest(request)
}
