import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body)
  res.status(200).json({ msg: 'Successfully reported.' })
}
