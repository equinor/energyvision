import { sendRequestToServiceNow } from '../service-now-base'
import { validateFormRequest } from '../validateFormRequest'

export async function POST(req: Request) {
  const body = await req.json()
  const result = await validateFormRequest(
    body?.frcCaptchaSolution,
    'order reports form',
  )
  if (result.status !== 200) {
    return Response.json({ msg: result.message }, { status: result.status })
  }

  const { data } = body
  const catalogIdentifier = 'd1872741db26ea40977079e9bf961949'
  const email = encodeURI(data.email)
  const name = encodeURI(data.name)
  const address = encodeURI(data.address)
  const zipcode = encodeURI(data.zipcode)
  const city = encodeURI(data.city)
  const country = encodeURI(data.country)
  const company = encodeURI(data.company)
  const annualReport = data.reports.includes('annualReport') ? 'Yes' : 'No'
  const prospectusReport = data.reports.includes('prospectusReport')
    ? 'Yes'
    : 'No'
  const annualReportNorwegian = data.reports.includes('annualReportNorwegian')
    ? 'Yes'
    : 'No'

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
    '&annualReportNorwegian=' +
    annualReportNorwegian +
    '&AnnualReport=' +
    annualReport +
    '&Country=' +
    country +
    '&Email=' +
    email +
    '&ProspectusReport=' +
    prospectusReport

  const response = await sendRequestToServiceNow(urlString)
    .then(response => {
      if (
        JSON.parse(response).status === 'failure' ||
        JSON.parse(response).Status?.includes('Failure')
      ) {
        console.log('Failed to create ticket in service-now')
        return Response.json({ status: 500 })
      }
      return Response.json({ status: 200 })
    })
    .catch(error => {
      console.log('Error occured while sending request to ServiceNow', error)
      return Response.json({ status: 500 })
    })
  return response
}
