import createClient from '@sanity/client'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { newsPromotionQuery } from '../../lib/queries/news'

const clientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'global',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'h61q9gi9',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2021-12-17',
}

const sanityClient = createClient(clientConfig)

const approvedTypes = ['promoteNews']

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body)

  if (!body.type || !approvedTypes.includes(body.type)) {
    return res.status(204).end()
  }

  return sanityClient
    .fetch(newsPromotionQuery, body)
    .then((response) => {
      return res.status(200).send(response)
    })
    .catch((error) => {
      return res.status(500).send(error)
    })
}

export default handler
