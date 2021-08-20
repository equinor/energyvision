import { NextApiRequest, NextApiResponse } from 'next'
import { register, collectDefaultMetrics } from 'prom-client'

// TODO: When adding more stuff to register, we might need to reconsider where to clear
register.clear()
collectDefaultMetrics({})

console.log("Yeah!")

export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-type', register.contentType)
  res.send(await register.metrics())
}
