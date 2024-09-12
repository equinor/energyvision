import { HTMLAttributes } from 'react'
import Footer from './Footer'
import type { FooterColumns } from '../../types/types'
import { IntlProvider } from 'react-intl'
import { defaultLanguage } from '../../languages'
import { getIsoFromLocale } from '../../lib/localization'
import styled from 'styled-components'

const LayoutWrapper = styled.div<{ $useFullPage: boolean }>`
  ${({ $useFullPage }) =>
    $useFullPage && {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'calc(100vh - var(--topbar-height))',
    }}
`
const ChildrenWrapper = styled.div<{ $useFullPage: boolean }>`
  ${({ $useFullPage }) =>
    $useFullPage && {
      height: '100%',
    }}
`

export type LayoutProps = {
  // eslint-disable-next-line
  footerData?: { footerColumns: FooterColumns[] }
  intl?: {
    locale: string
    defaultLocale: string
    messages: Record<string, string>
  }
  useFullPage?: boolean
  children: React.ReactNode
} & HTMLAttributes<HTMLDivElement>

export const Layout = ({ useFullPage = false, children, footerData, intl, ...rest }: LayoutProps): JSX.Element => {
  const defaultLocale = defaultLanguage.locale
  const locale = intl?.locale || defaultLocale

  return (
    <IntlProvider
      locale={getIsoFromLocale(locale)}
      defaultLocale={getIsoFromLocale(defaultLocale)}
      messages={intl?.messages}
    >
      <LayoutWrapper $useFullPage={useFullPage} {...rest}>
        <ChildrenWrapper $useFullPage>{children}</ChildrenWrapper>
        <Footer footerData={footerData} />
      </LayoutWrapper>
    </IntlProvider>
  )
}
