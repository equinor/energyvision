/* We will most probably need something here. Used for /news
 */

import styled from 'styled-components'

/* Just some dummy styles */
const StyledMain = styled.main`
  max-width: 60rem;
  margin: var(--spacer-vertical-xxLarge) auto;
  min-height: 80vh;
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

      <footer>Footer</footer>
    </>
  )
}
