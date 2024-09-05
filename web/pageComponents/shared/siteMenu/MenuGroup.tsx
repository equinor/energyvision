import { Fragment } from 'react'
import styled from 'styled-components'
import RichText from '../portableText/RichText'
import { Link, ReadMoreLink } from '@core/Link'
import { Menu } from '@components'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../../types/types'
import { SubMenuGroupHeading, SubMenuGroupList } from './SubMenuGroup'
import FeaturedContent from './FeaturedContent'
import { useRouter } from 'next/router'

const { SubMenu, SubMenuHeader, SubMenuPanel, SubMenuGroups } = Menu

const PositionedSubMenuPanel = styled(SubMenuPanel)`
  top: 265px;
`

const StyledSection = styled.div`
  max-width: calc(35 * var(--space-medium));

  @media (min-width: 1300px) {
    display: block;
    padding: 0 var(--space-large) var(--space-xxLarge) 0;
  }
`

const Grid = styled.div`
  @media (min-width: 1300px) {
    display: grid;
    grid-template-columns: 1fr min-content;
  }
`

function getLink(linkData: MenuLinkData) {
  // Fallback to home page, if this happens it is an error somewhere
  // Sanity should take care of the validation here, and this is temp. until
  // the static pages are migrated
  if (!linkData) return 'something-wrong'
  const { link } = linkData

  return (link && link.slug) || '/'
}

type MenuGroupType = {
  topLevelItem: SubMenuData
  index: number
}

export const MenuGroup = ({ topLevelItem, index }: MenuGroupType) => {
  const { topLevelLink, groups, intro, featuredContent } = topLevelItem

  const topLevelHref = getLink(topLevelLink)
  const router = useRouter()

  return (
    <SubMenu id={index}>
      <SubMenuHeader> {topLevelLink?.label}</SubMenuHeader>
      <PositionedSubMenuPanel>
        <Grid>
          <div>
            <div className="max-w-menuText xl:pr-lg xl:pb-2xl">
              {intro && <RichText value={intro} />}
              <ReadMoreLink href={topLevelHref}>{topLevelLink?.label}</ReadMoreLink>
            </div>
            {groups && groups.length > 0 && (
              <SubMenuGroups>
                {groups.map((groupItem: SubMenuGroupData) => {
                  return (
                    <Fragment key={groupItem.id}>
                      {groupItem.label && (
                        <SubMenuGroupHeading level="h3" size="sm">
                          {groupItem.label}
                        </SubMenuGroupHeading>
                      )}
                      <SubMenuGroupList aria-label={groupItem.label || topLevelLink?.label} unstyled>
                        {groupItem.links?.map((link: MenuLinkData) => (
                          <li key={link.id}>
                            <Link
                              className={`flex aria-current:bg-grey-10 hover:bg-grey-10 w-auto no-underline px-md py-xs+sm xl:ml-[calc(var(--space-medium)_*_(-1))]  aria-current:border-l-[3px] aria-current:border-moss-green-95`}
                              href={getLink(link)}
                              aria-current={router.asPath == link?.link?.slug ? 'page' : 'false'}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </SubMenuGroupList>
                    </Fragment>
                  )
                })}
              </SubMenuGroups>
            )}
          </div>
          {featuredContent && <FeaturedContent data={featuredContent} />}
        </Grid>
      </PositionedSubMenuPanel>
    </SubMenu>
  )
}
