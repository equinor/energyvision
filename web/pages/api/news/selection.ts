import { getNewsByFilters } from '../../../lib/queries/newsroom'
import { sanityClient } from '../../../lib/sanity.server'
import { NextApiRequest, NextApiResponse } from 'next'
import { getNameFromLocale } from '../../../lib/localization'

const isEmpty = (arr: (string | undefined)[]) => {
  return arr?.length === 0
}
export const isNotEmpty = (arr: (string | undefined)[]) => {
  return arr?.length > 0
}

export const toArray = (value: string | string[]) => {
  if (!value) {
    return []
  }
  return !Array.isArray(value) ? [value] : value
}

export const formatNewsroomQueryFilter = (query: any) => {
  const topic = toArray(query.topic)
  const country = toArray(query.country)
  const year = toArray(query.year)

  return {
    topic,
    country,
    year,
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lang = req.query.lang === 'no' ? getNameFromLocale('no') : getNameFromLocale('en') // Defaults to 'en' if the lang parameter is not 'no'
  const { topic, country, year } = formatNewsroomQueryFilter(req.query)
  const groqQuery = getNewsByFilters(isNotEmpty(topic), isNotEmpty(country), isNotEmpty(year), false, false)
  console.log('Fetch selection on', groqQuery)
  console.log(`return news on topic ${topic.toString()}, country: ${country.toString()}, year: ${year.toString()}`)

  try {
    const news = await sanityClient.fetch(groqQuery, {
      lang,
      tags: topic,
      countryTags: country,
      years: year,
    })
    res.status(200).json({ news: news })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' })
  }
}
