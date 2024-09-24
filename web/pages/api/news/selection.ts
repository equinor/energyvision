import {
  getNewsByCountryAndAnotherCriteria,
  getNewsBySingleCriteria,
  getNewsByThreeCriteria,
  getNewsByTopicAndAnotherCriteria,
  getNewsByYearAndAnotherCriteria,
  getNewsDocuments,
} from '../../../lib/queries/newsroom'
import { sanityClient } from '../../../lib/sanity.server'
import { NextApiRequest, NextApiResponse } from 'next'
import { getNameFromLocale } from '../../../lib/localization'

const getGroqCombo = (
  isSingle: boolean,
  isTripple: boolean,
  isTopic: boolean,
  isCountry: boolean,
  isYear: boolean,
  hasFirstId?: boolean,
  hasLastId?: boolean,
) => {
  if (isSingle) {
    return getNewsBySingleCriteria(hasFirstId, hasLastId)
  }
  if (isTripple) {
    return getNewsByThreeCriteria(hasFirstId, hasLastId)
  }
  if (isTopic) {
    return getNewsByTopicAndAnotherCriteria(hasFirstId, hasLastId)
  }
  if (isCountry) {
    return getNewsByCountryAndAnotherCriteria(hasFirstId, hasLastId)
  }
  if (isYear) {
    return getNewsByYearAndAnotherCriteria(hasFirstId, hasLastId)
  }
  return getNewsDocuments(hasFirstId, hasLastId)
}
const isEmpty = (arr: (string | undefined)[]) => {
  return arr?.length === 0
}

export const formatNewsroomQueryFilter = (query: any) => {
  const topicArray = !Array.isArray(query.topic) ? [query.topic] : query.topic
  const topic = query.topic ? topicArray : []
  const countryArray = !Array.isArray(query.country) ? [query.country] : query.country
  const country = query.country ? countryArray : []
  const yearArray = !Array.isArray(query.year) ? [query.year] : query.year
  const year = query.year ? yearArray : []

  return {
    topic,
    country,
    year,
  }
}

export const findGroqOnNewsroomFilters = (
  topic: string[],
  country: string[],
  year: string[],
  hasFirstId?: boolean,
  hasLastId?: boolean,
) => {
  const isSingle = [topic, country, year].filter((arr) => !isEmpty(arr))?.length === 1
  const isTripple = [topic, country, year].filter((arr) => !isEmpty(arr))?.length === 3
  const isTopic = topic?.length > 0
  const isCountry = country?.length > 0
  const isYear = year?.length > 0

  console.log(
    `isSingle:${isSingle}, isTripple: ${isTripple}, isTopic:${isTopic}, isCountry:${isCountry}, isYear:${isYear}`,
  )
  const groqQuery = getGroqCombo(isSingle, isTripple, isTopic, isCountry, isYear, hasFirstId, hasLastId)

  return groqQuery
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lang = req.query.lang === 'no' ? getNameFromLocale('no') : getNameFromLocale('en') // Defaults to 'en' if the lang parameter is not 'no'
  const { topic, country, year } = formatNewsroomQueryFilter(req.query)
  const groqQuery = findGroqOnNewsroomFilters(topic, country, year)

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
