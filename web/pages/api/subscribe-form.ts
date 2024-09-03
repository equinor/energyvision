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
  const categories = data.subscribeFormParamers.categories
  const selectedLang = data.subscribeFormParamers.languageCode

  //Stoneshot tag ids for categories
  const tagIds = {
    generalNews: '18460',
    stockMarketAnnouncements: '18462',
    crudeOilAssays: '18463',
    magazineStories: '18461',
  }

  console.log('creds', process.env.STONESHOT_SUBSCRIPTION_FORM_CREDENTIALS)
  console.log('headers', 'Basic ' + btoa(process.env.STONESHOT_SUBSCRIPTION_FORM_CREDENTIALS))
  console.log(
    'body',
    JSON.stringify({
      email: data.subscribeFormParamers.email,
      segmentations: [{ segmentation_id: 91502, segment_id: selectedLang === 'en' ? '9378080' : '9378081' }],
      content_preferences: [
        ...categories.map((category: any) => {
          console.log('category', category)
          console.log('tag_id', tagIds[category])
          return {
            tag_id: tagIds[category],
          }
        }),
      ],
    }),
  )
  await fetch(STONESHOT_SUBSCRIPTION_FORM_URL, {
    method: 'POST',
    body: JSON.stringify({
      email: data.subscribeFormParamers.email,
      segmentations: [{ segmentation_id: 91502, segment_id: selectedLang === 'en' ? '9378080' : '9378081' }],
      content_preferences: [
        ...categories.map((category: any) => {
          console.log('category', category)
          console.log('tag_id', tagIds[category])
          return {
            tag_id: tagIds[category],
          }
        }),
      ],
    }),
    headers: {
      Authorization: 'Basic ' + btoa(process.env.STONESHOT_SUBSCRIPTION_FORM_CREDENTIALS),
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log('response', response)
      console.log('response status', response.status)
      console.log('response.text', response.statusText)
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
