'use client'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import { GoChevronRight } from 'react-icons/go'
import type { SimpleGroupData } from '../../types/index'
import Link from '../Link/Link'
import ResourceLink from '../Link/ResourceLink'

type PaneMenuItemProps = {
  item: SimpleGroupData
  showSecondPane?: boolean
  onOpen?: (index: number) => void
  index: number
  linkCallback?: () => void
}

export const PaneMenuItem = forwardRef<HTMLLIElement, PaneMenuItemProps>(
  function PaneMenuItem(
    { item, showSecondPane, onOpen, index, linkCallback },
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
      onOpen?.(index)
    }

    useEffect(() => {
      if (firstPaneRef?.current) {
        setTranslateX(firstPaneRef.current.clientWidth.toString())
      }
    }, [])

    return (
      <li ref={ref} className='w-full'>
        <div ref={firstPaneRef} className='group flex w-full text-white-100'>
          {type === 'simpleMenuLink' ? (
            <Link
              className={`relative w-full ${ariaCurrentStyling}aria-current:before:bg-north-sea-50 text-lg no-underline underline-offset-2 hover:underline dark:hover:text-north-sea-50`}
              href={item.link?.slug || '/'}
              aria-current={pathname === item?.link?.slug ? 'page' : 'false'}
              {...(linkCallback && {
                onClick: linkCallback,
              })}
            >
              {item.label}
            </Link>
          ) : (
            <button
              type='button'
              onClick={() => {
                handleOpenClick()
              }}
              aria-controls={secondPaneId}
              aria-expanded={showSecondPane}
              className={`flex w-full border-b-2 ${showSecondPane ? 'border-north-sea-50' : 'border-transparent'}hover:border-north-sea-50`}
            >
              <span className='sr-only'>
                {showSecondPane ? t('close') : t('open')}
              </span>
              {label && (
                <div id={id} className='mr-12 flex grow justify-start text-lg'>
                  {label}
                </div>
              )}
              <GoChevronRight
                size={42}
                className={`${showSecondPane ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>
        {showSecondPane && (
          <ul
            id={secondPaneId}
            aria-labelledby={id}
            className={`absolute top-0 ml-14 flex h-full w-inherit min-w-[40vw] flex-col gap-6 border-white-100 border-l px-12`}
            style={{
              transform: `translate(${translateX}px)`,
            }}
          >
            {!!readMoreLink?.link?.slug && (
              <ResourceLink
                href={readMoreLink.link?.slug}
                className={`
              ${ariaCurrentStyling}w-fit pt-0 hover:text-north-sea-50`}
                aria-current={
                  pathname === readMoreLink?.link?.slug ? 'page' : 'false'
                }
                {...(linkCallback && {
                  onClick: linkCallback,
                })}
              >
                {readMoreLink.label}
              </ResourceLink>
            )}
            {links?.map((link: any) => (
              <li key={link.id} className='relative'>
                <Link
                  className={`${ariaCurrentStyling}no-underline decoration-2 underline-offset-2 hover:underline dark:hover:text-north-sea-50`}
                  href={link?.link?.slug || '/'}
                  aria-current={
                    pathname === link?.link?.slug ? 'page' : 'false'
                  }
                  {...(linkCallback && {
                    onClick: linkCallback,
                  })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  },
)
