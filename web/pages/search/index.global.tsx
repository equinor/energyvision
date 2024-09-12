import { AppProps } from 'next/app'
import { NextSeo } from 'next-seo'
import { useIntl, IntlProvider } from 'react-intl'
import type { GetStaticProps } from 'next/types'
import { defaultLanguage } from '../../languages'
import { getIsoFromLocale } from '../../lib/localization'
import getIntl from '../../common/helpers/getIntl'
import { Icon } from '@equinor/eds-core-react'
import { close } from '@equinor/eds-icons'
import { TopbarDropdown } from '../../pageComponents/shared/siteMenu/TopbarDropdown'
import { NavTopbar } from '../../pageComponents/shared/siteMenu/NavTopbar'
import { LogoLink } from '../../pageComponents/shared/LogoLink'
import Search from '../../pageComponents/search/Search'
import { useRouter } from 'next/router'
import { FloatingOverlay } from '@floating-ui/react'

export default function SearchPage() {
  const router = useRouter()
  const intl = useIntl()

  const searchTitle = intl.formatMessage({ id: 'search', defaultMessage: 'Search' })

  return (
    <>
      <NextSeo title={searchTitle}></NextSeo>
      <FloatingOverlay lockScroll>
        <TopbarDropdown background={{ backgroundColor: 'Slate Blue 95' }}>
          <NavTopbar>
            <LogoLink />
            <button
              type="button"
              aria-expanded={true}
              aria-label="Close search"
              onClick={() => {
                router.back()
              }}
              className={`
                p-3
                rounded-full 
                text-white-100
                hover:bg-moss-green-50
                hover:text-slate-blue-95
                focus:outline-none
                focus-visible:envis-outline-invert
                active:scale-99
                active:bg-white-100/20
                `}
            >
              <Icon size={24} data={close} />
            </button>
          </NavTopbar>
          <div className="p-8 max-w-[700px] mx-auto">
            <Search />
          </div>
        </TopbarDropdown>
      </FloatingOverlay>
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
