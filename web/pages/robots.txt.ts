import { GetServerSideProps } from 'next'

const Robots = () => {
  return 'Loading...'
}

const crawlableDomains = ['www.equinor.com', 'www.equinor.pl', 'www.equinorstorage.de']

const robots = (domain: string) => `User-agent: *
${crawlableDomains.includes(domain) ? 'Allow' : 'Disallow'}: /
Sitemap: ${domain}/sitemap.xml
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
