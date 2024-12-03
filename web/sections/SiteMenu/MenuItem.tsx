import { Fragment } from 'react'
import { Link, ReadMoreLink } from '@core/Link'
import { Menu } from '@core/MenuAccordion'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../types/index'
import FeaturedContent from './FeaturedContent'
import { useRouter } from 'next/router'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { Typography } from '@core/Typography'

const { MenuItem: _MenuItem, MenuHeader, MenuContent, MenuItemColumnsContainer } = Menu

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
      <MenuHeader topLevelLink={menuItemHref} topLevelLabel={topLevelLink?.label} />
      <MenuContent className="">
        <div className="xl:grid xl:grid-cols-[1fr_min-content]">
          <div>
            <div className="max-w-menuText xl:pr-lg xl:pb-2xl">
              {intro && <Blocks value={intro} />}
              <ReadMoreLink href={menuItemHref}>{topLevelLink?.label}</ReadMoreLink>
            </div>
            {groups && groups.length > 0 && (
              <MenuItemColumnsContainer>
                {groups.map((groupItem: SubMenuGroupData) => {
                  return (
                    <Fragment key={groupItem.id}>
                      {groupItem.label && (
                        <Typography
                          as="h3"
                          variant="h5"
                          className={`uppercase
                            text-moss-green-95
                            font-semibolder
                            tracking-[0.15em]
                            text-sm
                            leading-earthy
                            pt-10 
                            px-6
                            pb-6
                            xl:font-semibold
                            xl:text-2xs
                            xl:p-0
                        `}
                        >
                          {groupItem.label}
                        </Typography>
                      )}
                      <ul
                        className="xl:flex xl:flex-col xl:flex-wrap xl:h-full xl:max-w-[calc(13_*_theme(spacing.md))]"
                        aria-label={groupItem.label || topLevelLink?.label}
                      >
                        {groupItem.links?.map((link: MenuLinkData) => (
                          <li key={link.id}>
                            <Link
                              className={`flex 
                                aria-current:bg-grey-10
                                hover:bg-grey-10
                                w-auto no-underline
                                px-md 
                                py-xs+sm
                                xl:ml-[calc(var(--space-medium)_*_(-1))]
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
              </MenuItemColumnsContainer>
            )}
          </div>
          {featuredContent && <FeaturedContent data={featuredContent} />}
        </div>
      </MenuContent>
    </_MenuItem>
  )
}
