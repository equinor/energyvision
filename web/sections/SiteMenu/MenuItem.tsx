import { Fragment } from 'react'
import { Link, ReadMoreLink } from '@core/Link'
import { Menu } from '@core/MenuAccordion'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../types/index'
import FeaturedContent from './FeaturedContent'
import { useRouter } from 'next/router'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { Typography } from '@core/Typography'

const { MenuItem: _MenuItem, MenuHeader, MenuContent } = Menu

function getLink(linkData: MenuLinkData) {
  // Fallback to home page, if this happens it is an error somewhere
  // Sanity should take care of the validation here, and this is temp. until
  // the static pages are migrated
  if (!linkData) return 'something-wrong'
  const { link } = linkData

  return (link && link.slug) || '/'
}

type MenuGroupType = {
  item: SubMenuData
  index: number
}

export const MenuItem = ({ item, index }: MenuGroupType) => {
  const { topLevelLink, groups, intro, featuredContent } = item

  const menuItemHref = getLink(topLevelLink)
  const router = useRouter()

  return (
    <_MenuItem value={`${index}`}>
      <MenuHeader>{topLevelLink?.label}</MenuHeader>
      <MenuContent className="">
        <div className="max-xl:mt-8 px-4 xl:px-layout-md xl:mx-auto">
          <div className="w-full flex flex-col gap-2 pb-6">
            {intro && <Blocks value={intro} />}
            <ReadMoreLink href={menuItemHref}>{topLevelLink?.label}</ReadMoreLink>
          </div>
          <div className="flex-grow py-4 xl:py-10 border-y border-grey-30">
            {groups && groups.length > 0 && (
              <div
                className="flex
                flex-col
                xl:grid
                xl:grid-cols-[repeat(auto-fill,_minmax(8em,1fr)))]
                xl:grid-rows-[min-content_min-content] 
                xl:gap-y-2 
                xl:gap-x-20 
                xl:grid-flow-col"
              >
                {groups.map((groupItem: SubMenuGroupData) => {
                  return (
                    <Fragment key={groupItem.id}>
                      {groupItem.label && (
                        <Typography
                          as="h3"
                          variant="h5"
                          className={`uppercase
                            max-xl:pb-2
                            text-moss-green-95
                            font-semibolder
                            text-sm
                            leading-earthy 
                            xl:font-semibold
                            xl:text-xs
                        `}
                        >
                          {groupItem.label}
                        </Typography>
                      )}
                      <ul
                        className="flex flex-col xl:flex-wrap xl:h-full max-xl:pb-6"
                        aria-label={groupItem.label || topLevelLink?.label}
                      >
                        {groupItem.links?.map((link: MenuLinkData) => (
                          <li key={link.id}>
                            <Link
                              className={` 
                                aria-current:bg-grey-10
                                aria-current:px-2
                                aria-current:-ml-2
                                py-2
                                hover:underline 
                                underline-offset-2
                                text-sm
                                no-underline
                                aria-current:border-l-[3px]
                                aria-current:border-moss-green-95`}
                              href={getLink(link)}
                              aria-current={router.asPath == link?.link?.slug ? 'page' : 'false'}
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
        <div className="xl:px-layout-md xl:mx-auto px-4 pt-4 xl:pt-10 pb-12">
          {featuredContent && <FeaturedContent data={featuredContent} />}
        </div>
      </MenuContent>
    </_MenuItem>
  )
}
