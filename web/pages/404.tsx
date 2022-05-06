import { GetStaticProps } from 'next'
import styled from 'styled-components'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { SkipNavContent } from '@reach/skip-nav'
import dynamic from 'next/dynamic'
import getPageSlugs from '../common/helpers/getPageSlugs'
import { pageNotFoundQuery } from '../lib/queries/pageNotFound'
import { getNameFromLocale, getIsoFromLocale } from '../lib/localization'
import getIntl from '../common/helpers/getIntl'
import { defaultLanguage } from '../languages'
import { ErrorPageData, MenuData, FooterColumns, IntlData } from '../types/types'
import { getComponentsData } from '../lib/fetchData'
import Header from '../pageComponents/shared/Header'
import Footer from '../pageComponents/shared/Footer'

const ErrorPage = dynamic(() => import('../pageComponents/pageTemplates/ErrorPage'))

const Grid = styled.div`
  display: grid;
  height: calc(100vh - var(--topbar-height));
  grid-template-rows: min-content 0 1fr min-content;
`

type Custom404Props = {
  pageData: ErrorPageData
  menuData: MenuData
  footerData: FooterColumns
  intl: IntlData
}

const Custom404 = ({ data }: { data: Custom404Props }) => {
  const { pageData } = data

  return <ErrorPage pageData={pageData} />
}

Custom404.getLayout = (page: AppProps) => {
  /* The getLayout pattern is a way to preserve state in the layout
  across client side navigation. The downside is that since it's just an
  ordinary function, we can't use the preview subcscription hook out of the box.
  As a consequence, preview for the menu data is not available.

  If this is a problem, we need to see if we are able to find another solution  */
  // Making a random comment to trigger a new build
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data } = props
  const slugs = getPageSlugs(data)
  const defaultLocale = defaultLanguage.locale
  const locale = data?.intl?.locale || defaultLocale

  return (
    <>
      <IntlProvider
        locale={getIsoFromLocale(locale)}
        defaultLocale={getIsoFromLocale(defaultLocale)}
        messages={data?.intl?.messages}
      >
        <Grid>
          <Header slugs={slugs} menuData={data?.menuData} />
          <SkipNavContent />
          {page}
          <Footer footerData={data?.footerData} />
        </Grid>
      </IntlProvider>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = defaultLanguage.locale }) => {
  const lang = getNameFromLocale(locale)
  const intl = await getIntl(locale, false)

  const queryParams = {
    lang,
  }

  const { menuData, pageData, footerData } = await getComponentsData({
    query: pageNotFoundQuery,
    queryParams,
  })

  return {
    props: {
      data: {
        menuData,
        footerData,
        intl,
        pageData,
      },
    },
    revalidate: 1,
  }
}

export default Custom404
