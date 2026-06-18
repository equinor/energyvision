//web lib actions equinorFormServerAction
'use server'

import getToken from '@/lib/formTokenStore'
import {
  ALLOWED_CATALOG_NUMBERS,
  type AllowedCatalogNumber,
} from './formCatalogNumbers'

const REQUEST_TIMEOUT_MS = 10_000

export default async function submitFormServerAction(
  formData: any,
  catelogNumber: AllowedCatalogNumber,
) {
  const baseUrl = process.env.ACTION_BASE_URL_FOR_FORMS

  if (!baseUrl) {
    console.error('Missing ACTION_BASE_URL_FOR_FORMS')
    return { status: 500 }
  }

  if (!ALLOWED_CATALOG_NUMBERS.has(catelogNumber)) {
    console.error('Invalid catalog number format')
    return { status: 400 }
  }

  let urlString: string

  try {
    const parsedBaseUrl = new URL(baseUrl)

    if (parsedBaseUrl.protocol !== 'https:') {
      console.error('Invalid ACTION_BASE_URL_FOR_FORMS protocol')
      return { status: 500 }
    }

    if (parsedBaseUrl.username || parsedBaseUrl.password) {
      console.error('Invalid ACTION_BASE_URL_FOR_FORMS credentials')
      return { status: 500 }
    }

    if (parsedBaseUrl.search || parsedBaseUrl.hash) {
      console.error('Invalid ACTION_BASE_URL_FOR_FORMS query or hash')
      return { status: 500 }
    }

    const normalizedBasePath = parsedBaseUrl.pathname.replace(/\/$/, '')
    parsedBaseUrl.pathname = `${normalizedBasePath}/${catelogNumber}`
    parsedBaseUrl.search = ''
    parsedBaseUrl.hash = ''

    urlString = parsedBaseUrl.toString()
  } catch {
    console.error('Invalid ACTION_BASE_URL_FOR_FORMS value')
    return { status: 500 }
  }

  try {
    const subscriptionKey = process.env.ACTION_SUBSCRIPTION_KEY

    if (!subscriptionKey) {
      console.error('Missing ACTION_SUBSCRIPTION_KEY')
      return { status: 500 }
    }

    const token = await getToken()
    const response = await fetch(urlString, {
      method: 'POST',
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      console.error('ServiceNow request failed with status', response.status)
      return { status: 500 }
    }

    const contentType = response.headers.get('content-type')

    if (!contentType?.toLowerCase().includes('application/json')) {
      console.error('Unexpected ServiceNow response content type')
      return { status: 500 }
    }

    const parsed = await response.json()

    if (parsed.status === 'failure' || parsed.Status?.includes('Failure')) {
      console.error('Failed to create ticket in ServiceNow')
      return { status: 500 }
    }

    return { status: 200 }
  } catch (error) {
    console.error('Error occurred while sending request to ServiceNow', error)
    return { status: 500 }
  }
}
