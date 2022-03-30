import { domain } from '../languages'
import { GetServerSideProps } from 'next'

const Robots = () => {
  return 'Loading...'
}

const robots = `User-agent: *
Allow: /
Sitemap: ${domain}/sitemap.xml
Crawl-delay: 10`

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain')
  res.write(robots)
  res.end()

  return {
    props: {},
  }
}

export default Robots
