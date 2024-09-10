import { NextApiRequest, NextApiResponse } from 'next'
import { validateFormRequest } from './forms/validateFormRequest'

const STONESHOT_SUBSCRIPTION_FORM_URL = 'https://api.stoneshot.com/v1/contacts/createOrUpdate'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /*   const result = await validateFormRequest(req, 'subscribe form')
  if (result.status !== 200) {
    return res.status(result.status).json({ msg: result.message })
  } */
  console.log('subscription formhandler', req.body.subscribeFormParamers)

  const data = req.body
  //Stoneshot tag ids for categories
  const tagIds = {
    generalNews: '18460',
    stockMarketAnnouncements: '18462',
    crudeOilAssays: '18463',
    magazineStories: '18461',
  }

  let categories = []
  if (data.subscribeFormParamers.categories.includes('all')) {
    categories = Object.values(tagIds).map((value: string) => {
      return {
        tag_id: value,
      }
    })
  } else {
    categories = data.subscribeFormParamers.categories.map((category: string) => {
      return {
        tag_id: tagIds[category],
      }
    })
  }

  const selectedLang = data.subscribeFormParamers.languageCode

  console.log(
    'body',
    JSON.stringify({
      email: data.subscribeFormParamers.email,
      segmentations: [{ segmentation_id: 91502, segment_id: selectedLang === 'en' ? '9378080' : '9378081' }],
      content_preferences: categories,
    }),
  )
  await fetch(STONESHOT_SUBSCRIPTION_FORM_URL, {
    method: 'POST',
    body: JSON.stringify({
      email: data.subscribeFormParamers.email,
      segmentations: [{ segmentation_id: 91502, segment_id: selectedLang === 'en' ? '9378080' : '9378081' }],
      content_preferences: categories,
    }),
    headers: {
      Authorization: 'Basic ' + btoa(process.env.STONESHOT_SUBSCRIPTION_FORM_CREDENTIALS),
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status === 401 || response.status === 400 || response.status === 500) {
        console.log('Failed to subscribe')
        res.status(500).end()
      }
      res.status(200).end()
    })
    .catch((error) => {
      console.log('Error occured while sending request to Stoneshot', error)
      res.status(500).end()
    })
}
