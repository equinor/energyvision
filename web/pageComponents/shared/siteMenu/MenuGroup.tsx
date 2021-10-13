import styled from 'styled-components'
import NextLink from 'next/link'
import { Link, List, Heading, Menu, Text } from '@components'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../../types/types'
import { SubMenuGroup, SubMenuGroupHeading, SubMenuGroupList, SubMenuGroupLink } from './SubMenuGroup'

const { SubMenu, SubMenuHeader, SubMenuPanel, SubMenuGroups } = Menu
const { Item } = List

const TopLevelLink = styled(Link)`
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-large);
  @media (min-width: 1300px) {
    display: none;
  }
`

const StyledText = styled(Text)`
  margin-top: var(--space-medium);
`
const StyledSection = styled.section`
  display: none;
  max-width: 35rem;
  @media (min-width: 1300px) {
    display: block;
    padding-bottom: var(--space-xLarge);
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
  const { topLevelLink, groups } = topLevelItem

  const topLevelHref = getLink(topLevelLink)

  return (
    <SubMenu>
      <SubMenuHeader> {topLevelLink?.label}</SubMenuHeader>
      {/* @TODO: Should we allow external links at top level? */}
      <SubMenuPanel>
        {/* @TODO: Can we reuse the same link across devices */}
        <NextLink href={topLevelHref} passHref>
          <TopLevelLink underline={false}>{`${topLevelLink?.label} overview page`}</TopLevelLink>
        </NextLink>
        <StyledSection>
          <Heading level="h2" size="lg">
            {topLevelLink?.label}
          </Heading>
          <StyledText>
            Without energy, the world simply stops. But the energy system must change. Does a future exist where we can
            ensure enough energy for everyone, while also being good stewards of our planet?
          </StyledText>
          {/* @TODO: What to do about this link? */}
          <NextLink href={topLevelHref} passHref>
            <Link variant="readMore">{topLevelLink?.label}</Link>
          </NextLink>
        </StyledSection>
        {groups && groups.length > 0 && (
          <SubMenuGroups>
            {groups.map((groupItem: SubMenuGroupData) => {
              return (
                <SubMenuGroup key={groupItem.id}>
                  {groupItem.label && (
                    <SubMenuGroupHeading level="h3" size="sm">
                      {groupItem.label}
                    </SubMenuGroupHeading>
                  )}
                  <SubMenuGroupList aria-label={groupItem.label || topLevelLink?.label} unstyled>
                    {groupItem.links.map((link: MenuLinkData) => (
                      <Item key={link.id}>
                        <NextLink href={getLink(link)} passHref>
                          <SubMenuGroupLink>{link.label}</SubMenuGroupLink>
                        </NextLink>
                      </Item>
                    ))}
                  </SubMenuGroupList>
                </SubMenuGroup>
              )
            })}
          </SubMenuGroups>
        )}
      </SubMenuPanel>
    </SubMenu>
  )
}
