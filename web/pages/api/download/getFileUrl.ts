import { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../../lib/sanity.server'

const getFileUrlQuery = /* groq */ `
*[_type == "sanity.fileAsset" && originalFilename match $fileName]{
    url
}
`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await sanityClient.fetch(getFileUrlQuery, {
      fileName: req.query.fileName,
    })
    const equinorHref = result[0].url.replace('cdn.sanity.io', 'cdn.equinor.com')
    console.log('Returning fileUrl ', equinorHref)
    res.status(200).json({ url: equinorHref })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch file url' })
  }
}
