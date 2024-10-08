import { NextApiRequest, NextApiResponse } from 'next'
import { PensionFormCatalogType } from '../../../types'
import { sendRequestToServiceNow } from './service-now-base'
import { validateFormRequest } from './validateFormRequest'

const getCatalogIdentifier = (catalogType: PensionFormCatalogType | null) => {
    console.log(catalogType)
    switch (catalogType) {
      case 'pension':
        return '6777904f938a2950eaf1f4527cba1048';
      case 'travelInsurance':
        return '1818180393ca2950eaf1f4527cba101d';
      case 'otherPensionInsuranceRelated':
        return '6777904f938a2950eaf1f4527cba1048';
      default:
        return '6777904f938a2950eaf1f4527cba1048';
    }
  };
  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await validateFormRequest(req, 'pension form')
  if (result.status !== 200) {
    return res.status(result.status).json({ msg: result.message })
  }

  const catalogIdentifier = getCatalogIdentifier(req.body.catalogType)

  const data = req.body.data
  const email = encodeURI(data.email)
  const category = encodeURI(data.category)
  const requests = encodeURI(data.message)
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
    '&Requests=' +
    requests +
    '&Name=' +
    name

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
