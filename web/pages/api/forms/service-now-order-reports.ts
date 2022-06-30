import { NextApiRequest, NextApiResponse } from 'next'
import { sendRequestToServiceNow } from './service-now-base'
import { validateCaptcha } from './validateCaptcha'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const catalogIdentifier = 'd1872741db26ea40977079e9bf961949'

  const frcCaptchaSolution = req.body.frcCaptchaSolution
  const data = req.body.data
  const email = encodeURI(data.email)
  const name = encodeURI(data.name)
  const address = encodeURI(data.address)
  const zipcode = encodeURI(data.zipcode)
  const city = encodeURI(data.city)
  const country = encodeURI(data.country)
  const company = encodeURI(data.company)
  const annualReport = data.reports.includes('annualReport') ? 'Yes' : 'No'
  const prospectusReport = data.reports.includes('prospectusReport') ? 'Yes' : 'No'
  const statutoryReport = data.reports.includes('statutoryReport') ? 'Yes' : 'No'

  const urlString =
    process.env.SERVICE_NOW_FORM_URL +
    '/api/stasa/statoildotcomproject/OrderReports/' +
    process.env.SERVICE_NOW_FORM_CATALOG_ITEM +
    '/' +
    catalogIdentifier +
    '?Company=' +
    company +
    '&City=' +
    city +
    '&Address=' +
    address +
    '&Name=' +
    name +
    '&ZIP=' +
    zipcode +
    '&StatutoryReport=' +
    statutoryReport +
    '&AnnualReport=' +
    annualReport +
    '&Country=' +
    country +
    '&Email=' +
    email +
    '&ProspectusReport=' +
    prospectusReport

  if (!frcCaptchaSolution) {
    return res.status(500).json({ msg: 'Anti-robot check solution was not present' })
  }

  try {
    const { accept, errorCode } = await validateCaptcha(frcCaptchaSolution)
    if (!accept) {
      console.log(`Anti-robot check failed [code=${errorCode}] for order annual reports form`)
      return res.status(400).json({ msg: `Anti-robot check failed [code=${errorCode}], please try again.` })
    }
  } catch (err) {
    console.error('Error occured while attempting to validate captcha', err)
    return res.status(502).json({ msg: 'failed to validate captcha' })
  }

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
