import getConfig from 'next/config'

export const getPageData = async (locale: string, path: string, slug: string) => {
  const { publicRuntimeConfig } = getConfig()
  const archiveSeverURL = publicRuntimeConfig.archiveStorageURL
  /** Check if the required page is old archived AEM page or not
   * because AEM also has archived pages which has 'archive' the page path */
  const response = await fetch(`${archiveSeverURL}/${locale}/${path}/${slug}.json`)

  let pageData
  try {
    pageData = await response.json()
  } catch (err) {
    console.log('error', err)
    pageData = null
  }

  return pageData
}
