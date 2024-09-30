import {
  allNewsCountryTagsWithFilter,
  allNewsTopicTagsWithFilter,
  allNewsYearTagsWithFilter,
  getNewsByFilters,
  getNewsByFiltersTEST,
  getNewsByFiltersV2,
} from '../../../lib/queries/newsroom'
import { sanityClient } from '../../../lib/sanity.server'
import { NextApiRequest, NextApiResponse } from 'next'
import { getNameFromLocale } from '../../../lib/localization'

const isEmpty = (arr: (string | undefined)[]) => {
  return arr?.length === 0
}
export const isNotEmpty = (arr: (string | undefined)[]) => {
  return arr?.length > 0
}

export const toArray = (value: string | string[] | undefined) => {
  if (!value) {
    return []
  }
  return !Array.isArray(value) ? [value] : value
}

export const formatNewsroomQueryFilter = (query: any) => {
  const topic = toArray(query?.topic)
  const country = toArray(query?.country)
  const year = toArray(query?.year)

  return {
    topic,
    country,
    year,
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lang = req.query.lang === 'no' ? getNameFromLocale('no') : getNameFromLocale('en') // Defaults to 'en' if the lang parameter is not 'no'
  const { topic, country, year } = formatNewsroomQueryFilter(req.query)
  const newsGroq = getNewsByFilters(isNotEmpty(topic), isNotEmpty(country), isNotEmpty(year), false, false) //getNewsByFilters(isNotEmpty(topic), isNotEmpty(country), isNotEmpty(year), false, false)
  const tagsGroq = allNewsTopicTagsWithFilter(isNotEmpty(topic), isNotEmpty(country), isNotEmpty(year))
  const countryTagsGroq = allNewsCountryTagsWithFilter(isNotEmpty(topic), isNotEmpty(country), isNotEmpty(year))
  const yearsGroq = allNewsYearTagsWithFilter(isNotEmpty(topic), isNotEmpty(country), isNotEmpty(year))
  console.log('Fetch tags with filter', tagsGroq)
  console.log('Fetch selection on', newsGroq)
  console.log('Fetch selection query', {
    lang,
    tags: topic,
    countryTags: country,
    years: year,
  })

  try {
    const news = await sanityClient.fetch(newsGroq, {
      lang,
      tags: topic,
      countryTags: country,
      years: year,
    })

    const [{ data: topicTags }, { data: countryTags }, { data: yearTags }] = await Promise.all([
      sanityClient.fetch(tagsGroq, {
        lang,
        tags: topic,
        countryTags: country,
        years: year,
      }),
      sanityClient.fetch(countryTagsGroq, {
        lang,
        tags: topic,
        countryTags: country,
        years: year,
      }),
      sanityClient.fetch(yearsGroq, {
        lang,
        tags: topic,
        countryTags: country,
        years: year,
      }),
    ])
    console.log('selection topicTags result', topicTags)
    const filteredYearTags = yearTags?.filter((n: string) => n)
    const uniqueYears = [...new Set<string>(filteredYearTags)]?.map((year: string) => {
      return {
        key: year,
        title: year,
        connectedNews: filteredYearTags.filter((y: string) => y === year)?.length,
      }
    })

    res.status(200).json({
      news: news,
      tags: {
        topic: topicTags,
        country: countryTags,
        year: uniqueYears,
      },
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' })
  }
}
