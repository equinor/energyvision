import { sendRequestToServiceNow } from '../service-now-base'
import { validateFormRequest } from '../validateFormRequest'

export async function POST(req: Request) {
  const body = await req.json()
  const result = await validateFormRequest(req.method, body, 'career fair and events form')
  if (result.status !== 200) {
    return Response.json({ msg: result.message }, { status: result.status })
  }

  const catalogIdentifier = '848f447ddb692600ff6272dabf961948'

  const data = body.data
  const email = encodeURI(data.email)
  const groupOrganisation = encodeURI(data.organisation)
  const contactPerson = encodeURI(data.contactPerson)
  const phone = encodeURI(data.phone)
  const event = encodeURI(data.event)
  const eventDescription = encodeURI(data.eventDescription)
  const website = encodeURI(data.website)
  const sendSupportingDocuments = data.supportingDocuments !== '' ? 'Yes' : 'No'
  const preferredLang = data.preferredLang

  const urlString =
    process.env.SERVICE_NOW_FORM_URL +
    '/api/stasa/statoildotcomproject/CareerFairs/' +
    process.env.SERVICE_NOW_FORM_CATALOG_ITEM +
    '/' +
    catalogIdentifier +
    '?SchoolOrganisation=' +
    groupOrganisation +
    '&ContactPerson=' +
    contactPerson +
    '&PhoneNumber=' +
    phone +
    '&Email=' +
    email +
    '&Event=' +
    event +
    '&DescriptionOfEvent=' +
    eventDescription +
    '&LinkToWebsite=' +
    website +
    '&SupportingDocuments=' +
    sendSupportingDocuments +
    '&PreferredLang=' +
    preferredLang

  await sendRequestToServiceNow(urlString)
    .then((response) => {
      if (JSON.parse(response).status == 'failure' || JSON.parse(response).Status?.includes('Failure')) {
        console.log('Failed to create ticket in service-now')
        Response.json({ status: 500 })
      }
      Response.json({ status: 200 })
    })
    .catch((error) => {
      console.log('Error occured while sending request to ServiceNow', error)
      Response.json({ status: 500 })
    })
}
