import { tz } from '@date-fns/tz'
import { type PortableTextBlock, toPlainText } from '@portabletext/react'
import { format } from 'date-fns'
import { enGB, nb } from 'date-fns/locale'
import type { NextApiRequest, NextApiResponse } from 'next'
import { urlFor } from '../../../common/helpers/urlFor'
import { previewClient } from '../../../lib/sanity.server'
import { mapCategoryToId } from '../subscriptionNew'
import { type LatestNewsType, latestMagazine, latestNews } from './groq.global'

const generateRssFeed = async (locale: 'en_GB' | 'nb_NO') => {
  try {
    // Fetch both English and Norwegian articles from news and magazine
    const [newsArticles, magazineArticles, settings] = await Promise.all([
      previewClient.fetch(latestNews, { lang: locale }),
      previewClient.fetch(latestMagazine, { lang: locale }),
      previewClient.fetch(/* groq */ `*[_type == "settings"][0]{logo}`),
    ])

    // Merge the articles and sort by publish date (newest first)
    const articles: LatestNewsType[] = [...newsArticles, ...magazineArticles].sort(
      (a, b) => new Date(b.publishDateTime).getTime() - new Date(a.publishDateTime).getTime(),
    )
    const newsLink = locale === 'en_GB' ? 'https://www.equinor.com/news/' : 'https://www.equinor.com/no/nyheter/'
    const newsRSSLink =
      locale === 'en_GB' ? 'https://www.equinor.com/api/rss?lang=en' : 'https://www.equinor.com/api/rss?lang=no'

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/" xmlns:nl="http://www.w3.org" version="2.0">
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

      const hero = article.hero
      const bannerImageUrl = hero?.image?.asset ? urlFor(hero.image).size(560, 280).auto('format').toString() : ''
      const logoImageUrl = settings?.logo?.asset ? urlFor(settings.logo).size(402, 160).auto('format').toString() : ''
      const encodedUrl = bannerImageUrl.replace(/&/g, '&amp;')
      const encodedLogoUrl = logoImageUrl.replace(/&/g, '&amp;')

      const publishDate = new Date(article.publishDateTime)
      const dateFormat = article.lang === 'nb_NO' ? 'd. MMMM yyyy HH:mm' : 'd MMMM yyyy HH:mm'

      const tzName =
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Oslo',
          timeZoneName: 'short',
        })
          .formatToParts(publishDate)
          .find((p) => p.type === 'timeZoneName')?.value ?? ''

      const formattedPubDate = `${format(publishDate, dateFormat, {
        in: tz('Europe/Oslo'),
        locale: article.lang === 'nb_NO' ? nb : enGB,
      })} (${tzName})`

      const categoryTag = article.type === 'magazine' ? 'magazineStories' : article.subscriptionType
      const title = article.type === 'magazine' ? toPlainText(article.title as PortableTextBlock[]) : article.title

      rss += `
        <item>
          <title>${title}</title>
          <link><![CDATA[https://www.equinor.com${langPath}${
            article.slug
          }?utm_source=newssubscription&utm_medium=email]]></link>
          <guid><![CDATA[https://www.equinor.com${langPath}${
            article.slug
          }?utm_source=newssubscription&utm_medium=email]]></guid>
          <pubDate>${publishDate}</pubDate>
          <description><![CDATA[${toPlainText(article.ingress)}]]></description>
          ${
            categoryTag
              ? `<category>${mapCategoryToId(categoryTag, locale === 'nb_NO' ? 'no' : 'en')}</category>`
              : '<category />'
          }
          <nl:extra1>${formattedPubDate}</nl:extra1>
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
          ${
            settings?.logo?.asset
              ? `
          <nl:extra2><![CDATA[<img src="${encodedLogoUrl}" alt="Equinor logo" />]]></nl:extra2>`
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

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { query } = _req
  const lang = query?.lang
  const locale = lang === 'no' ? 'nb_NO' : 'en_GB'
  const rss = await generateRssFeed(locale)
  res.setHeader('Content-Type', 'text/xml')
  res.write(rss)
  res.end()
}
