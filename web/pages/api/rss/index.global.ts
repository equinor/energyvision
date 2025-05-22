import { sanityClient } from '../../../lib/sanity.server'
import { LatestNewsType, latestMagazine, latestNews } from './groq.global'

import { urlFor } from '../../../common/helpers/urlFor'
import type { NextApiRequest, NextApiResponse } from 'next'
import { format } from 'date-fns'
import { TZDate } from '@date-fns/tz'
import { enGB, nb } from 'date-fns/locale'
import { mapCategoryToId } from '../subscription'
import { PortableTextBlock, toPlainText } from '@portabletext/react'

const generateRssFeed = async (locale: 'en_GB' | 'nb_NO') => {
  try {
    // Fetch both English and Norwegian articles from news and magazine
    const [newsArticles, magazineArticles] = await Promise.all([
      sanityClient.fetch(latestNews, { lang: locale }),
      sanityClient.fetch(latestMagazine, { lang: locale }),
    ])

    // Merge the articles and sort by publish date (newest first)
    const articles: LatestNewsType[] = [...newsArticles, ...magazineArticles].sort(
      (a, b) => new Date(b.publishDateTime).getTime() - new Date(a.publishDateTime).getTime(),
    )
    const newsLink = locale === 'en_GB' ? 'https://www.equinor.com/news/' : 'https://www.equinor.com/nyheter/'
    const newsRSSLink =
      locale === 'en_GB' ? 'https://www.equinor.com/api/rss?lang=en' : 'https://www.equinor.com/api/rss?lang=no'

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/" version="2.0" >
      <channel>
        <title>${
          locale === 'en_GB' ? 'Latest news and magazine stories - Equinor' : 'Siste nyheter og magasinsaker - Equinor'
        }</title>
        <link>${newsLink}</link>
        <description />
        <language>${locale === 'en_GB' ? 'en-gb' : 'no'}</language>
        <atom:link href="${newsLink}" type="text/html" rel="alternate"/>
        <atom:link href="${newsRSSLink}" type="application/rss+xml" rel="self"/>
    `

    articles.forEach((article) => {
      const langPath = article.lang === 'nb_NO' ? '/no' : ''
      const locale = article.lang === 'nb_NO' ? 'no' : 'en'

      const hero = article.hero
      const bannerImageUrl = hero?.image?.asset ? urlFor(hero.image).size(560, 280).auto('format').toString() : ''

      const publishDate = new Date(article.publishDateTime).toUTCString()
      console.log('publishDate', publishDate)

      // Format the main pubDate
      //const formattedPubDate =  //format(new TZDate(publishDate, 'Europe/Oslo'), 'EEE, dd MMM yyyy HH:mm:ss xxxx')

      const categoryTag = article.type === 'magazine' ? 'magazineStories' : article.subscriptionType
      const title = article.type === 'magazine' ? toPlainText(article.title as PortableTextBlock[]) : article.title

      rss += `
        <item>
          <title>${title}</title>
          <link>https://equinor.com${langPath}${article.slug}</link>
          <guid>https://equinor.com${langPath}${article.slug}</guid>
          <pubDate>${publishDate}</pubDate>
          <description>${toPlainText(article.ingress)}</description>
          ${categoryTag ? `<category>${mapCategoryToId(categoryTag, locale)}</category>` : ''}
          <nl:extra1>${format(new TZDate(publishDate, 'Europe/Oslo'), "d.MMMM yyyy hh:mm ('CEST')", {
            locale: article.lang === 'nb_NO' ? nb : enGB,
          })}</nl:extra1>
          <media:content medium="image" type="image/jpeg" url="${bannerImageUrl}">
            ${
              article.hero?.attribution
                ? `<media:credit role="photographer" scheme="urn:ebu">${article.hero?.attribution}</media:credit>`
                : ''
            }
            ${article.hero?.image?.alt ? `<media:title>${article.hero?.image?.alt}</media:title>` : ''}
          </media:content>
        </item>`
    })

    rss += `
      </channel>
    </rss>`

    return rss
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    throw new Error('Failed to generate RSS feed.')
  }
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { query } = _req
  const lang = query?.lang
  const locale = lang === 'no' ? 'nb_NO' : 'en_GB'
  const rss = await generateRssFeed(locale)
  res.setHeader('Content-Type', 'text/xml')
  res.write(rss)
  res.end()
}
