import { HTMLAttributes } from 'react'
import Footer from '../Footer/Footer'
import type { FooterColumns } from '../../types/index'
import { IntlProvider } from 'react-intl'
import { defaultLanguage } from '../../languages'
import { getIsoFromLocale } from '../../lib/localization'
import envisTwMerge from '../../twMerge'

export type LayoutProps = {
  // eslint-disable-next-line
  footerData?: { footerColumns: FooterColumns[] }
  intl?: {
    locale: string
    defaultLocale: string
    messages: Record<string, string>
  }
  children: React.ReactNode
} & HTMLAttributes<HTMLDivElement>

export const Layout = ({ children, footerData, intl, className = '', ...rest }: LayoutProps): JSX.Element => {
  const defaultLocale = defaultLanguage.locale
  const locale = intl?.locale || defaultLocale

  return (
    <IntlProvider
      locale={getIsoFromLocale(locale)}
      defaultLocale={getIsoFromLocale(defaultLocale)}
      messages={intl?.messages}
    >
      <div className={envisTwMerge(``, className)} {...rest}>
        {children}
        <Footer footerData={footerData} />
      </div>
    </IntlProvider>
  )
}
