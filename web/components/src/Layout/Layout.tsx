import { Footer } from '@components'

/*
const Footer = styled.footer`
  background-color: var(--slate-blue-95);
  min-height: var(--space-4xLarge);
  
  clear: both;
` 
*/
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
