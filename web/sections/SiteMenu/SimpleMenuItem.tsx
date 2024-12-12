import { Link, ResourceLink } from '@core/Link'
import type { SimpleGroupData } from '../../types/index'
import { Menu } from '@core/MenuAccordion'
import { useRouter } from 'next/router'
import { useId } from 'react'

const { MenuItem, MenuHeader, MenuContent } = Menu

type MenuGroupType = {
  item: SimpleGroupData
  index: number
}

export const SimpleMenuItem = ({ item, index }: MenuGroupType) => {
  const { type, label, links = [], readMoreLink } = item
  const router = useRouter()
  const id = useId()

  if (item?.type === 'simpleMenuLink' && item.link && !item.link.slug) {
    console.warn('Missing slug for simple menu link')
  }

  return (
    <>
      {type === 'simpleMenuLink' ? (
        <>
          <Link
            {...(item?.link &&
              item.link.slug === router.asPath && {
                'aria-current': 'page',
              })}
            className={`w-full
              border-b
              border-grey-40
              aria-current:bg-grey-10
              aria-current:px-2
              aria-current:-ml-2
              aria-current:font-semibold
              aria-current:border-l-[3px]
              aria-current:border-moss-green-95
              py-4
              hover:underline 
              underline-offset-2
              text-sm
              no-underline`}
            href={(item.link && item.link.slug) || '/'}
          >
            {item.label}
          </Link>
        </>
      ) : (
        <>
          <MenuItem value={`${index}`} variant="simple">
            {label && (
              <MenuHeader id={id} variant="simple">
                {label}
              </MenuHeader>
            )}
            <MenuContent variant="simple" className="">
              <div className="">
                {!!readMoreLink?.link?.slug && (
                  <ResourceLink href={readMoreLink.link?.slug} className="w-fit pt-0">
                    {readMoreLink.label}
                  </ResourceLink>
                )}
              </div>
              <ul
                aria-labelledby={id}
                className={`flex flex-col flex-wrap
                    ${
                      readMoreLink?.link?.slug
                        ? `mt-8 border-l 
                    border-dashed
                    border-slate-80
                    pl-4
                    pb-4`
                        : ''
                    }
                    `}
              >
                {links?.map((link: any) => (
                  <li className="" key={link.id}>
                    <Link
                      className={`aria-current:bg-grey-10
                          aria-current:px-2
                          aria-current:-ml-2
                          aria-current:border-l-[3px]
                          aria-current:border-moss-green-95
                          py-4
                          no-underline
                          hover:underline 
                          underline-offset-2
                          text-sm`}
                      /**
                     * flex 
                      aria-current:bg-grey-10
                      hover:bg-grey-10
                      m-0
                      no-underline
                      px-md
                      py-xs+sm
                      xl:ml-[calc(var(--space-medium)_*_(-1))]
                      aria-current:border-l-[3px]
                      aria-current:border-moss-green-95
                     */
                      href={link?.link?.slug || '/'}
                      aria-current={router?.asPath == link?.link?.slug ? 'page' : 'false'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </MenuContent>
          </MenuItem>
        </>
      )}
    </>
  )
}
