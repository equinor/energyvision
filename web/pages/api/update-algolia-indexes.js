import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { groq } from 'next-sanity'
import getRawBody from 'raw-body'
import { sanityClient } from '../../lib/sanity.server'

const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || ''
const ALGOLIA_FUNCTION_URL = process.env.ALGOLIA_FUNCTION_URL || ''

// Next.js will by default parse the body, which can lead to invalid signatures
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
}

const updateAlgoliaIndex = async (body) => {
  const headersList = {
    Accept: '*/*',
  }
  const response = await fetch(ALGOLIA_FUNCTION_URL, {
    method: 'POST',
    headers: headersList,
    body,
  })
  return response
}

export default async function handler(req, res) {
  const signature = req.headers[SIGNATURE_HEADER_NAME]
  const body = (await getRawBody(req)).toString()

  if (!isValidSignature(body, signature, SANITY_API_TOKEN)) {
    console.log(req, 'Unauthorized request: Update Algolia indexes Endpoint')
    return res.status(401).json({ success: false, msg: 'Unauthorized!' })
  }
  const data = JSON.parse(body)

  const revalidateNewsroomPages = async () => {
    console.log(new Date(), 'Revalidating: /news')
    res.revalidate(`/news`)
    console.log(new Date(), 'Revalidating: /no/nyheter')
    res.revalidate('/no/nyheter')
  }

  if (data._type === 'news') {
    // wait for news index and revalidate...
    const response = await updateAlgoliaIndex(body)
    if (response.status == 204) {
      console.log('Algolia Indexing Success , Revalidating newsroom')
      // wait for a second revalidate newsroom pages
      const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
      await sleep(1000) // wait for a second to let algolia index temporary fix as we dont know the status yet
      await revalidateNewsroomPages()
      return res.status(200).json('Index updated and newsroom revalidated')
    } else {
      return res.status(400).json(response.body)
    }
  }
  const result = await sanityClient.fetch(
    groq`*[_type match "route_*" && content._ref == $id && excludeFromSearch != true][0]{"slug": slug.current}`,
    {
      id: data._id,
    },
  )
  try {
    if (result?.slug) {
      // slug exists for the topic or event
      const response = updateAlgoliaIndex(body)
      if (response.status == 204) {
        return res.status(200).json('Index updated')
      } else {
        return res.status(400).json(response.body)
      }
    } else {
      return res.status(200).json('No slug')
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json('Internal error')
  }
}
