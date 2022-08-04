import { NextApiRequest, NextApiResponse } from 'next'
import { sendRequestToServiceNow } from './service-now-base'
import { validateFormRequest } from './validateFormRequest'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await validateFormRequest(req, 'career fair and events form')
  if (result.status != 200) {
    return res.status(result.status).json({ msg: result.message })
  }

  const catalogIdentifier = '848f447ddb692600ff6272dabf961948'
  const data = req.body.data
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
        res.status(500).end()
      }
      res.status(200).end()
    })
    .catch((error) => {
      console.log('Error occured while sending request to ServiceNow', error)
      res.status(500).end()
    })
}
