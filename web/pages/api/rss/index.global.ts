import { sanityClient } from '../../../lib/sanity.server'
import { LatestNewsType, latestNews } from './groq.global'
import { defaultComponents, toHTML } from '@portabletext/to-html'
import { urlFor } from '../../../common/helpers/urlFor'
import type { NextApiRequest, NextApiResponse } from 'next'
import { format, utcToZonedTime } from 'date-fns-tz'

const generateRssFeed = async () => {
  try {
    // Fetch both English and Norwegian articles
    const [englishArticles, norwegianArticles] = await Promise.all([
      sanityClient.fetch(latestNews, { lang: 'en_GB' }),
      sanityClient.fetch(latestNews, { lang: 'nb_NO' }),
    ])

    // Merge the articles and sort by publish date (newest first)
    const articles: LatestNewsType[] = [...englishArticles, ...norwegianArticles].sort(
      (a, b) => new Date(b.publishDateTime).getTime() - new Date(a.publishDateTime).getTime(),
    )

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
      <title>Equinor News</title>
      <description>Latest news</description>
      <language>en_GB, nb_NO</language>
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
      const descriptionHtml = toHTML(article.ingress, {
        components: serializers,
        onMissingComponent: (e) => String(e),
      })

      const hero = article.hero
      const bannerImageUrl = hero?.image?.asset ? urlFor(hero.image).size(560, 280).auto('format').toString() : ''
      const imageAlt = hero?.image?.alt ? ` alt="${hero.image.alt}"` : ''

      const formattedPubDate = format(
        utcToZonedTime(new Date(article.publishDateTime), 'Europe/Oslo'),
        'EEE, dd MMM yyyy HH:mm:ss xxxx',
        {
          timeZone: 'Europe/Oslo',
        },
      )

      rss += `
        <item>
          <title>${article.title}</title>
          <link>https://equinor.com${langPath}${article.slug}</link>
          <guid>https://web-global-development-equinor-web-sites-dev.c2.radix.equinor.com${langPath}${
        article.slug
      }</guid>
          <pubDate>${formattedPubDate}</pubDate>
          <description><![CDATA[<img src="${bannerImageUrl}"${imageAlt}/><br/>${descriptionHtml}]]></description>
          <category>${article.lang.toUpperCase()}</category>
          ${article.subscriptionType ? `<category>${article.subscriptionType}</category>` : ''}
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
  const rss = await generateRssFeed()
  res.setHeader('Content-Type', 'text/xml')
  res.write(rss)
  res.end()
}
