import { distribute } from './subscription'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body
  await distribute(data).then((isSuccessful) => {
    if (!isSuccessful) {
      return res.status(500).json({ msg: 'Subscribe failed' })
    }
    res.status(200).json({ msg: `Successfully distributed. ${data}` })
  })
}
