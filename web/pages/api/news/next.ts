import { NextApiRequest, NextApiResponse } from 'next'
import { getNameFromLocale } from '../../../lib/localization'
import { findGroqOnNewsroomFilters, formatNewsroomQueryFilter } from './selection'
import { sanityClient } from '../../../lib/sanity.server'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lang = req.query.lang === 'no' ? getNameFromLocale('no') : getNameFromLocale('en') // Defaults to 'en' if the lang parameter is not 'no'
  const { topic, country, year } = formatNewsroomQueryFilter(req.query)
  const groqQuery = findGroqOnNewsroomFilters(topic, country, year, false, true)
  console.log(`get news with lastId: ${req.query.lastId}`)
  console.log(`return news on topic ${topic.toString()}, country: ${country.toString()}, year: ${year.toString()}`)
  try {
    const news = await sanityClient.fetch(groqQuery, {
      lang,
      tags: topic,
      countryTags: country,
      years: year,
      lastId: req.query.lastId,
      //lastPublishedAt: req.query.lastPublishedAt,
    })
    res.status(200).json({ news: news })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' })
  }
}
