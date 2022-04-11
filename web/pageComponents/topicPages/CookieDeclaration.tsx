import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styled from 'styled-components'
import { BackgroundContainer } from '@components'
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
  overflow-x: auto;
`

const CookieDeclaration = () => {
  const router = useRouter()
  const language = router.locale == 'no' ? 'nb' : router.locale
  useEffect(() => {
    if (window.CookieDeclaration != undefined && document.getElementsByClassName('CookieDeclaration') == undefined) {
      window.CookieDeclaration.init()
    } else {
      const script = document.createElement('script')
      script.setAttribute('id', 'CookieDeclaration')
      script.setAttribute('src', 'https://consent.cookiebot.com/f1327b03-7951-45da-a2fd-9181babc783f/cd.js')
      script.setAttribute('type', 'text/javascript')
      if (language) {
        script.setAttribute('data-culture', language)
      }
      script.onload = () => {
        window.CookieDeclaration.init()
      }
      const cookieDeclarationWrapper = document.querySelector('cookie-declaration-wrapper')
      cookieDeclarationWrapper?.appendChild(script)
    }
  }, [router.asPath, language])
  return (
    <BackgroundContainer background="White">
      <Container id="cookie-declaration-wrapper">
        {
          <script
            id="CookieDeclaration"
            src="https://consent.cookiebot.com/f1327b03-7951-45da-a2fd-9181babc783f/cd.js"
            type="text/javascript"
            data-culture={router.locale == 'no' ? 'nb' : router.locale}
            async
          ></script>
        }
      </Container>
    </BackgroundContainer>
  )
}
export default CookieDeclaration
