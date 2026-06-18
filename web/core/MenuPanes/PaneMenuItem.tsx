'use client'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import { GoChevronRight } from 'react-icons/go'
import { getMenuLink } from '@/lib/helpers/getUrlFromAction'
import { twMerge } from '@/lib/twMerge/twMerge'
import type { SimpleGroupData } from '../../types/index'
import Link from '../Link/Link'
import ResourceLink from '../Link/ResourceLink'

type PaneMenuItemProps = {
  item: SimpleGroupData
  showSecondPane?: boolean
  onOpen?: (index: number) => void
  index: number
  linkCallback?: () => void
  ulWidth?: number
}

export const PaneMenuItem = forwardRef<HTMLLIElement, PaneMenuItemProps>(
  function PaneMenuItem(
    { item, showSecondPane, onOpen, index, linkCallback, ulWidth = 0 },
    ref,
  ) {
    const { type, label, links = [], readMoreLink } = item
    const pathname = usePathname()
    const iso = useLocale()
    const id = useId()
    const secondPaneId = useId()
    const firstPaneRef = useRef<HTMLDivElement>(null)
    const secondPaneRef = useRef<HTMLUListElement>(null)
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
        const totalTranslateX = ulWidth
        setTranslateX(totalTranslateX.toString())
      }
    }, [ulWidth])

    return (
      <li ref={ref} className='w-full'>
        <div ref={firstPaneRef} className='group flex w-full text-white-100'>
          {type === 'simpleMenuLink' ? (
            <Link
              className={twMerge(
                `relative w-full ${ariaCurrentStyling} text-lg no-underline underline-offset-2 hover:underline aria-current:before:bg-north-sea-50 dark:hover:text-north-sea-50`,
              )}
              href={getMenuLink(item, iso)}
              {...(pathname === item?.link?.slug && {
                'aria-current': 'page',
              })}
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
              className={twMerge(
                `focus-visible:envis-outline dark:focus-visible:envis-outline-invert flex w-full border-b-2 hover:border-north-sea-50 focus:outline-hidden dark:focus:outline-hidden`,
                showSecondPane ? 'border-north-sea-50' : 'border-transparent',
              )}
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
        <ul
          ref={secondPaneRef}
          id={secondPaneId}
          aria-labelledby={id}
          className={`absolute top-0 flex w-inherit min-w-[40vw] flex-col gap-6 px-12 last:pb-12 ${showSecondPane ? 'visible' : 'invisible'}`}
          style={{
            transform: `translate(${translateX}px)`,
          }}
        >
          {!!readMoreLink?.link?.slug && (
            <li>
              <ResourceLink
                href={getMenuLink(readMoreLink, iso)}
                className={`**:transition-none ${ariaCurrentStyling} w-fit pt-0 hover:text-north-sea-50`}
                {...(pathname === readMoreLink?.link?.slug && {
                  'aria-current': 'page',
                })}
                {...(linkCallback && {
                  onClick: linkCallback,
                })}
              >
                {readMoreLink.label}
              </ResourceLink>
            </li>
          )}
          {links?.map((link: any) => (
            <li key={link.id} className='relative'>
              <Link
                className={`h-full ${ariaCurrentStyling} no-underline decoration-2 underline-offset-2 hover:underline dark:hover:text-north-sea-50`}
                href={getMenuLink(link, iso)}
                {...(pathname === link?.link?.slug && {
                  'aria-current': 'page',
                })}
                {...(linkCallback && {
                  onClick: linkCallback,
                })}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    )
  },
)
