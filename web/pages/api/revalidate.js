import { NextApiRequest } from 'next'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import getRawBody from 'raw-body'

const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || ''

// Next.js will by default parse the body, which can lead to invalid signatures
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  console.log('Revalidating path...')
  console.log('Datetime: ' + new Date())

  const signature = req.headers[SIGNATURE_HEADER_NAME]
  const body = (await getRawBody(req)).toString()

  if (!isValidSignature(body, signature, SANITY_API_TOKEN)) {
    console.log(req, 'Unauthorized request: Revalidate Endpoint')
    return res.status(401).json({ success: false, msg: 'Unauthorized!' })
  }
  const data = JSON.parse(body)

  try {
    await res.revalidate(data.slug)
    console.log('Successfully revalidated path: ', data.slug)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log('Error revalidating ', data.slug)
    return res.status(500).send('Error revalidating')
  }
}
