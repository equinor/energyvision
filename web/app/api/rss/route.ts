import { defaultComponents, toHTML } from '@portabletext/to-html'
import type { PortableTextBlock } from '@portabletext/types'
import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/utils'
import { publishDateTimeQuery } from '@/sanity/queries/common/publishDateTime'
import { newsSlug } from '../../../../satellitesConfig.js'

const latestNews = `
*[_type == "news" && lang == $lang]
  | order(${publishDateTimeQuery} desc)[0...20]{
    title,
    'slug': slug.current,
    'publishDateTime': ${publishDateTimeQuery},
    ingress,
    heroImage{
      image{
        asset,
        alt
      }
    }
  }
`

type LatestNewsItem = {
  title: string
  slug: string
  publishDateTime: string
  ingress?: PortableTextBlock[]
  heroImage?: {
    image?: { asset?: { _ref?: string } | undefined; alt?: string }
  }
}

function mapFor(lang: 'no' | 'en') {
  return lang === 'no'
    ? {
        language: 'nb_NO',
        title: 'Equinor Nyheter',
        description: 'Siste nytt',
        localePrefix: '/no',
      }
    : {
        language: 'en_GB',
        title: 'Equinor News',
        description: 'Latest news',
        localePrefix: '',
      }
}

function renderIngress(blocks?: PortableTextBlock[]) {
  if (!blocks) return ''
  const components = {
    ...defaultComponents,
    marks: {
      ...defaultComponents.marks,
      sub: ({ children }: { children: string }) => `<sub>${children}</sub>`,
      sup: ({ children }: { children: string }) => `<sup>${children}</sup>`,
    },
  }
  //@ts-ignore: todo
  return toHTML(blocks as TypedObject | TypedObject[], {
    components,
    onMissingComponent: e => String(e),
  })
}

function buildItemHTML(
  item: LatestNewsItem,
  langCfg: ReturnType<typeof mapFor>,
) {
  const descriptionHtml = renderIngress(item.ingress)
  const img = item.heroImage?.image
  const imgUrl = img?.asset
    ? urlForImage(img)?.width(560).height(280).fit('crop').url()
    : ''
  const imgAlt = img && img.alt ? ` alt="${img.alt}"` : ''
  const section = newsSlug[langCfg.language as keyof typeof newsSlug] || 'news'
  const link =
    `https://www.equinor.com${langCfg.localePrefix}/${section}/${item.slug}`
      .replace(/\/+/, '/')
      .replace(':/', '://')
  return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(item.publishDateTime).toUTCString()}</pubDate>
      <description><![CDATA[${imgUrl ? `<img src="${imgUrl}"${imgAlt}/><br/>` : ''}${descriptionHtml}]]></description>
    </item>`
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lang: 'no' | 'en' = searchParams.get('lang') === 'no' ? 'no' : 'en'
  const langCfg = mapFor(lang)

  const sanityLang = lang === 'no' ? 'nb_NO' : 'en_GB'

  const articles: LatestNewsItem[] = await client.fetch(latestNews, {
    lang: sanityLang,
  })

  let rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${langCfg.title}</title>\n    <description>${langCfg.description}</description>\n    <language>${lang}</language>\n    <link>https://www.equinor.com</link>`

  for (const a of articles) {
    rss += buildItemHTML(a, langCfg)
  }

  rss += `\n  </channel>\n</rss>`

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
    },
  })
}
