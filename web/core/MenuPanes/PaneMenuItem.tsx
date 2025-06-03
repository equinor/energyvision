import { Link, ResourceLink } from '@core/Link'
import type { SimpleGroupData } from '../../types/index'
import { usePathname } from 'next/navigation'
import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import { GoChevronRight } from 'react-icons/go'
import { useTranslations } from 'next-intl'

type PaneMenuItemProps = {
  item: SimpleGroupData
  showSecondPane?: boolean
  onOpen?: (index: number) => void
  index: number
}

export const PaneMenuItem = forwardRef<HTMLLIElement, PaneMenuItemProps>(function PaneMenuItem(
  { item, showSecondPane, onOpen, index },
  ref,
) {
  const { type, label, links = [], readMoreLink } = item
  const pathname = usePathname()
  const id = useId()
  const secondPaneId = useId()
  const firstPaneRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState('100%')
  const t = useTranslations()

  if (item?.type === 'simpleMenuLink' && item.link && !item.link.slug) {
    console.warn('Missing slug for simple menu link')
  }

  const ariaCurrentStyling = `aria-current:before:content-['']
  aria-current:before:absolute
  aria-current:before:top-0
  aria-current:before:-left-4
  aria-current:before:w-[2px]
  aria-current:before:h-full
  aria-current:before:bg-north-sea-50`

  const handleOpenClick = () => {
    onOpen && onOpen(index)
  }

  useEffect(() => {
    if (firstPaneRef?.current) {
      setTranslateX(firstPaneRef.current.clientWidth.toString())
    }
  }, [firstPaneRef])

  return (
    <li ref={ref} className="w-full">
      <div ref={firstPaneRef} className="group flex text-white-100 w-full">
        {type === 'simpleMenuLink' ? (
          <Link
            className={`w-full
              relative
              ${ariaCurrentStyling}
              aria-current:before:bg-north-sea-50
              hover:underline
              dark:hover:text-north-sea-50
              underline-offset-2
              text-lg
              no-underline`}
            href={(item.link && item.link.slug) || '/'}
            aria-current={pathname == item?.link?.slug ? 'page' : 'false'}
          >
            {item.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              handleOpenClick()
            }}
            aria-controls={secondPaneId}
            aria-expanded={showSecondPane}
            className={`w-full
            flex
            border-b-2
            ${showSecondPane ? 'border-north-sea-50' : ' border-transparent'}
            hover:border-north-sea-50
          `}
          >
            <span className="sr-only">{showSecondPane ? t('close') : t('open')}</span>
            {label && (
              <div id={id} className="grow text-lg flex justify-start mr-12">
                {label}
              </div>
            )}
            <GoChevronRight size={42} className={`${showSecondPane ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
      {showSecondPane && (
        <ul
          id={secondPaneId}
          aria-labelledby={id}
          className={`
            absolute
            top-0
            w-inherit
            h-full
            border-l-[1px]
            border-white-100
            px-12
            ml-14
            min-w-[40vw]
            flex 
            flex-col
            gap-6`}
          style={{
            transform: `translate(${translateX}px)`,
          }}
        >
          {!!readMoreLink?.link?.slug && (
            <ResourceLink
              href={readMoreLink.link?.slug}
              className={`
              ${ariaCurrentStyling}
              w-fit 
              pt-0 
              hover:text-north-sea-50`}
              aria-current={pathname == readMoreLink?.link?.slug ? 'page' : 'false'}
            >
              {readMoreLink.label}
            </ResourceLink>
          )}
          {links?.map((link: any) => (
            <li key={link.id} className="relative">
              <Link
                className={`${ariaCurrentStyling}
                  no-underline
                  hover:underline 
                  underline-offset-2
                  decoration-2
                  dark:hover:text-north-sea-50`}
                href={link?.link?.slug || '/'}
                aria-current={pathname == link?.link?.slug ? 'page' : 'false'}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
})
