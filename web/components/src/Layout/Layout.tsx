import { Footer } from '@components'

/* Because the static AEM content have several float: left styles added to the wrapper containers  */
export type LayoutProps = {
  /* Prewiew or not */
  preview?: boolean
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      {children}
      <Footer></Footer>
    </div>
  )
}
