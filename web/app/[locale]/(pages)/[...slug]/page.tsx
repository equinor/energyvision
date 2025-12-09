import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'
import { defaultLanguage, domain, languages, metaTitleSuffix } from '@/languageConfig'
import { isDateAfter } from '@/lib/helpers/dateUtilities'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import getPageSlugs from '@/sanity/helpers/getPageSlugs'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { getLocaleFromName, getNameFromLocale } from '@/sanity/localization'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import Header from '@/sections/Header/Header'
import { getQueryFromSlug } from '@/sanity/helpers/queryFromSlug'
import { footerQuery } from '@/sanity/queries/footer'
import Footer from '@/sections/Footer/Footer'

const MagazinePage = dynamic(() => import('@/templates/magazine/MagazinePage'))
const LandingPage = dynamic(() => import('@/templates/landingpage/LandingPage'))
const EventPage = dynamic(() => import('@/templates/event/Event'))
const NewsPage = dynamic(() => import('@/templates/news/News'))
const TopicPage = dynamic(() => import('@/templates/topic/TopicPage'))

type Props = {
  params: Promise<{ slug: string[]; locale: string }>
  searchParams: Promise<{ [key: string]: string[] | undefined }>
}

// slug is string[] when catch all, regular paths are string
const generateAlternatesLinks = (slug: string | string[], locale:string, slugs: { lang: string; slug: string }[]) => {

  console.log("generateAlternatesLinks locale",locale);
  console.log("generateAlternatesLinks slug",slug);
  console.log("generateAlternatesLinks slugs",slugs);

  const activeSlug =
    slugs.length > 0
      ? slugs.find(
          (slug) =>
            slug.lang === getNameFromLocale(locale),
        )?.slug
      : slug

  const canonicalSlug =
    locale === defaultLanguage.locale
      ? `${domain}${activeSlug !== '/' ? activeSlug : ''}`
      : `${domain}/${locale}${activeSlug !== '/' ? activeSlug : ''}`


  /** 
   * HOmepage:   
   * languages.forEach(({ locale }) => {
    Object.assign(alternateLinks, {
      [locale]: `${domain}${defaultLocale !== locale ? `/${locale}` : ''}`,
    })
  })
        alternates: {
      languages: {
        'en-GB': `${domain}/`,
        ...alternateLinks,
        'x-default': `${domain}/`,
      },
    },
   * 
  */

  const alternateLinks: Record<string, string> = {}
  slugs.forEach((slug) => {
    const slugLocale = getLocaleFromName(slug.lang)
    const correctedSlug = (
      defaultLanguage.locale !== slugLocale ? `/${slugLocale}` : ''
    ).concat(slug.slug !== '/' ? slug.slug : '')
    Object.assign(alternateLinks, { [slugLocale]: `${domain}${correctedSlug}` })
  })

  //Fallback page if no locale
  const defaultSlug = slugs.find(
    (slug) =>
      slug.lang === defaultLanguage.name,
  )?.slug
  const xDefaultSlug = `${domain}${defaultSlug === '/' ? '' : defaultSlug}`

  return {
      ...(locale === defaultLanguage.locale && { canonical: canonicalSlug }),
      languages: {
        ...alternateLinks,
        'x-default': xDefaultSlug,
      },
    }
}

const getRelativeSlug = (slug: string | string[]) => {
    // Homepage
    if(typeof slug === undefined ||  slug === ''){
      return ""
    }
    // Catch all segment 
    if( Array.isArray(slug)){
      return slug.join('/')
    }
    // next path folders
    return slug
}

const getLocalizationSlugs = (slug: string | string[], pageData: any) => {
    const validLanguages = languages.map(lang => lang.name)

    const pageSlugs =
      (pageData?.slugsFromTranslations ?? pageData?.slugs?.allSlugs ?? []).filter((e:any) => e).filter((slug:any) => validLanguages.includes(slug.lang))
  
    const defaultSlug = pageSlugs.find(
      (slug:any) => slug.lang === defaultLanguage.name,
    )

    const filteredSlugs = pageSlugs.filter(
     (slug:any) => slug.lang !== defaultLanguage.name,
    )
    return defaultSlug ? [defaultSlug, ...filteredSlugs] : pageSlugs

}

