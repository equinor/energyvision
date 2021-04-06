/* We will most probably need something here. Used for /news
 */

import styled from 'styled-components'

/* Just some dummy styles */
const StyledMain = styled.main`
  min-height: 80vh;
  width: 100%;
`

const Footer = styled.footer`
  background-color: var(--slate-blue-95);
  min-height: var(--spacing-xxLarge);
`

export type LayoutProps = {
  /* Prewiew or not */
  preview?: boolean
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <StyledMain>{children}</StyledMain>

      <Footer></Footer>
    </>
  )
}
