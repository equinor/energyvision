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
    console.log('get file url for', req.query.fileName)
    res.status(200).json({ url: result[0].url })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch file url' })
  }
}
