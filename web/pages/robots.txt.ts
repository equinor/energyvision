import { GetServerSideProps } from 'next'

const Robots = () => {
  return 'Loading...'
}

const crawlableDomains = [
  'www.equinor.com',
  'www.equinor.ar',
  'www.equinor.pl',
  'www.equinorstorage.de',
  'www.equinorfondene.no',
  'www.equinor.jp',
  'www.equinor.com.br',
  'www.equinor.de',
  'www.equinor.co.kr',
]

const robots = (domain: string) => `User-agent: *
${crawlableDomains.includes(domain) ? 'Allow' : 'Disallow'}: /
${domain === 'www.equinor.com' ? 'Disallow: /search' : ''}
Sitemap: ${domain.startsWith('www') ? `https://${domain}` : domain}/sitemap.xml
Crawl-delay: 10`

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const domain = String(req.headers.host)
  res.setHeader('Content-Type', 'text/plain')
  res.write(robots(domain))
  res.end()

  return {
    props: {},
  }
}

export default Robots
