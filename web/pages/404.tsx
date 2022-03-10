import { GetStaticProps } from 'next'

import type { AppProps } from 'next/app'
import { Layout } from '../pageComponents/shared/Layout'
import Header from '../pageComponents/shared/Header'
import getPageSlugs from '../common/helpers/getPageSlugs'
import { isGlobal } from '../common/helpers/datasetHelpers'
import { menuQuery as globalMenuQuery } from '../lib/queries/menu'
import { footerQuery } from '../lib/queries/footer'
import { simpleMenuQuery } from '../lib/queries/simpleMenu'
import { getClient } from '../lib/sanity.server'
import { getNameFromLocale } from '../lib/localization'
import getIntl from '../common/helpers/getIntl'
import { defaultLanguage } from '../languages'
import styled from 'styled-components'

const TextContainer = styled.div`
  padding: 0 var(--layout-paddingHorizontal-medium);
`

const Custom404 = () => {
  return (
    <TextContainer>
      <h1>
        404 <br />
        You have wandered into unknown territory
      </h1>
      <h2>We love the curiosity!</h2>
      <p>Hopefully our new menu can help navigate you back to the right path</p>
    </TextContainer>
  )
}

Custom404.getLayout = (page: AppProps) => {
  /* The getLayout pattern is a way to preserve state in the layout
  across client side navigation. The downside is that since it's just an
  ordinary function, we can't use the preview subcscription hook out of the box.
  As a consequence, preview for the menu data is not available.

  If this is a problem, we need to see if we are able to find another solution  */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data, preview } = props
  const slugs = getPageSlugs(data)

  return (
    <>
      <Layout footerData={data?.footerData} intl={data?.intl} preview={preview} useFullPage>
        <Header slugs={slugs} menuData={data?.menuData} />
        <div>{page}</div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = defaultLanguage.locale }) => {
  const lang = getNameFromLocale(locale)
  const menuQuery = isGlobal ? globalMenuQuery : simpleMenuQuery
  const menuData = await getClient(false).fetch(menuQuery, { lang: lang })
  const footerData = await getClient(false).fetch(footerQuery, { lang: lang })
  const intl = await getIntl(locale, false)

  return {
    props: {
      data: {
        menuData,
        footerData,
        intl,
      },
    },
  }
}

export default Custom404
