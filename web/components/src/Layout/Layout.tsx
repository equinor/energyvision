import { Footer } from '@components'

export type LayoutProps = {
  /* Prewiew or not */
  preview?: boolean
  // eslint-disable-next-line
  footerData?: any
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}
