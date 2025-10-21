import { NextResponse } from 'next/server';
import { Flags } from '@/common/helpers/datasetHelpers'; // adjust path if needed

export const crawlableDomains = [
  'www.equinor.com',
  'www.equinor.ar',
  'www.equinor.pl',
  'www.equinorstorage.de',
  'www.equinorfondene.no',
  'www.equinor.jp',
  'www.equinor.com.br',
  'www.equinor.de',
  'www.equinor.co.kr',
  'www.equinorcelticsea.co.uk',
  'www.sponsorship.equinor.com',
];

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
`;

export async function GET(request: Request) {
  const domain = new URL(request.url).host;

  if (!crawlableDomains.includes(domain) && !Flags.IS_DEV) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const content = generateRobotsTxt(domain);

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}