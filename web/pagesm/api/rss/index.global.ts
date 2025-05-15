import { sanityClient } from '../../../lib/sanity.server'
import { LatestNewsType, latestNews } from './groq.global'
import { defaultComponents, toHTML } from '@portabletext/to-html'
import { urlFor } from '../../../common/helpers/urlFor'
import type { NextApiRequest, NextApiResponse } from 'next'

const generateRssFeed = async (lang: 'no' | 'en') => {
  try {
    const map = {
      en: {
        language: 'en_GB',
        title: 'Equinor News',
        description: 'Latest news',
      },
      no: {
        language: 'nb_NO',
        title: 'Equinor Nyheter',
        description: 'Siste nytt',
      },
    }
    const languageCode = map[lang].language || 'en_GB'

    const articles: LatestNewsType[] = await sanityClient.fetch(latestNews, { lang: languageCode })
    let rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
      <title>${map[lang].title}</title>
      <description>${map[lang].description}</description>
      <language>${lang}</language>
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
      const descriptionHtml = toHTML(article.ingress, {
        components: serializers,
        onMissingComponent: (e) => String(e),
      })

      const hero = article.hero
      const bannerImageUrl = hero?.image?.asset ? urlFor(hero.image).size(560, 280).auto('format').toString() : ''
      const imageAlt = hero?.image?.alt ? ` alt="${hero.image.alt}"` : ''

      rss += `
        <item>
          <title>${article.title}</title>
          <link>https://equinor.com${lang === 'no' ? '/no' : ''}${article.slug}</link>
          <guid>https://equinor.com${lang === 'no' ? '/no' : ''}${article.slug}</guid>
          <pubDate>${new Date(article.publishDateTime).toUTCString()}</pubDate>
          <description><![CDATA[<img src="${bannerImageUrl}"${imageAlt}/><br/>${descriptionHtml}]]></description>
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lang = req.query.lang === 'no' ? 'no' : 'en' // Defaults to 'en' if the lang parameter is not 'no'
  const rss = await generateRssFeed(lang)
  res.setHeader('Content-Type', 'text/xml')
  res.write(rss)
  res.end()
}
