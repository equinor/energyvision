//web lib actions equinorFormServerAction
'use server'

import getToken from '@/lib/formTokenStore'
import { careerFairFormSchema, careersContactFormSchema, contactEquinorFormSchema, orderReportsFormSchema } from '@/lib/zodSchemas/zodSchemas';
import { getTranslations } from 'next-intl/server';

// ContactEquinor - CAT0012836
// OrderReports - CAT0012841
// CareersContactUs - CAT0012840
// CareerFairs - CAT0012839
export default async function submitFormServerAction(
  formData: any,
  catalog: 'ContactEquinor'|'OrderReports' |  'CareersContactUs' | 'CareerFairs',
) {
  const t = await getTranslations();
  let validatedData 
   switch(catalog){
    case 'ContactEquinor': validatedData = contactEquinorFormSchema(t).safeParse(formData)
    case 'OrderReports': validatedData = orderReportsFormSchema(t).safeParse(formData)
    case 'CareersContactUs': validatedData = careersContactFormSchema(t).safeParse(formData)
    case 'CareerFairs': validatedData = careerFairFormSchema(t).safeParse(formData)
  } 

  if (!validatedData.success) {
    return { status: false, errors: validatedData.error }
  }
  
const getCatalogNumber = (catalog:string) =>{
    switch(catalog){
      case 'ContactEquinor': return "CAT0012836"
      case 'OrderReports': return "CAT0012841"
      case 'CareersContactUs': return "CAT0012840"
      case 'CareerFairs': return "CAT0012839"
    }
  }
  const urlString = process.env.ACTION_BASE_URL_FOR_FORMS + '/' + getCatalogNumber(catalog)

  try {
    const token = await getToken()
    const response = await fetch(urlString, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.ACTION_SUBSCRIPTION_KEY!,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const parsed = await response.json()

    if (parsed.status === 'failure' || parsed.Status?.includes('Failure')) {
      console.error('Failed to create ticket in ServiceNow')
      return { status: false, message: "Failed to submit." }
    }

    return { status: true,message:"Successfully submitted." }
  } catch (error) {
    console.error('Error occurred while sending request to ServiceNow', error)
    return { status: false, message: "Failed to submit." }
  }
}
