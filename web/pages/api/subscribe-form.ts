import { signUp } from './subscription'
import { NextApiRequest, NextApiResponse } from 'next'
import { validateCaptcha  } from './forms/validateCaptcha'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body
  const frcCaptchaSolution = data.frcCaptchaSolution
  if (!frcCaptchaSolution) {
    return res.status(500).json({ msg: 'Anti-robot check solution was not present' })
  }

  try {
    const { accept, errorCode } = await validateCaptcha(frcCaptchaSolution)
    if (!accept) {
      console.log(`Anti-robot check failed [code=${errorCode}] for subscribe form`)
      return res.status(400).json({ msg: `Anti-robot check failed [code=${errorCode}], please try again.` })
    }
  } catch (err) {
    console.error(err)
    return res.status(502).json({ msg: 'failed to validate captcha' })
  }
  await signUp(data.subscribeFormParamers).then((isSuccessful) => {
    if (!isSuccessful) {
      res.status(500).json({ msg: 'Subscribe failed' })
    }
    else
     res.status(200).json({ msg: 'Successfully subscribed.' })
  })
  .catch((error)=>{
    res.status(500).json({ msg: `Subscribe failed ${error}` })
  })
}
