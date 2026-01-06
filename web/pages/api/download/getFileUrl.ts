import type { NextApiRequest, NextApiResponse } from 'next'
import { validateCaptcha } from '../validate/validateCaptcha'

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
      res.status(200).end()
    }
  } catch (err) {
    console.error('Error occured while attempting to validate captcha', err)
    res.status(502).json({ error: 'Failed to validate captcha' })
  }
}
