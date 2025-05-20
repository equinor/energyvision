import { sanityClient } from '../../../lib/sanity.server'
import { LatestNewsType, latestMagazine, latestNews } from './groq.global'
import { defaultComponents, toHTML } from '@portabletext/to-html'
import { urlFor } from '../../../common/helpers/urlFor'
import type { NextApiRequest, NextApiResponse } from 'next'
import { format, utcToZonedTime } from 'date-fns-tz'
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

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:nl="http://www.w3.org">
      <channel>
      <title>Equinor news and magazine stories</title>
      <description>Latest news and magazine stories</description>
      <link>https://www.equinor.com</link>`

    const serializers = {
      ...defaultComponents,
      marks: {
        ...defaultComponents.marks,
        sub: ({ children }: { children: string }) => `<sub>${children}</sub>`,
        sup: ({ children }: { children: string }) => `<sup>${children}</sup>`,
      },
    }

    articles.forEach((article) => {
      const langPath = article.lang === 'nb_NO' ? '/no' : ''
      const locale = article.lang === 'nb_NO' ? 'no' : 'en'
      const descriptionHtml = toHTML(article.ingress, {
        components: serializers,
        onMissingComponent: (e) => String(e),
      })

      const hero = article.hero
      const bannerImageUrl = hero?.image?.asset ? urlFor(hero.image).size(560, 280).auto('format').toString() : ''
      const imageAlt = hero?.image?.alt ? ` alt="${hero.image.alt}"` : ''

      const publishDate = new Date(article.publishDateTime)

      // Format the main pubDate
      const formattedPubDate = format(utcToZonedTime(publishDate, 'Europe/Oslo'), 'EEE, dd MMM yyyy HH:mm:ss xxxx', {
        timeZone: 'Europe/Oslo',
      })

      // Format the extra field date as dd.MM.yyyy
      const extraFormattedDate = format(utcToZonedTime(publishDate, 'Europe/Oslo'), 'dd.MM.yyyy', {
        timeZone: 'Europe/Oslo',
      })
      const categoryTag = article.type === 'magazine' ? 'magazineStories' : article.subscriptionType
      const title = article.type === 'magazine' ? toPlainText(article.title as PortableTextBlock[]) : article.title

      rss += `
        <item>
          <title>${title}</title>
          <link>https://equinor.com${langPath}${article.slug}</link>
          <guid>https://equinor.com${langPath}${article.slug}</guid>
          <pubDate>${formattedPubDate}</pubDate>
          <description><![CDATA[<img src="${bannerImageUrl}"${imageAlt}/><br/>${descriptionHtml}]]></description>
          <language>${article.lang}</language>
          ${categoryTag ? `<category>${mapCategoryToId(categoryTag, locale)}</category>` : ''}
          <nl:extra1>${extraFormattedDate}</nl:extra1>
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
