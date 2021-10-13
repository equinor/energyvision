import styled from 'styled-components'
import NextLink from 'next/link'
import { Link, List, Heading, Menu, Text } from '@components'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../../types/types'

const { SubMenu, SubMenuHeader, SubMenuPanel, SubMenuGroups } = Menu
const { Item } = List

const StyledHeading = styled(Heading)`
  text-transform: uppercase;
  color: var(--grey-60);
  padding: var(--space-xLarge) var(--space-xLarge) calc(var(--space-small) + var(--space-xSmall)) var(--space-xLarge);
  @media (min-width: 1300px) {
    padding: 0 var(--space-xLarge) var(--space-small) 0;
  }
`

const WrappedList = styled(List)`
  @media (min-width: 1300px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    max-width: 13rem;
  }
`

const TopLevelLink = styled(Link)`
  text-decoration: none;
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-large);
  @media (min-width: 1300px) {
    display: none;
  }
`
const Group = styled.div`
  @media (min-width: 1300px) {
    padding-right: var(--space-xLarge);
  }
`

const GroupLink = styled(Link)`
  display: flex;
  text-decoration: none;
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-xLarge);
  @media (min-width: 1300px) {
    padding: var(--space-small) 0 var(--space-small) 0;
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
          <TopLevelLink>{`${topLevelLink?.label} overview page`}</TopLevelLink>
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
                <Group key={groupItem.id}>
                  {groupItem.label && (
                    <StyledHeading level="h3" size="sm">
                      {groupItem.label}
                    </StyledHeading>
                  )}
                  <WrappedList aria-label={groupItem.label || topLevelLink?.label} unstyled>
                    {groupItem.links.map((link: MenuLinkData) => (
                      <Item key={link.id}>
                        <NextLink href={getLink(link)} passHref>
                          <GroupLink>{link.label}</GroupLink>
                        </NextLink>
                      </Item>
                    ))}
                  </WrappedList>
                </Group>
              )
            })}
          </SubMenuGroups>
        )}
      </SubMenuPanel>
    </SubMenu>
  )
}
