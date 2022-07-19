import { distribute } from './subscription'
import { languages } from '../../languages'
import { NewsDistributionParameters } from '../../types/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import getConfig from 'next/config'

const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || ''

// Next.js will by default parse the body, which can lead to invalid signatures
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
}

async function readBody(readable: NextApiRequest) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

const logRequest = (req: NextApiRequest, title: string) => {
  console.log('\n\n')
  console.log(title)
  console.log('Datetime: ' + new Date())
  console.log('Headers:\n', req.headers)
  console.log('Body:\n', req.body)
  console.log('\n\n')
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const signature = req.headers[SIGNATURE_HEADER_NAME] as string
  const body = await readBody(req)
  console.log('Sending newsletter...')
  if (!isValidSignature(body, signature, SANITY_API_TOKEN)) {
    logRequest(req, 'Unauthorized request: Newsletter Distribution Endpoint')
    return res.status(401).json({ success: false, msg: 'Unauthorized!' })
  }
  const { publicRuntimeConfig } = getConfig()
  const data = req.body
  const locale = languages.find((lang) => lang.name == data.languageCode)?.locale || 'en'
  const newsDistributionParameters: NewsDistributionParameters = {
    timeStamp: data.timeStamp,
    title: data.title,
    ingress: data.ingress,
    link: `${publicRuntimeConfig.domain}/${locale}${data.link}`,
    newsType: data.newsType,
    languageCode: locale,
  }
  await distribute(newsDistributionParameters).then((isSuccessful) => {
    if (!isSuccessful) {
      return res.status(400).json({ msg: `Distribution failed ${newsDistributionParameters.link}` })
    }
    console.log('Newsletter sent successfully!')
    res.status(200).json({ msg: `Successfully distributed ${newsDistributionParameters.link}` })
  })
}
