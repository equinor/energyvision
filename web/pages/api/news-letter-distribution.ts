import { distribute } from './subscription'
import { languages } from '../../languages'
import { NewsDistributionParameters } from '../../types/types'
import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

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
  if(data.test == false){
  console.log("Sending distribution request for "+newsDistributionParameters.link)
  await distribute(newsDistributionParameters).then((isSuccessful) => {
    if (!isSuccessful) {
      return res.status(500).json({ msg: `Distribution failed ${newsDistributionParameters.link}` })
    }
    res.status(200).json({ msg: `Successfully distributed ${newsDistributionParameters.link}` })
  })
}
else{
  console.log("Test webhook"+ newsDistributionParameters.link)
  res.status(200).json({ msg: `Test Successfully distributed ${newsDistributionParameters.link}` })
}
}
