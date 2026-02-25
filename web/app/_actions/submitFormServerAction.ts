//web lib actions equinorFormServerAction
'use server'

import getToken from "@/lib/formTokenStore";

// ContactEquinor - CAT0012836
// OrderReports - CAT0012841
// CareersContactUs - CAT0012840
// CareerFairs - CAT0012839
export default async function submitFormServerAction(formData: any, catelogNumber: string) {
  const urlString = process.env.ACTION_BASE_URL_FOR_FORMS + '/' + catelogNumber;

  try {
    const token = await getToken()
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
