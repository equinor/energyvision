import { Flags } from '../../../common/helpers/datasetHelpers'
import { NextApiRequest, NextApiResponse } from 'next'
import { ContactFormCatalogType } from '../../../types'
import { sendRequestToServiceNow } from './service-now-base'
import { validateFormRequest } from './validateFormRequest'

const getCatalogIdentifier = (catalogType: ContactFormCatalogType | null) => {
  switch (catalogType) {
    case 'humanRightsInformationRequest':
      return 'd0d1eaee47fb0950cd271141e36d439b'
    case 'loginIssues':
      return '49f29a93dbb2ac10f42b2208059619a7'
    default:
      return '66f0ff89db2e2644ff6272dabf961945'
  }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await validateFormRequest(req, 'contact us form')
  if (result.status !== 200) {
    return res.status(result.status).json({ msg: result.message })
  }

  const catalogIdentifier = getCatalogIdentifier(req.body.catalogType)

  const data = req.body.data
  const email = encodeURI(data.email)
  const category = encodeURI(data.category)
  const howCanWeHelp = encodeURI(data.message)
  const tryingToReach = encodeURI(data.receiver)
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
    howCanWeHelp +
    '&TryingToReach=' +
    tryingToReach +
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
