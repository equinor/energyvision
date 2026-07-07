import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import { groq } from 'next-sanity'
import { algoliaClient } from '@/lib/algolia'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { client } from '@/sanity/lib/client'

const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || ''
const ALGOLIA_FUNCTION_URL = process.env.ALGOLIA_FUNCTION_URL || ''

// Next.js will by default parse the body, which can lead to invalid signatures
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
/* export const config = {
  api: {
    bodyParser: false,
  },
} */

const updateAlgoliaIndex = async (body: any) => {
  const headersList = {
    Accept: '*/*',
  }
  const response = await fetch(ALGOLIA_FUNCTION_URL, {
    method: 'POST',
    headers: headersList,
    body,
    cache: 'no-store',
  })
  return response
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME)
  const body = await req.text()

  if (!isValidSignature(body, signature || '', SANITY_API_TOKEN)) {
    console.log('Unauthorized request: Revalidate Endpoint')
    return new Response(
      JSON.stringify({ success: false, msg: 'Unauthorized!' }),
      { status: 401 },
    )
  }

  const data = JSON.parse(body)

  if (data._type === 'news') {
    // wait for news index and revalidate...
    const response = await updateAlgoliaIndex(body)
    if (Number(response.status) === 200) {
      const algoliaTaskIds = await response.json()
      console.log('Algolia Indexing Success', algoliaTaskIds)
      console.log(
        new Date(),
        'Revalidating by tag ',
        `newsroom_${data.language}`,
      )
      revalidateTag(`newsroom_${data.language}`, 'max')
      return new Response(
        JSON.stringify({ message: 'Index updated and newsroom revalidated' }),
        { status: 200 },
      )
    }
    return new Response(
      JSON.stringify({
        message: 'Error occured while updating newsroom revalidation',
      }),
      { status: 400 },
    )
  }
  const result = await client.fetch(
    groq`*[_type match "route_*" && content._ref == $id && excludeFromSearch != true][0]{"slug": slug.current}`,
    {
      id: data._id,
    },
  )
  try {
    if (result?.slug) {
      // slug exists for the topic or event
      const response = await updateAlgoliaIndex(body)
      if (Number(response.status) === 200) {
        return new Response(JSON.stringify({ message: 'Index updated' }), {
          status: 200,
        })
      }
      return new Response(JSON.stringify(response.body), { status: 400 })
    }
    return new Response(JSON.stringify({ message: 'No slug' }), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    })
  }
}
