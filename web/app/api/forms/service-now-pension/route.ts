import { NextApiRequest, NextApiResponse } from 'next'
import { PensionFormCatalogType } from '../../../../types'
import { sendRequestToServiceNow } from '../service-now-base'
import { validateFormRequest } from '../validateFormRequest'

const getCatalogIdentifier = (catalogType: PensionFormCatalogType | null) => {
  switch (catalogType) {
    case 'pension':
      return '6777904f938a2950eaf1f4527cba1048'
    case 'travelInsurance':
      return '1818180393ca2950eaf1f4527cba101d'
    case 'otherPensionInsuranceRelated':
      return '6777904f938a2950eaf1f4527cba1048'
    default:
      return '6777904f938a2950eaf1f4527cba1048'
  }
}
export async function POST(req: Request) {
  const result = await validateFormRequest(req, 'pension form')
  if (result.status !== 200) {
    return Response.json({ msg: result.message }, { status: result.status })
  }

  const body = await req.json()
  const catalogIdentifier = getCatalogIdentifier(body.catalogType)

  const data = body.data
  const email = encodeURI(data.email)
  const category = encodeURI(data.pensionCategory)
  const requests = encodeURI(data.requests)
  const name = encodeURI(data.name)

  const urlString =
    process.env.SERVICE_NOW_FORM_URL +
    '/api/stasa/statoildotcomproject/ContactUs/' +
    process.env.SERVICE_NOW_FORM_CATALOG_ITEM +
    '/' +
    catalogIdentifier +
    '?Email=' +
    email +
    '&Category=' +
    category +
    '&HowCanWeHelp=' +
    requests +
    '&Name=' +
    name

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
