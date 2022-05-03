import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { BackgroundContainer } from '@components'

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
  overflow-x: auto;
`

const CookieDeclaration = () => {
  const router = useRouter()
  const placeholderRef = useRef<HTMLDivElement>(null)
  const language = router.locale == 'no' ? 'nb' : router.locale ? router.locale : 'en'
  useEffect(() => {
    if (!placeholderRef.current?.hasChildNodes()) {
      const script = document.createElement('script')
      script.setAttribute('id', 'CookieDeclaration')
      script.setAttribute('src', 'https://consent.cookiebot.com/f1327b03-7951-45da-a2fd-9181babc783f/cd.js')
      script.setAttribute('async', 'true')
      script.setAttribute('data-culture', language)
      placeholderRef.current?.appendChild(script)
    }
  }, [language])
  return (
    <BackgroundContainer background="White">
      <Container id="cookie-declaration-wrapper" ref={placeholderRef}></Container>
    </BackgroundContainer>
  )
}
export default CookieDeclaration
