import { crawlableDomains } from '@/lib/helpers/domainHelpers'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { NextResponse } from 'next/server'

const generateRobotsTxt = (domain: string) => `User-agent: *
${crawlableDomains.includes(domain) ? 'Allow' : 'Disallow'}: /
${
  domain === 'www.equinor.com'
    ? `Disallow: /search
Disallow: /search.html
Disallow: /?*topic
Disallow: /?*country
Disallow: /?*year
Disallow: /?*refinementList
Disallow: /?*sortBy`
    : ''
}
Sitemap: ${domain.startsWith('www') ? `https://${domain}` : domain}/sitemap.xml
`
export async function GET(request: Request) {
  const domain = new URL(request.url).host

  if (!crawlableDomains.includes(domain) && !Flags.IS_DEV) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const content = generateRobotsTxt(domain)

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
