import { HTMLAttributes } from 'react'
import Footer from '../Footer/Footer'
import type { FooterColumns } from '../../types/index'
import envisTwMerge from '../../twMerge'

export type LayoutProps = {
  // eslint-disable-next-line
  footerData?: { footerColumns: FooterColumns[] }
  children: React.ReactNode
  hasSticky?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Layout = ({
  hasSticky = false,
  children,
  footerData,
  className = '',
  ...rest
}: LayoutProps): JSX.Element => {
  return (
    <div className={envisTwMerge(`${hasSticky ? '' : 'pt-topbar'}`, className)} {...rest}>
      {children}
      <Footer footerData={footerData} />
    </div>
  )
}
