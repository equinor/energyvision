import getConfig from 'next/config'
import { NextRouter } from 'next/router'
import { AllSlugsType } from '../../pageComponents/shared/LocalizationSwitch'

const getContentUrl = (locale: string, slug: string) => {
  const { publicRuntimeConfig } = getConfig()
  const archiveSeverURL = publicRuntimeConfig.archiveStorageURL

  if (slug === '/' || slug === 'no' || slug === 'en') {
    return `${archiveSeverURL}/${locale}.json`
  }

  // @TODO: Investigate weird slug behaviour
  // When in a docker container, en/ and no/ are
  // prefixed to the slug when using the language switch
  const finalSlug = slug.replace('en/', '').replace('no/', '').replace(/\/$/, '')

  return `${archiveSeverURL}/${locale}/${finalSlug}.json`
}

const getLocalizedSlugs = async (locale: string, slug: string): Promise<AllSlugsType> => {
  const localePath = locale === 'en' ? 'no' : 'en'
  const contentUrl = getContentUrl(localePath, slug)
  const response = await fetch(contentUrl)

  if (response && response.status === 200) {
    const path = slug
      .split('/')
      .filter((v) => v !== '')
      .join('/')

    if (!path)
      return [
        {
          slug: 'en',
          lang: 'en_GB',
        },
        {
          slug: 'no',
          lang: 'nb_NO',
        },
      ]
    return [
      {
        slug: `en/${path}`,
        lang: 'en_GB',
      },
      {
        slug: `no/${path}`,
        lang: 'nb_NO',
      },
    ]
  }

  return []
}

export const getArchivedPageData = async (locale: string, slug: string) => {
  if (!slug || slug === '') return null

  /** Check if the required page is old archived AEM page or not
   * because AEM also has archived pages which has 'archive' the page path */
  const contentUrl = getContentUrl(locale, slug)

  const response = await fetch(contentUrl, { cache: 'no-cache' })

  if (response.status === 200) {
    let pageData
    try {
      pageData = await response.json()
      const allSlugs = await getLocalizedSlugs(locale, slug)
      pageData = { ...pageData, slugs: { allSlugs } }
    } catch (err) {
      console.error('Error parsing archived page data', err)
      pageData = null
    }

    return pageData
  }

  console.error(`Error fetching archive data: ${response.status} ${response.statusText}`, `URL: ${response.url}`)
  return null
}

// @TODO: figure out how to fetch list of relevant pages from azure
export const getPagePaths = async (path: string): Promise<string[]> => {
  if (path === 'what-we-do') {
    return ['/what-we-do/exploration']
  }

  return []
}

export const anchorClick = (
  e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
  router: NextRouter,
) => {
  if (e != null) {
    const targetLink = (e.target as Element).closest('a')
    if (!targetLink) return
    if (targetLink.href.includes('#')) {
      e.preventDefault()
      if (
        targetLink.href
          .split(router.locale || 'en')
          .at(1)
          ?.split('#')
          .at(0) == router.asPath.split('#').at(0)
      ) {
        router.replace(targetLink.href, undefined, { shallow: true })
      } else router.push(targetLink.href)
    }
  }
}
