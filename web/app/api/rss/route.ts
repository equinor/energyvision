import { defaultComponents, toHTML } from '@portabletext/to-html'
import { NextResponse } from 'next/server'
import { toPlainText } from 'next-sanity'
import { noCdnClient as client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/utils'
import {
  type LatestNewsType,
  latestNewsRss,
} from '../newsletter-rss/groq.global'

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

    const articles: LatestNewsType[] = await client.fetch(latestNewsRss, {
      lang: languageCode,
    })

    console.log(`Fetched ${articles.length} articles for RSS feed in ${lang}`)

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

    articles.forEach(article => {
      const hero = article.hero
      const bannerImageUrl = hero?.image?.asset
        ? urlForImage(hero.image)?.size(560, 280).auto('format').toString() ||
          ''
        : ''
      const imageAlt = hero?.image?.alt ? ` alt="${hero.image.alt}"` : ''
      const title =
        typeof article.title === 'string'
          ? article.title
          : toPlainText(article.title)
      const ingress = Array.isArray(article.ingress) ? article.ingress : []

      const descriptionHtml = toHTML(ingress, {
        components: serializers,
        onMissingComponent: e => String(e),
      })

      rss += `
        <item>
          <title>${title}</title>
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang') === 'no' ? 'no' : 'en'
  const rss = await generateRssFeed(lang)

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}
