'use client'
import { useLocale } from 'next-intl'
import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Blocks from '@/portableText/Blocks'
import { CookieDeclarationData } from '../../types/index'

type CookieDeclarationProps = {
  data: CookieDeclarationData
  anchor?: string
  className?: string
}

const CookieDeclaration = ({
  data,
  anchor,
  className = '',
}: CookieDeclarationProps) => {
  const title = data.title
  const placeholderRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const language = locale === 'nb_NO' ? 'nb' : locale ? locale : 'en'
  useEffect(() => {
    const script = document.createElement('script')
    script.setAttribute('id', 'CookieDeclaration')
    script.setAttribute(
      'src',
      'https://consent.cookiebot.com/f1327b03-7951-45da-a2fd-9181babc783f/cd.js',
    )
    script.setAttribute('async', 'true')
    script.setAttribute('data-culture', language)
    if (!placeholderRef.current?.hasChildNodes()) {
      placeholderRef.current?.appendChild(script)
    } else {
      if (placeholderRef.current) {
        placeholderRef.current.innerHTML = ''
        placeholderRef.current?.appendChild(script)
      }
    }
  }, [language])
  return (
    <section
      id={anchor}
      className={twMerge(`px-layout-sm md:px-layout-lg`, className)}
    >
      <div id='cookie-declaration-wrapper'>
        {title && <Blocks variant='h2' value={title} />}
        <div ref={placeholderRef}></div>
      </div>
    </section>
  )
}
export default CookieDeclaration
