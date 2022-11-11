import { AppProps } from 'next/app'
import { NextSeo } from 'next-seo'
import { useIntl, IntlProvider } from 'react-intl'
import type { GetStaticProps } from 'next/types'
import { defaultLanguage } from '../../languages'
import { getIsoFromLocale } from '../../lib/localization'
import getIntl from '../../common/helpers/getIntl'
import { Flags } from '../../common/helpers/datasetHelpers'

import { RemoveScroll } from 'react-remove-scroll'
import styled from 'styled-components'
import { Button } from '@components'
import { Icon } from '@equinor/eds-core-react'
import { close } from '@equinor/eds-icons'
import { TopbarDropdown } from '../../pageComponents/shared/siteMenu/TopbarDropdown'
import { NavTopbar } from '../../pageComponents/shared/siteMenu/NavTopbar'
import { LogoLink } from '../../pageComponents/shared/LogoLink'
import Search from '../../pageComponents/search/Search'
import { useRouter } from 'next/router'

const InvertedButton = styled(Button)`
  color: var(--white-100);
  &:hover {
    color: var(--slate-blue-95);
    background-color: var(--moss-green-60);
  }
  &:focus-visible,
  &[data-focus-visible-added]:focus {
    outline-color: var(--mist-blue-100);
  }
`

const DarkTopbarDropdown = styled(TopbarDropdown)`
  background-color: var(--slate-blue-95);
  color: var(--inverted-text);
`

const SearchContainer = styled.div`
  padding: var(--space-large);
  max-width: 700px;
  margin: 0 auto;
`

export default function SearchPage() {
  const router = useRouter()
  const intl = useIntl()

  const searchTitle = intl.formatMessage({ id: 'search', defaultMessage: 'Search' })

  return (
    <>
      <NextSeo title={searchTitle}></NextSeo>
      <RemoveScroll enabled={true}>
        <DarkTopbarDropdown isOpen={true}>
          <NavTopbar>
            <LogoLink inverted />
            <InvertedButton
              variant="ghost_icon"
              aria-expanded={true}
              aria-label="Close search"
              onClick={() => {
                router.back()
              }}
            >
              <Icon size={Flags.IS_DEV ? 24 : 32} data={close} />
            </InvertedButton>
          </NavTopbar>
          <SearchContainer>
            <Search />
          </SearchContainer>
        </DarkTopbarDropdown>
      </RemoveScroll>
    </>
  )
}

SearchPage.getLayout = (page: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data } = props
  const defaultLocale = defaultLanguage.locale
  const locale = data?.intl?.locale || defaultLocale

  return (
    <>
      {/* The intl provider doesn't seem to be necessary here, but I don't quite understand why so
      keeping it just to be sure:/ */}
      <IntlProvider
        locale={getIsoFromLocale(locale)}
        defaultLocale={getIsoFromLocale(defaultLocale)}
        messages={data?.intl?.messages}
      >
        <>{page}</>
      </IntlProvider>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false, locale = defaultLanguage.locale }) => {
  const intl = await getIntl(locale, false)

  return {
    props: {
      preview,
      data: {
        intl,
      },
    },
    revalidate: 120,
  }
}
