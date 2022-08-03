import { signUp } from './subscription'
import { NextApiRequest, NextApiResponse } from 'next'
import { validateFormRequest } from './forms/validateFormRequest'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if ((await validateFormRequest(req, res, 'subscribe form')) === true) {
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
}
