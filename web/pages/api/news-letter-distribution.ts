import { distribute } from './subscription'
import { languages } from '../../languages'
import { NewsDistributionParameters } from '../../types/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { isValidRequest } from '@sanity/webhook'
import getConfig from 'next/config'

const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isValidRequest(req, SANITY_API_TOKEN)) {
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
    res.status(200).json({ msg: `Successfully distributed ${newsDistributionParameters.link}` })
  })
}
