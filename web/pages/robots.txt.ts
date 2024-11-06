import { Flags } from '../common/helpers/datasetHelpers'
import { GetServerSideProps } from 'next'

const Robots = () => {
  return 'Loading...'
}

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
]

const robots = (domain: string) => `User-agent: *
${crawlableDomains.includes(domain) ? 'Allow' : 'Disallow'}: /
${
  domain === 'www.equinor.com'
    ? 'Disallow: /search \nDisallow: /search.html \nDisallow: /news \nDisallow: /nyheter  \nDisallow: &topics \nDisallow: &years \nDisallow: &countries'
    : ''
}
Sitemap: ${domain.startsWith('www') ? `https://${domain}` : domain}/sitemap.xml
`

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const domain = String(req.headers.host)

  if (!crawlableDomains.includes(domain) && !Flags.IS_DEV) {
    return {
      notFound: true,
    }
  }

  res.setHeader('Content-Type', 'text/plain')
  res.write(robots(domain))
  res.end()

  return {
    props: {},
  }
}

export default Robots
