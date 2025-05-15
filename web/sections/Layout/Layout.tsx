import { HTMLAttributes } from 'react'
import Footer from '../Footer/Footer'
import type { FooterColumns } from '../../types/index'
//import { IntlProvider } from 'react-intl'
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
  hasSticky?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Layout = ({
  hasSticky = false,
  children,
  footerData,
  intl,
  className = '',
  ...rest
}: LayoutProps): JSX.Element => {
  const defaultLocale = defaultLanguage.locale
  const locale = intl?.locale || defaultLocale

  return (
    <div className={envisTwMerge(`${hasSticky ? '' : 'pt-topbar'}`, className)} {...rest}>
      {children}
      <Footer footerData={footerData} />
    </div>
  )
}
