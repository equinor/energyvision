import { signUp } from './subscription'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body
  await signUp(data).then((isSuccessful) => {
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
