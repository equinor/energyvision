import type { CareersContactFormCatalogType } from '../../../../types'
import { sendRequestToServiceNow } from '../service-now-base'
import { validateFormRequest } from '../validateFormRequest'

const getCatalogIdentifier = (
  catalogType: CareersContactFormCatalogType | null,
) => {
  switch (catalogType) {
    case 'suspectedRecruitmentScamRequest':
      return 'b04a9748832d8610347af830feaad382'
    case 'emergingTalentsQueries':
      return '3971e24c375a3640615af01643990ebf'
    default:
      return '59e02ac8375a3640615af01643990e7c'
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const result = await validateFormRequest(
    body?.frcCaptchaSolution,
    'careers contact form',
  )
  if (result.status !== 200) {
    return Response.json({ msg: result.message }, { status: result.status })
  }

  if (!req.body) {
    return Response.json({ msg: 'Invalid request' }, { status: 400 })
  }
  const catalogIdentifier = getCatalogIdentifier(body.catalogType)
  const data = body.data
  const phone = encodeURI(data.phone)
  const email = encodeURI(data.email)
  const category = encodeURI(data.category)
  const candidateType = encodeURI(data.candidateType)
  const questions = encodeURI(data.questions)
  const location = encodeURI(data.location)
  const name = encodeURI(data.name)
  const positionDetails = encodeURI(data.positionId)
  const preferredLang = encodeURI(data.preferredLang)
  const sendSupportingDocuments = data.supportingDocuments !== '' ? 'Yes' : 'No'

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
    preferredLang +
    '&SupportingDocuments=' +
    sendSupportingDocuments +
    '&CandidateType=' +
    candidateType

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
