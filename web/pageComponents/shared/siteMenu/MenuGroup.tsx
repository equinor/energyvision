import { Fragment } from 'react'
import styled from 'styled-components'
import RichText from '../portableText/RichText'
import { Link, List, Menu } from '@components'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../../types/types'
import { SubMenuGroupHeading, SubMenuGroupList } from './SubMenuGroup'
import FeaturedContent from './FeaturedContent'
import { usePathname } from 'next/navigation'
import { ReadMoreLink } from '@core/Link'

const { SubMenu, SubMenuHeader, SubMenuPanel, SubMenuGroups } = Menu
const { Item } = List

const StyledItem = styled(Item)`
  @media (min-width: 1300px) {
    /*  We want a slightly smaller font size here, em on purpose */
    font-size: var(--typeScale-05);
  }
`

const PositionedSubMenuPanel = styled(SubMenuPanel)`
  top: 265px;
`

const StyledSubMenuGroupLink = styled(Link)`
  display: flex;
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-medium);
  @media (min-width: 1300px) {
    font-size: var(--typeScale-1);
    padding-left: var(--space-medium);
    margin-left: calc(var(--space-medium) * -1);
  }
  :hover {
    background-color: var(--grey-10);
  }
  &[aria-current]:not([aria-current='false']) {
    border-left: var(--moss-green-95) solid 3px;
    background-color: var(--grey-10);
  }
`

const ReadMore = styled(Link)`
  padding: calc(var(--space-small) + var(--space-xSmall)) 0;
`

const TextContainer = styled.div`
  @media (max-width: 1299px) {
    p:last-child {
      margin-bottom: 0;
    }
  }
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
  onNavigation: () => void
}

export const MenuGroup = ({ topLevelItem, index, onNavigation }: MenuGroupType) => {
  const { topLevelLink, groups, intro, featuredContent } = topLevelItem

  const topLevelHref = getLink(topLevelLink)
  const pathname = usePathname()

  return (
    <SubMenu id={index}>
      <SubMenuHeader> {topLevelLink?.label}</SubMenuHeader>
      <PositionedSubMenuPanel>
        <Grid>
          <div>
            <StyledSection>
              {intro && (
                <TextContainer>
                  <RichText value={intro} />
                </TextContainer>
              )}
              <ReadMoreLink href={topLevelHref} onClick={() => onNavigation()}>
                {topLevelLink?.label}
              </ReadMoreLink>
            </StyledSection>
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
                          <StyledItem key={link.id}>
                            <StyledSubMenuGroupLink
                              underline={false}
                              href={getLink(link)}
                              aria-current={pathname == link?.link?.slug ? 'page' : 'false'}
                              onClick={() => onNavigation()}
                            >
                              {link.label}
                            </StyledSubMenuGroupLink>
                          </StyledItem>
                        ))}
                      </SubMenuGroupList>
                    </Fragment>
                  )
                })}
              </SubMenuGroups>
            )}
          </div>
          {featuredContent && <FeaturedContent data={featuredContent} onNavigation={onNavigation} />}
        </Grid>
      </PositionedSubMenuPanel>
    </SubMenu>
  )
}
