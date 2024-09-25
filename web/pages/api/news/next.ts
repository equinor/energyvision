import { NextApiRequest, NextApiResponse } from 'next'
import { getNameFromLocale } from '../../../lib/localization'
import { formatNewsroomQueryFilter, isNotEmpty } from './selection'
import { sanityClient } from '../../../lib/sanity.server'
import { getNewsByFilters } from '../../../lib/queries/newsroom'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lang = req.query.lang === 'no' ? getNameFromLocale('no') : getNameFromLocale('en') // Defaults to 'en' if the lang parameter is not 'no'
  const { topic, country, year } = formatNewsroomQueryFilter(req.query)
  const groqQuery = getNewsByFilters(isNotEmpty(topic), isNotEmpty(country), isNotEmpty(year), false, true)

  console.log(`return news on topic ${topic.toString()}, country: ${country.toString()}, year: ${year.toString()}`)
  try {
    console.log('Fetch next on', groqQuery)
    console.log('lastId', req.query.lastId)
    console.log('lastPublishedAt', req.query.lastPublishedAt)
    const news = await sanityClient.fetch(groqQuery, {
      lang,
      tags: topic,
      countryTags: country,
      years: year,
      lastId: req.query.lastId,
      lastPublishedAt: req.query.lastPublishedAt,
    })
    res.status(200).json({ news: news })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' })
  }
}
