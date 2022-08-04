import { signUp } from './subscription'
import { NextApiRequest, NextApiResponse } from 'next'
import { validateFormRequest } from './forms/validateFormRequest'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await validateFormRequest(req, 'subscribe form')
  if (result.status != 200) {
    return res.status(result.status).json({ msg: result.message })
  }
  const data = req.body
  await signUp(data.subscribeFormParamers)
    .then((isSuccessful) => {
      if (!isSuccessful) {
        res.status(500).json({ msg: 'Subscribe failed' })
      } else res.status(200).json({ msg: 'Successfully subscribed.' })
    })
    .catch((error) => {
      res.status(500).json({ msg: `Subscribe failed ${error}` })
    })
}
