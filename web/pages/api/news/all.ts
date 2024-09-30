import { getNewsroomData } from 'lib/fetchData'
import { getNameFromLocale } from '../../../lib/localization'
import { allNewsCountryTags, allNewsDocuments, allNewsTopicTags, allNewsYearTags } from '../../../lib/queries/newsroom'
import { sanityClient } from '../../../lib/sanity.server'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lang = req.query.lang === 'no' ? getNameFromLocale('no') : getNameFromLocale('en') // Defaults to 'en' if the lang parameter is not 'no'
  console.log('req.query', req.query)
  const queryParams = {
    lang,
  }
  try {
    const news = await sanityClient.fetch(allNewsDocuments, queryParams)

    const [{ data: topicTags }, { data: countryTags }, { data: yearTags }] = await Promise.all([
      getNewsroomData({
        query: allNewsTopicTags,
        queryParams,
      }),
      getNewsroomData({
        query: allNewsCountryTags,
        queryParams,
      }),
      getNewsroomData({
        query: allNewsYearTags,
        queryParams,
      }),
    ])

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
