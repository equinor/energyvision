import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { groq } from 'next-sanity'
import { sanityClientWithEquinorCDN } from '@/sanity/lib/equinorCdnClient'
import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || ''
const ALGOLIA_FUNCTION_URL = process.env.ALGOLIA_FUNCTION_URL || ''

export const config = {
  api: {
    bodyParser: false,
  },
}

const updateAlgoliaIndex = async (body: any) => {
  const response = await fetch(ALGOLIA_FUNCTION_URL, {
    method: 'POST',
    headers: { Accept: '*/*' },
    body,
    cache: "no-store"
  })

  // Debug logs
  try {
    const text = await response.text()
    if (text) {
      console.log("Update Algolia Index Response:", text)
    }
  } catch (err) {
    console.log("Error parsing Algolia response:", err)
  }

  return response
}

// ✅ Polling function to confirm indexing
const waitForIndexConfirmation = async (objectID: string) => {
  const CHECK_URL = `${ALGOLIA_FUNCTION_URL}/checkRecord?objectID=${encodeURIComponent(objectID)}`
  let isIndexed = false

  while (!isIndexed) {
    const checkResponse = await fetch(CHECK_URL)
    if (checkResponse.status === 200) {
      isIndexed = true
    } else {
      await new Promise(resolve => setTimeout(resolve, 500)) // retry after 0.5s
    }
  }
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME)
  const body = await req.text()

  if (!isValidSignature(body, signature || '', SANITY_API_TOKEN)) {
    console.log('Unauthorized request: Revalidate Endpoint')
    return new Response(JSON.stringify({ success: false, msg: 'Unauthorized!' }), { status: 401 })
  }

  const data = JSON.parse(body)

  const revalidateNewsroomPages = async () => {
    console.log(new Date(), 'Revalidating: /news')
    revalidatePath('/news')
    revalidatePath('/no/nyheter')
  }

  if (data._type === 'news') {
    try {
      const response = await updateAlgoliaIndex(body)

      if (response.status === 204) {
        console.log('Algolia Indexing Success, waiting for confirmation...')
        await waitForIndexConfirmation(data._id) // Use Sanity _id or Algolia objectID

        console.log('Revalidating newsroom pages...')
        await revalidateNewsroomPages()

        return new Response(JSON.stringify({ message: "Index updated and newsroom revalidated" }), { status: 200 })
      } else {
        return new Response(JSON.stringify({ message: "Error occurred while updating Algolia index" }), { status: 400 })
      }
    } catch (error) {
      console.error(error)
      return new Response(JSON.stringify({ message: "Unexpected error", error: error }), { status: 500 })
    }
  }

  // Handle other types
  const result = await sanityClientWithEquinorCDN.fetch(
    groq`*[_type match "route_*" && content._ref == $id && excludeFromSearch != true][0]{"slug": slug.current}`,
    { id: data._id }
  )

  try {
    if (result?.slug) {
      const response = await updateAlgoliaIndex(body)
      if (response.status === 204) {
        return new Response(JSON.stringify({ message: "Index updated" }), { status: 200 })
      } else {
        return new Response(JSON.stringify({ message: "Error updating index" }), { status: 400 })
      }
    } else {
      return new Response(JSON.stringify({ message: "No slug" }), { status: 200 })
    }
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 })
  }
}
