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
              relative
              aria-current:before:content-['']
              aria-current:before:absolute
              aria-current:before:top-0
              aria-current:before:-left-2
              aria-current:before:w-[2px]
              aria-current:before:h-full
              aria-current:before:bg-north-sea-50
              py-4
              px-2
              hover:underline
              dark:hover:text-north-sea-50
              underline-offset-2
              text-lg
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
              <MenuHeader
                id={id}
                variant="simple"
                aria-current={router?.asPath == readMoreLink?.link?.slug ? 'page' : 'false'}
              >
                {label}
              </MenuHeader>
            )}
            <MenuContent variant="simple" className="">
              <div className="">
                {!!readMoreLink?.link?.slug && (
                  <ResourceLink href={readMoreLink.link?.slug} className="w-fit pt-0 mb-10">
                    {readMoreLink.label}
                  </ResourceLink>
                )}
              </div>
              <ul aria-labelledby={id} className={`flex flex-col flex-wrap`}>
                {links?.map((link: any) => (
                  <li key={link.id}>
                    <Link
                      className={`
                        relative
                        aria-current:before:content-['']
                        aria-current:before:absolute
                        aria-current:before:top-0
                        aria-current:before:-left-2
                        aria-current:before:w-[2px]
                        aria-current:before:h-full
                        aria-current:before:bg-north-sea-50
                          py-4
                          no-underline
                          hover:underline 
                          dark:hover:text-north-sea-50
                          underline-offset-2
                          text-base`}
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