export const constructSanityMetadata = (slug: string | string[], locale:string, pageData: any) => {
  const fullSlug = `${domain}/${locale !== defaultLanguage.locale ? `${locale}/` : ''}${getRelativeSlug(slug)}`

    if (!pageData) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[generateMetadata] pageData is null', { slug, locale })
    }
    return {
      title: metaTitleSuffix,
      openGraph: {
        title: metaTitleSuffix,
        url: fullSlug,
        locale,
        type: 'article',
        siteName: 'Equinor',
      },
      alternates: {
        ...(locale === defaultLanguage.locale && { canonical: fullSlug }),
        languages: {},
      },
    }
  }

    const { documentTitle, title, metaDescription, openGraphImage, heroImage, publishDateTime, updatedAt } = pageData
    const plainTitle = Array.isArray(title) ? toPlainText(title) : title
    const ogImage = resolveOpenGraphImage(openGraphImage ?? heroImage?.image)

    const slugs = getLocalizationSlugs(slug, pageData)
    const modifiedDate = isDateAfter(publishDateTime, updatedAt)
    ? publishDateTime
    : updatedAt

    return {
    title: `${documentTitle ?? plainTitle} - ${metaTitleSuffix}`,
    description: metaDescription,
    openGraph: {
      title: plainTitle,
      description: metaDescription,
      url: fullSlug,
      locale,
      type: 'article',
      siteName: 'Equinor',
      publishedTime: publishDateTime,
      modifiedTime: modifiedDate,
      image: ogImage,
    },
    alternates: generateAlternatesLinks(slug, locale, slugs),
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  //array, separated by /. e.g. [news, last slug]
  const {slug, locale } = await params
  const { query, queryParams } = await getQueryFromSlug(slug, locale)
  const pageData =  await sanityFetch({
        query: query,
        params: queryParams,
        stega:false
  })
  console.log("Catch all page generateMetadata pageData", pageData);
  return constructSanityMetadata(slug, locale, pageData)
}

/* export async function generateStaticParams() {
	const slugs = await client.fetch<{ slug: string }[]>(
		groq`*[
			_type == 'page'
			&& defined(metadata.slug.current)
			&& !(metadata.slug.current in ['index'])
		]{
			'slug': metadata.slug.current
		}`,
	)

	return slugs.map(({ slug }) => ({ slug: slug.split('/') }))
} */

export default async function Page({ params }: Props) {
  const {slug, locale } = await params
  console.log("Catch all slug", slug);
  console.log("Catch all locale", locale);
  const {headerData, pageData, footerData} = await getPage({slug, locale})

  console.log("pageData",pageData);
  if (!pageData) notFound()

  const template = pageData?.template || null
  if (!template) console.warn('Missing template for',pageData?.slug)

  const getTemplate = () => {
    switch (template) {
      case 'landingPage':
        return <LandingPage data={pageData} />
      case 'event':
        return <EventPage data={pageData} />
      case 'news':
      case 'localNews':
        return <NewsPage {...pageData} />
      case 'magazine':
        return <MagazinePage {...pageData} />
      default:
        return <TopicPage {...pageData} />
    }
  }

  return (
    <>
        <Header
        {...headerData}
        />
      {getTemplate()}
      <Footer {...footerData} />
    </>
  )
}

type Params = { slug?: string | string[]; locale: string }

export async function getPage( params: Params) {
  const { slug, locale } = params
  console.log(`getPage slug - ${slug} -locale: ${locale}`)


  const { query: pageQuery, queryParams: pageQueryParams } =
    await getQueryFromSlug(slug as string[], locale)

  const [headerData,fullData, footerData] =
    await Promise.all([
      sanityFetch({
        query: Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery,
        params: { lang: pageQueryParams.lang },
        tags:['siteMenu', 'subMenu']
      }),
      sanityFetch({
        query: pageQuery,
        tags:['homePage','page','event','landingPage', 'news', 'localNews', 'magazine'],
        params: { ...pageQueryParams },
      }),
      sanityFetch({
          query: footerQuery,
          params: {
            lang: pageQueryParams.lang
          },
        })
    ])
    const { pageData} = fullData
    const slugs = getPageSlugs(pageData)
    const {stickyMenu, ...restPageData} = pageData || {} 

    return {
      headerData:{
        slugs,
        stickyMenu,
        menuData: headerData
      }, 
      pageData:restPageData,
      footerData

    }
}
