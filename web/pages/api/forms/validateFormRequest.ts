import { NextApiRequest, NextApiResponse } from 'next'
import { validateCaptcha } from './validateCaptcha'

export async function validateFormRequest(req: NextApiRequest, res: NextApiResponse, formName: string) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Invalid request' })
  }

  const frcCaptchaSolution = req.body.frcCaptchaSolution
  if (!frcCaptchaSolution) {
    return res.status(500).json({ msg: 'Anti-robot check solution was not present' })
  }

  try {
    const { accept, errorCode } = await validateCaptcha(frcCaptchaSolution)
    if (!accept) {
      console.log(`Anti-robot check failed [code=${errorCode}] for ${formName}`)
      return res.status(400).json({ msg: `Anti-robot check failed [code=${errorCode}], please try again.` })
    }
  } catch (err) {
    console.error('Error occured while attempting to validate captcha', err)
    return res.status(502).json({ msg: 'failed to validate captcha' })
  }

  return true
}
