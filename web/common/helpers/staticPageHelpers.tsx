import getConfig from 'next/config'
import type { AppProps } from 'next/app'
import { Layout } from '@components'
import { Menu } from '../../tempcomponents/shared/menu/Menu'

export const getPageData = async (locale: string, slug = '') => {
  const { publicRuntimeConfig } = getConfig()
  const archiveSeverURL = publicRuntimeConfig.archiveStorageURL

  const getContentUrl = (slug: string) => {
    if (slug === '' || slug === '/') {
      return `${archiveSeverURL}/${locale}.json`
    }
    return `${archiveSeverURL}/${locale}/${slug}.json`
  }

  /** Check if the required page is old archived AEM page or not
   * because AEM also has archived pages which has 'archive' the page path */
  const response = await fetch(getContentUrl(slug))
  let pageData
  try {
    pageData = await response.json()
  } catch (err) {
    console.log('error', err)
    pageData = null
  }

  return pageData
}

// @TODO: figure out how to fetch list of relevant pages from azure
export const getPagePaths = async (path: string): Promise<string[]> => {
  if (path === 'what-we-do') {
    return ['/what-we-do/exploration']
  }

  return []
}

export const getPageLayout = (page: AppProps) => {
  /* The getLayout pattern is a way to preserve state in the layout
  across client side navigation. The downside is that since it's just an
  ordinary function, we can't use the preview subcscription hook out of the box.
  As a consequence, preview for the menu data is not available.

  If this is a problem, we need to see if we are able to find another solution  */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page

  const { data } = props

  const slugs = {
    en_GB: data?.pageData?.allSlugs?.en_GB,
    nb_NO: data?.pageData?.allSlugs?.nb_NO,
  }

  return (
    <Layout preview={false}>
      <Menu slugs={slugs} data={data?.menuData} />
      {page}
    </Layout>
  )
}
