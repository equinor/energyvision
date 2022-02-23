import Footer from './Footer'
import type { FooterColumns } from '../../types/types'
import { IntlProvider } from 'react-intl'
import { defaultLanguage } from '../../lib/localization'
import { getIsoFromLocale } from '../../lib/localization'

export type LayoutProps = {
  /* Prewiew or not */
  preview?: boolean
  // eslint-disable-next-line
  footerData?: { footerColumns: FooterColumns[] }
  intl?: {
    locale: string
    defaultLocale: string
    messages: Record<string, string>
  }
  children: React.ReactNode
}

export const Layout = ({ children, footerData, intl }: LayoutProps): JSX.Element => {
  const defaultLocale = defaultLanguage.locale
  const locale = intl?.locale || defaultLocale

  return (
    <IntlProvider
      locale={getIsoFromLocale(locale)}
      defaultLocale={getIsoFromLocale(defaultLocale)}
      messages={intl?.messages}
    >
      <div>
        {children}
        <Footer footerData={footerData} />
      </div>
    </IntlProvider>
  )
}
