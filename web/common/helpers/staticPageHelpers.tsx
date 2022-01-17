import getConfig from 'next/config'
import { AllSlugsType } from '../../pageComponents/shared/LocalizationSwitch'

const getContentUrl = (locale: string, slug: string) => {
  const { publicRuntimeConfig } = getConfig()
  const archiveSeverURL = publicRuntimeConfig.archiveStorageURL

  if (slug === '/') {
    return `${archiveSeverURL}/${locale}.json`
  }
  return `${archiveSeverURL}/${locale}/${slug.replace(/\/$/, '')}.json`
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
  const response = await fetch(contentUrl)

  if (response && response.status === 200) {
    const contentUrl = getContentUrl(locale, slug)
    const response = await fetch(contentUrl)

    let pageData
    try {
      pageData = await response.json()
      const allSlugs = await getLocalizedSlugs(locale, slug)
      pageData = { ...pageData, slugs: { allSlugs } }
    } catch (err) {
      console.log('error', err)
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

export const anchorClick = (e: any, router: any) => {
  if (e != null) {
    const targetLink = e.target.closest('a')
    if (!targetLink) return
    if (targetLink.href.includes('#')) {
      e.preventDefault()
      if (targetLink.href.split(router.locale).at(1).split('#').at(0) == router.asPath.split('#').at(0)) {
        router.replace(targetLink.href, undefined, { shallow: true })
      } else router.push(targetLink.href)
    }
  }
}
