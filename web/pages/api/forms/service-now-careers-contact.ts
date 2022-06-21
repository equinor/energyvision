import { NextApiRequest, NextApiResponse } from 'next'
import { sendRequestToServiceNow } from './service-now-base'
import { validateCaptcha } from './validateCaptcha'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const catalogIdentifier = '59e02ac8375a3640615af01643990e7c'
  const frcCaptchaSolution = req.body.frcCaptchaSolution
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

  if (!frcCaptchaSolution) {
    return res.status(500).json({ msg: 'Anti-robot check solution was not present' })
  }
  try {
    const { accept, errorCode } = await validateCaptcha(data.frcCaptchaSolution)
    if (!accept) {
      console.log(`Anti-robot check failed [code=${errorCode}] for careers contact form`)
      return res.status(400).json({ msg: `Anti-robot check failed [code=${errorCode}], please try again.` })
    }
  } catch (err) {
    console.error(err)
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
      console.log(error)
      res.status(500).end()
    })
}
