import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { BackgroundContainer } from '@components'
import TitleText from '../../pageComponents/shared/portableText/TitleText'
import { CookieDeclarationData } from '../../types/types'
import { twMerge } from 'tailwind-merge'

type CookieDeclarationProps = {
  data: CookieDeclarationData
  anchor?: string
  className?: string
}

const StyledTitle = styled(TitleText)`
  margin-bottom: var(--space-xLarge);
`
const CookieDeclaration = ({ data, anchor, className }: CookieDeclarationProps) => {
  const title = data.title
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
    <BackgroundContainer background={{ backgroundColor: 'White' }} id={anchor}>
      <div
        id="cookie-declaration-wrapper"
        className={twMerge(`pb-page-content px-layout-lg max-w-viewport mx-auto`, className)}
      >
        {title && <StyledTitle value={title} />}
        <div ref={placeholderRef}></div>
      </div>
    </BackgroundContainer>
  )
}
export default CookieDeclaration
