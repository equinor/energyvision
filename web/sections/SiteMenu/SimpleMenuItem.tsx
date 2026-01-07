import { usePathname } from 'next/navigation'
import { useId } from 'react'
import { twMerge } from 'tailwind-merge'
import Link from '@/core/Link/Link'
import ResourceLink from '@/core/Link/ResourceLink'
import { Menu } from '@/core/MenuAccordion'
import type { SimpleGroupData } from '../../types/index'

const { MenuItem, MenuHeader, MenuContent } = Menu

type MenuGroupType = {
  item: SimpleGroupData
  index: number
  nextIsSimpleLink?: boolean
}

//CHECK PATHNAME versus router.asPath before
export const SimpleMenuItem = ({
  item,
  index,
  nextIsSimpleLink,
}: MenuGroupType) => {
  const { type, label, links = [], readMoreLink } = item
  const pathname = usePathname()
  const id = useId()

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

  return (
    <>
      {type === 'simpleMenuLink' ? (
        <Link
          {...(item?.link &&
            item.link.slug === pathname && {
              'aria-current': 'page',
            })}
          className={twMerge(
            `relative w-full px-2 py-3 text-lg no-underline underline-offset-2 hover:underline dark:hover:text-north-sea-50`,
            ariaCurrentStyling,
            `aria-current:before:-left-2`,
          )}
          href={item.link?.slug || '/'}
        >
          {item.label}
        </Link>
      ) : (
        <MenuItem value={`${index}`} variant='simple'>
          {label && (
            <MenuHeader
              id={id}
              variant='simple'
              className={`${nextIsSimpleLink ? 'max-xl:border-b' : ''}`}
            >
              {label}
            </MenuHeader>
          )}
          <MenuContent variant='simple' className=''>
            <div className=''>
              {!!readMoreLink?.link?.slug && (
                <ResourceLink
                  href={readMoreLink.link?.slug}
                  className={`mb-10 w-fit pt-0 ${ariaCurrentStyling}`}
                  aria-current={
                    pathname === readMoreLink?.link?.slug ? 'page' : 'false'
                  }
                >
                  {readMoreLink.label}
                </ResourceLink>
              )}
            </div>
            <ul aria-labelledby={id} className={`flex flex-col flex-wrap`}>
              {links?.map((link: any) => (
                <li key={link.id}>
                  <Link
                    className={`relative ${ariaCurrentStyling} py-4 text-base no-underline underline-offset-2 hover:underline dark:hover:text-north-sea-50`}
                    href={link?.link?.slug || '/'}
                    aria-current={
                      pathname === link?.link?.slug ? 'page' : 'false'
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </MenuContent>
        </MenuItem>
      )}
    </>
  )
}
