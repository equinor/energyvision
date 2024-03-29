import { NextApiRequest, NextApiResponse } from 'next'
import { sendRequestToServiceNow } from './service-now-base'
import { validateFormRequest } from './validateFormRequest'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await validateFormRequest(req, 'careers contact form')
  if (result.status !== 200) {
    return res.status(result.status).json({ msg: result.message })
  }

  const catalogIdentifier = '59e02ac8375a3640615af01643990e7c'
  const data = req.body.data
  const phone = encodeURI(data.phone)
  const email = encodeURI(data.email)
  const category = encodeURI(data.category)
  const questions = encodeURI(data.questions)
  const location = encodeURI(data.location)
  const name = encodeURI(data.name)
  const positionDetails = encodeURI(data.positionId)
  const preferredLang = encodeURI(data.preferredLang)

  const urlString =
    process.env.SERVICE_NOW_FORM_URL +
    '/api/stasa/statoildotcomproject/JobVacancies/' +
    process.env.SERVICE_NOW_FORM_CATALOG_ITEM +
    '/' +
    catalogIdentifier +
    '?Yourname=' +
    name +
    '&Phone=' +
    phone +
    '&Email=' +
    email +
    '&Category=' +
    category +
    '&PositionDetails=' +
    positionDetails +
    '&Location=' +
    location +
    '&Questions=' +
    questions +
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
