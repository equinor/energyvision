'use client'
import { useEffect, useRef } from 'react'
import { CookieDeclarationData } from '../../types/index'
import { useLocale } from 'next-intl'
import Blocks from '@/portableText/Blocks'

type CookieDeclarationProps = {
  data: CookieDeclarationData
  anchor?: string
  className?: string
}

const CookieDeclaration = ({ data, anchor, className = '' }: CookieDeclarationProps) => {
  const title = data.title
  const placeholderRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const language = locale == 'no' ? 'nb' : locale ? locale : 'en'
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
    <section id={anchor} className={className}>
      <div id="cookie-declaration-wrapper">
        {title && <Blocks variant="h2" value={title} />}
        <div ref={placeholderRef}></div>
      </div>
    </section>
  )
}
export default CookieDeclaration
