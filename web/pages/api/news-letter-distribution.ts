import { distribute } from './subscription'
import { languages } from '../../languages'
import { NewsDistributionParameters } from '../../types/types'
import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import { appInsights } from '../../common'

const { publicRuntimeConfig } = getConfig()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
      appInsights.trackEvent({ name: 'News Distribution Failure' })
      return res.status(500).json({ msg: `Distribution failed ${newsDistributionParameters.link}` })
    }
    appInsights.trackEvent({ name: 'News Distribution Success' })
    res.status(200).json({ msg: `Successfully distributed ${newsDistributionParameters.link}` })
  })
}
