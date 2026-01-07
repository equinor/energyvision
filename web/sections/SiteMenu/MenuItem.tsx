import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import Link from '@/core/Link/Link'
import ResourceLink from '@/core/Link/ResourceLink'
import { Menu } from '@/core/MenuAccordion'
import { Typography } from '@/core/Typography'
import Blocks from '../../portableText/Blocks'
import type {
  MenuLinkData,
  SubMenuData,
  SubMenuGroupData,
} from '../../types/index'
import FeaturedContent from './FeaturedContent'

const { MenuItem: _MenuItem, MenuHeader, MenuContent } = Menu

function getLink(linkData: MenuLinkData) {
  // Fallback to home page, if this happens it is an error somewhere
  // Sanity should take care of the validation here, and this is temp. until
  // the static pages are migrated
  if (!linkData) return 'something-wrong'
  const { link } = linkData

  return link?.slug || '/'
}

type MenuGroupType = {
  item: SubMenuData
  index: number
}

export const MenuItem = ({ item, index }: MenuGroupType) => {
  const {
    topLevelLink,
    groups,
    intro,
    featuredContent,
    featuredCTALabel,
    featuredIngress,
  } = item

  const menuItemHref = getLink(topLevelLink)

  const pathname = usePathname()

  const ariaCurrentStyling = `aria-current:before:content-['']
  aria-current:before:absolute
  aria-current:before:top-0
  aria-current:before:-left-4
  aria-current:before:w-[2px]
  aria-current:before:h-full
  aria-current:before:bg-moss-green-95`

  return (
    <_MenuItem value={`${index}`}>
      <MenuHeader>{topLevelLink?.label}</MenuHeader>
      <MenuContent className=''>
        <div className='px-4 max-xl:py-4 xl:mx-auto xl:px-layout-sm'>
          <div className='flex w-full flex-col gap-2 pb-6'>
            {intro && <Blocks value={intro} />}
            <ResourceLink
              href={menuItemHref}
              className={`relative w-fit ${ariaCurrentStyling}`}
              aria-current={
                pathname === topLevelLink?.link?.slug ? 'page' : 'false'
              }
            >
              {topLevelLink?.label}
            </ResourceLink>
          </div>
          <div className='grow py-4 xl:py-10'>
            {groups && groups.length > 0 && (
              <div className='flex flex-col xl:grid xl:grid-flow-col xl:grid-rows-[min-content_min-content] xl:gap-x-20 xl:gap-y-2'>
                {groups.map((groupItem: SubMenuGroupData) => {
                  return (
                    <Fragment key={groupItem.id}>
                      {groupItem.label && (
                        <Typography
                          as='h3'
                          variant='h5'
                          className={`font-semibolder text-moss-green-95 text-xs uppercase leading-earthy max-xl:pb-2 xl:font-semibold xl:text-xs`}
                        >
                          {groupItem.label}
                        </Typography>
                      )}
                      <ul
                        className='flex flex-col max-xl:pb-6 xl:h-full xl:flex-wrap'
                        aria-label={groupItem.label || topLevelLink?.label}
                      >
                        {groupItem.links?.map((link: MenuLinkData) => (
                          <li key={link.id}>
                            <Link
                              className={`relative py-2 text-sm no-underline underline-offset-2 hover:underline ${ariaCurrentStyling} `}
                              href={getLink(link)}
                              aria-current={
                                pathname === link?.link?.slug ? 'page' : 'false'
                              }
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Fragment>
                  )
                })}
              </div>
            )}
          </div>
        </div>
        <div className='px-4 pt-4 pb-12 xl:mx-auto xl:px-layout-sm xl:pt-6'>
          {featuredContent && (
            <FeaturedContent
              featuredContent={featuredContent}
              featuredIngress={featuredIngress}
              featuredCTALabel={featuredCTALabel}
            />
          )}
        </div>
      </MenuContent>
    </_MenuItem>
  )
}
