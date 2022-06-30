import { NextApiRequest, NextApiResponse } from 'next'
import { sendRequestToServiceNow } from './service-now-base'
import { validateCaptcha } from './validateCaptcha'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isHumanRightsInfoReq = req.body.isHumanRightsInformationRequest
  const catalogIdentifier = isHumanRightsInfoReq
    ? 'd0d1eaee47fb0950cd271141e36d439b'
    : '66f0ff89db2e2644ff6272dabf961945'
  const frcCaptchaSolution = req.body.frcCaptchaSolution
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

  if (!frcCaptchaSolution) {
    return res.status(500).json({ msg: 'Anti-robot check solution was not present' })
  }
  try {
    const { accept, errorCode } = await validateCaptcha(frcCaptchaSolution)
    if (!accept) {
      console.log(`Anti-robot check failed [code=${errorCode}] for contact equinor form`)
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
