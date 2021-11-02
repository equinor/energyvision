import Footer from './Footer'
import type { FooterColumns } from '../../types/types'

export type LayoutProps = {
  /* Prewiew or not */
  preview?: boolean
  // eslint-disable-next-line
  footerData?: { footerColumns: FooterColumns[] }
  children: React.ReactNode
}

export const Layout = ({ children, footerData }: LayoutProps): JSX.Element => {
  return (
    <div>
      {children}
      <Footer footerData={footerData} />
    </div>
  )
}
