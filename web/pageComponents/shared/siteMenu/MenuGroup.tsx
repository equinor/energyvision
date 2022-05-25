import { Fragment } from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import RichText from '../portableText/RichText'
import { Link, List, Menu } from '@components'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../../types/types'
import { SubMenuGroupHeading, SubMenuGroupList } from './SubMenuGroup'
import FeaturedContent from './FeaturedContent'

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
    /*  We want a slightly smaller padding here, em on purpose */
    font-size: var(--typeScale-1);
    padding-left: var(--space-medium);
    margin-left: calc(var(--space-medium) * -1);
  }
  :hover {
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
  const { isStatic, link, staticUrl } = linkData
  if (isStatic) {
    return staticUrl || '/'
  } else {
    return (link && link.slug) || '/'
  }
}

type MenuGroupType = {
  topLevelItem: SubMenuData
  index: number
}

export const MenuGroup = ({ topLevelItem, index }: MenuGroupType) => {
  const { topLevelLink, groups, intro, featuredContent } = topLevelItem

  const topLevelHref = getLink(topLevelLink)

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

              <NextLink href={topLevelHref} passHref>
                <ReadMore variant="readMore">{topLevelLink?.label}</ReadMore>
              </NextLink>
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
                            <NextLink href={getLink(link)} passHref>
                              <StyledSubMenuGroupLink underline={false}>{link.label}</StyledSubMenuGroupLink>
                            </NextLink>
                          </StyledItem>
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
