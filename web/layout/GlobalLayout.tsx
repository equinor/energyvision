import { HTMLAttributes } from 'react'
import type { FooterColumns, MenuData, SimpleMenuData } from '../types/types'
import Footer from './Footer'
import Header from './Header'

export type LayoutProps = {
  footerData?: { footerColumns: FooterColumns[] }
  menuData?: MenuData | SimpleMenuData | undefined
  children: React.ReactNode
} & HTMLAttributes<HTMLDivElement>

export const Layout = ({ children, footerData, menuData, ...rest }: LayoutProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-between" {...rest}>
      <Header slugs={slugs} menuData={menuData} />
      <main className="min-h-[calc(100vh-var(--topbar-height))]">{children}</main>
      <Footer footerData={footerData} />
    </div>
  )
}
