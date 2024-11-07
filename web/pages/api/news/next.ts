import { NextApiRequest, NextApiResponse } from 'next'
import { getNameFromLocale } from '../../../lib/localization'
import { sanityClient } from '../../../lib/sanity.server'
import { getNewsArticlesByPage } from '../../../lib/queries/newsroom'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lang = req.query.lang === 'no' ? getNameFromLocale('no') : getNameFromLocale('en') // Defaults to 'en' if the lang parameter is not 'no'

  console.log('get next from req.query.lastId', req.query.lastId)
  console.log('get next from req.query.lastPublishedAt', req.query.lastPublishedAt)
  try {
    const news = await sanityClient.fetch(getNewsArticlesByPage(false, true), {
      lang,
      lastId: req.query.lastId,
      lastPublishedAt: req.query.lastPublishedAt,
    })
    res.status(200).json({ news: news })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' })
  }
}
