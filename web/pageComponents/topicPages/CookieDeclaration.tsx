'use client'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { BackgroundContainer } from '@core/Backgrounds'
import { Heading } from '@core/Typography'
import { CookieDeclarationData } from '../../types/index'

type CookieDeclarationProps = {
  data: CookieDeclarationData
  anchor?: string
  className?: string
}

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
    <BackgroundContainer id={anchor} className={className}>
      <div id="cookie-declaration-wrapper">
        {title && <Heading value={title} />}
        <div ref={placeholderRef}></div>
      </div>
    </BackgroundContainer>
  )
}
export default CookieDeclaration
