import Footer from '../../../pageComponents/shared/Footer'

export type LayoutProps = {
  /* Prewiew or not */
  preview?: boolean
  // eslint-disable-next-line
  footerData?: any
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
