import { NextApiRequest, NextApiResponse } from 'next'
import { validateFormRequest } from './forms/validateFormRequest'

export const sendRequestToStoneShot = async (url: string) => {
  const headersList = {
    Accept: '*/*',
    Authorization: 'Basic ' + process.env.STONESHOT_SUBSCRIPTION_FORM_CREDENTIALS,
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: headersList,
  })
  return response.text()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await validateFormRequest(req, 'subscribe form')
  if (result.status !== 200) {
    return res.status(result.status).json({ msg: result.message })
  }

  const data = req.body.data
  const formParameters = data.subscribeFormParamers

  const additionalParameters = `
  {
    "stock_market": "${formParameters.stockMarketAnnouncements ? 'Y' : 'N'}",
    "company_news": "${formParameters.generalNews ? 'Y' : 'N'}",
    "crude_oil_assays": "${formParameters.crudeOilAssays ? 'Y' : 'N'}",
    "magazine": "${formParameters.magazineStories ? 'Y' : 'N'}",
    "type": "Investor",
    "lang": "${formParameters.languageCode}"
  }`

  const urlString =
    process.env.STONESHOT_SUBSCRIPTION_FORM_URL +
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
