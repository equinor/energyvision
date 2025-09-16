import { ContactFormCatalogType } from '../../../../types'
import { sendRequestToServiceNow } from '../service-now-base'
import { validateFormRequest } from '../validateFormRequest'

const getCatalogIdentifier = (catalogType: ContactFormCatalogType | null) => {
  switch (catalogType) {
    case 'loginIssues':
      return '49f29a93dbb2ac10f42b2208059619a7'
    default:
      return '66f0ff89db2e2644ff6272dabf961945'
  }
}
export async function POST(req: Request) {
  const result = await validateFormRequest(req, 'contact us form')
  if (result.status !== 200) {
    return Response.json({ msg: result.message }, { status: result.status })
  }

  const body = await req.json()
  const catalogIdentifier = getCatalogIdentifier(body.catalogType)

  const data = body.data
  const email = encodeURI(data.email)
  const category = encodeURI(data.category)
  const howCanWeHelp = encodeURI(data.message)
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
