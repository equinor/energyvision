import { TZDate } from '@date-fns/tz'
import { format } from 'date-fns'
import { enGB, nb } from 'date-fns/locale'
import { NextResponse } from 'next/server'
import { toPlainText } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/utils'
import {
  type newsletterCategoryKeys,
  type newsletterCategoryLocale,
  newsletterCategoryMap,
} from '@/types/newsLetterTypes'
import { type LatestNewsType, latestMagazine, latestNews } from './groq.global'

const generateRssFeed = async (locale: 'en_GB' | 'nb_NO') => {
  try {
    // Fetch both English and Norwegian articles from news and magazine
    const [newsArticles, magazineArticles] = await Promise.all([
      client.fetch(latestNews, { lang: locale }),
      client.fetch(latestMagazine, { lang: locale }),
    ])

    // Merge the articles and sort by publish date (newest first)
    const articles: LatestNewsType[] = [
      ...newsArticles,
      ...magazineArticles,
    ].sort(
      (a, b) =>
        new Date(b.publishDateTime).getTime() -
        new Date(a.publishDateTime).getTime(),
    )
    const newsLink =
      locale === 'en_GB'
        ? 'https://www.equinor.com/news/'
        : 'https://www.equinor.com/no/nyheter/'
    const newsRSSLink =
      locale === 'en_GB'
        ? 'https://www.equinor.com/api/rss?lang=en'
        : 'https://www.equinor.com/api/rss?lang=no'

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/" xmlns:nl="http://www.w3.org" version="2.0">
      <channel>
        <title>${
          locale === 'en_GB'
            ? 'Latest news and magazine stories - Equinor'
            : 'Siste nyheter og magasinsaker - Equinor'
        }</title>
        <link>${newsLink}</link>
        <description />
        <language>${locale === 'en_GB' ? 'en-gb' : 'no'}</language>
        <atom:link href="${newsLink}" type="text/html" rel="alternate"/>
        <atom:link href="${newsRSSLink}" type="application/rss+xml" rel="self"/>
    `

    articles.forEach(article => {
      const langPath = article.lang === 'nb_NO' ? '/no' : ''
      const locale = (
        article.lang === 'nb_NO' ? 'no' : 'en'
      ) as newsletterCategoryLocale

      const hero = article.hero
      const bannerImageUrl = hero?.image?.asset
        ? //@ts-ignore:todo
          urlForImage(hero.image)
            .size(560, 280)
            .auto('format')
            .toString()
        : ''
      const encodedUrl = bannerImageUrl.replace(/&/g, '&amp;')

      const publishDate = new Date(article.publishDateTime).toUTCString()
      console.log('article.publishDateTime', article.publishDateTime)
      console.log('publishDate', publishDate)

      // Format the main pubDate
      //const formattedPubDate =  //format(new TZDate(publishDate, 'Europe/Oslo'), 'EEE, dd MMM yyyy HH:mm:ss xxxx')

      const categoryTag = (
        article.type === 'magazine'
          ? 'magazineStories'
          : article.subscriptionType
      ) as newsletterCategoryKeys
      const title =
        article.type === 'magazine'
          ? //@ts-ignore: todo
            toPlainText(article.title)
          : article.title

      rss += `
        <item>
          <title>${title}</title>
          <link>https://equinor.com${langPath}${article.slug}</link>
          <guid>https://equinor.com${langPath}${article.slug}</guid>
          <pubDate>${publishDate}</pubDate>
          <description>${toPlainText(article.ingress)}</description>
          ${categoryTag ? `<category>${newsletterCategoryMap[locale][categoryTag]}</category>` : '<category />'}
          <nl:extra1>${format(
            new TZDate(publishDate, 'Europe/Oslo'),
            "d.MMMM yyyy hh:mm ('CEST')",
            {
              locale: article.lang === 'nb_NO' ? nb : enGB,
            },
          )}</nl:extra1>
          ${
            hero?.image?.asset
              ? `<media:content medium="image" type="image/jpeg" url="${encodedUrl}">
            ${
              article.hero?.attribution
                ? `<media:credit role="photographer" scheme="urn:ebu">${article.hero?.attribution}</media:credit>`
                : '<media:credit/>'
            }
            ${article.hero?.image?.alt ? `<media:title>${article.hero?.image?.alt}</media:title>` : '<media:title />'}
          </media:content>`
              : ''
          }
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang')
  const locale = lang === 'no' ? 'nb_NO' : 'en_GB'
  const rss = await generateRssFeed(locale)

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}
