import httpProxy from 'http-proxy'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false,
  },
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    const proxy: httpProxy = httpProxy.createProxy()

    proxy
      .once('proxyRes', resolve)
      .once('error', reject)
      .web(req, res, {
        target: `https://rest.screen9.com${req.url?.replace('/api/screen9', '')}`,
        changeOrigin: true,
        ignorePath: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
  })
