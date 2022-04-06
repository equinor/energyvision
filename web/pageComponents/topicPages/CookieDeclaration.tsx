import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import styled from 'styled-components'

//COOKIEBOT
declare global {
  interface Window {
    CookieDeclaration: any
  }
}

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const CookieDeclaration = () => {
  const router = useRouter()
  useEffect(() => {
    window.CookieDeclaration.init()
    console.log('load')
  }, [])
  return (
    <>
      <Container>
        <script
          id="CookieDeclaration"
          src="https://consent.cookiebot.com/f1327b03-7951-45da-a2fd-9181babc783f/cd.js"
          type="text/javascript"
          data-culture={router.locale == 'no' ? 'nb' : router.locale}
          async
        ></script>
      </Container>
    </>
  )
}
export default CookieDeclaration
