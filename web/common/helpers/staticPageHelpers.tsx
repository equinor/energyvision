import getConfig from 'next/config'
import type { AppProps } from 'next/app'
import { Layout } from '@components'
import { Menu } from '../../pageComponents/shared/menu/Menu'

const getContentUrl = (locale: string, slug: string) => {
  const { publicRuntimeConfig } = getConfig()
  const archiveSeverURL = publicRuntimeConfig.archiveStorageURL

  if (slug === '/') {
    return `${archiveSeverURL}/${locale}.json`
  }
  return `${archiveSeverURL}/${locale}/${slug.replace(/\/$/, '')}.json`
}

const getLocalizedSlugs = async (locale: string, slug: string) => {
  const localePath = locale === 'en' ? 'no' : 'en'
  const contentUrl = getContentUrl(localePath, slug)
  const response = await fetch(contentUrl)

  if (response && response.status === 200) {
    return {
      en_GB: `en/${slug}`,
      nb_NO: `no/${slug}`,
    }
  }

  return {
    en_GB: null,
    nb_NO: null,
  }
}

export const getPageData = async (locale: string, slug: string) => {
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
      pageData = { ...pageData, allSlugs }
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
