import { getNameFromLocale } from '../../../lib/localization'
import { allNewsDocuments } from '../../../lib/queries/newsroom'
import { sanityClient } from '../../../lib/sanity.server'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lang = req.query.lang === 'no' ? getNameFromLocale('no') : getNameFromLocale('en') // Defaults to 'en' if the lang parameter is not 'no'
  console.log('req.query', req.query)
  try {
    const news = await sanityClient.fetch(allNewsDocuments, {
      lang,
    })
    res.status(200).json({ news: news })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' })
  }
}
