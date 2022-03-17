import { GetStaticProps } from 'next'
import styled from 'styled-components'
import type { AppProps } from 'next/app'
import { toPlainText } from '@portabletext/react'
import Img from 'next/image'
import { IntlProvider } from 'react-intl'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClient, getClient } from '../lib/sanity.server'
import Footer from '../pageComponents/shared/Footer'
import { Heading } from '@components'
import Header from '../pageComponents/shared/Header'
import getPageSlugs from '../common/helpers/getPageSlugs'
import { NextSeo } from 'next-seo'
import { isGlobal } from '../common/helpers/datasetHelpers'
import { menuQuery as globalMenuQuery } from '../lib/queries/menu'
import { footerQuery } from '../lib/queries/footer'
import { simpleMenuQuery } from '../lib/queries/simpleMenu'
import { pageNotFoundQuery } from '../lib/queries/pageNotFound'
import { getNameFromLocale, getIsoFromLocale } from '../lib/localization'
import getIntl from '../common/helpers/getIntl'
import { defaultLanguage } from '../languages'
import SimpleBlockContent from '../common/portableText/SimpleBlockContent'

const TextWrapper = styled.div`
  position: relative;
  padding: 4rem var(--layout-paddingHorizontal-medium) var(--space-xLarge) var(--layout-paddingHorizontal-medium);
`
const TextContainer = styled.div``

const MegaText = styled.span`
  font-size: 5rem;
  display: block;
  color: var(--slate-blue-100);
  opacity: 0.4;
`
const StyledHeading = styled(Heading)`
  margin-bottom: var(--space-xLarge);
`

const BodyContainer = styled.div`
  position: relative;
`

const Custom404 = ({ data }: any) => {
  const { pageData } = data

  const { title = '', text = '', backgroundImage = null } = pageData
  const imageProps = useNextSanityImage(sanityClient, backgroundImage)
  // @TODO Temp. hack to be able to commit
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const src = imageProps?.src
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const loader = imageProps?.loader
  return (
    <>
      <NextSeo title={pageData?.documentTitle} description={pageData?.metaDescription}></NextSeo>
      <BodyContainer>
        {/*    <BackgroundWrap> */}
        {imageProps && src && <Img src={src} loader={loader} layout="fill" objectFit="cover" />}
        {/*     </BackgroundWrap> */}
        <TextWrapper>
          <StyledHeading level="h1" size="2xl">
            <MegaText>404</MegaText>
            {title && <span>{toPlainText(title)}</span>}
          </StyledHeading>
          {text && (
            <TextContainer>
              <SimpleBlockContent value={text} />
            </TextContainer>
          )}
        </TextWrapper>
      </BodyContainer>
    </>
  )
}

const Grid = styled.div`
  display: grid;
  height: calc(100vh - var(--topbar-height));
  grid-template-rows: min-content 1fr min-content;
`

Custom404.getLayout = (page: AppProps) => {
  /* The getLayout pattern is a way to preserve state in the layout
  across client side navigation. The downside is that since it's just an
  ordinary function, we can't use the preview subcscription hook out of the box.
  As a consequence, preview for the menu data is not available.

  If this is a problem, we need to see if we are able to find another solution  */

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
          {page}
          <Footer footerData={data?.footerData} />
        </Grid>
      </IntlProvider>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = defaultLanguage.locale }) => {
  const lang = getNameFromLocale(locale)
  const queryParams = {
    lang,
  }
  // Let save preview for a later stage
  const pageData = await getClient(false).fetch(pageNotFoundQuery, queryParams)
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
        pageData: pageData || {},
      },
    },
    revalidate: 1,
  }
}

export default Custom404
