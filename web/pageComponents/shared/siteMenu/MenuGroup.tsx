import { Fragment } from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import { BlockRenderer } from '../../../common/serializers'
import SimpleBlockContent from '../../../common/SimpleBlockContent'
import { Link, List, Menu } from '@components'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../../types/types'
import { SubMenuGroupHeading, SubMenuGroupList } from './SubMenuGroup'
import FeaturedContent from './FeaturedContent'

const { SubMenu, SubMenuHeader, SubMenuPanel, SubMenuGroups } = Menu
const { Item } = List

const StyledItem = styled(Item)`
  @media (min-width: 1300px) {
    /*  We want a slightly smaller font size here, em on purpose */
    font-size: 0.9em;
  }
`

const StyledSubMenuGroupLink = styled(Link)`
  display: flex;
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-xLarge);
  @media (min-width: 1300px) {
    /*  We want a slightly smaller padding here, em on purpose */
    padding: 0.45em 0;
  }
`

const StyledSection = styled.section`
  /*  display: none; */
  max-width: 35rem;
  padding: 0 var(--space-large);
  @media (min-width: 1300px) {
    display: block;
    padding: 0 var(--space-large) var(--space-3xLarge) 0;
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

export const MenuGroup = (topLevelItem: SubMenuData) => {
  const { topLevelLink, groups, intro, featuredContent } = topLevelItem

  const topLevelHref = getLink(topLevelLink)

  return (
    <SubMenu>
      <SubMenuHeader> {topLevelLink?.label}</SubMenuHeader>
      {/* @TODO: Should we allow external links at top level? */}
      <SubMenuPanel>
        <Grid>
          <div>
            <StyledSection>
              {intro && (
                <SimpleBlockContent
                  blocks={intro}
                  serializers={{
                    types: {
                      block: BlockRenderer,
                    },
                  }}
                />
              )}
              <NextLink href={topLevelHref} passHref>
                <Link variant="readMore">{topLevelLink?.label}</Link>
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
                        {groupItem.links.map((link: MenuLinkData) => (
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
      </SubMenuPanel>
    </SubMenu>
  )
}
