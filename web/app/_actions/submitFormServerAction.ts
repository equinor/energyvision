//web lib actions equinorFormServerAction
'use server'

import { ContactFormCatalogType } from '../../types'
import { validateFormRequest } from '../../app/api/forms/validateFormRequest'
import { getAccessToken } from '../../lib/actions/getAccessToken'

export default async function submitFormServerAction(formData: any, catelogNumber: string) {
  const urlString = process.env.ACTION_BASE_URL_FOR_FORMS + '/' + catelogNumber;

  try {
    const token = await getAccessToken()
    const response = await fetch(urlString, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.ACTION_SUBSCRIPTION_KEY!,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: formData
    })

    const parsed = await response.json()
    console.log(response, parsed)
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
