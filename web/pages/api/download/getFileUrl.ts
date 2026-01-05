import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../../lib/sanity.server'
import { validateCaptcha } from '../validate/validateCaptcha'

const getFileUrlQuery = /* groq */ `
*[_type == "sanity.fileAsset" && _id == $fileId]{
    url
}
`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const frcCaptchaSolution = req.body.frcCaptchaSolution
  if (!frcCaptchaSolution) {
    res.status(500).json({ error: 'Anti-robot check solution was not present' })
  }

  try {
    const { accept, errorCode } = await validateCaptcha(frcCaptchaSolution)

    if (!accept || !!errorCode) {
      console.log(`Anti-robot check failed [code=${errorCode}]`)
      res.status(400).json({
        error: 'Anti-robot check failed [code=${errorCode}], please try again.',
      })
    }
    if (accept && !errorCode) {
      try {
        const result = await sanityClient.fetch(getFileUrlQuery, {
          fileId: req.body.fileId,
        })
        const equinorHref = result[0].url.replace('cdn.sanity.io', 'cdn.equinor.com')
        res.status(200).json({ url: equinorHref })
      } catch (err) {
        console.log('error getting file url:', err)
        res.status(500).json({ error: 'Failed to fetch file url' })
      }
    }
  } catch (err) {
    console.error('Error occured while attempting to validate captcha', err)
    res.status(502).json({ error: 'Failed to validate captcha' })
  }
}
