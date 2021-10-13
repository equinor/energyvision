import styled from 'styled-components'
import NextLink from 'next/link'
import { Link, List, Heading, Menu, Text } from '@components'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../../types/types'

const { SubMenu, SubMenuHeader, SubMenuPanel } = Menu
const { Item } = List

const SubMenuGroup = styled.div`
  @media (min-width: 1300px) {
    display: flex;
  }
`

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

type TopLevelLinkProps = {
  active: boolean
}

const TopLevelLink = styled(Link)<TopLevelLinkProps>`
  text-decoration: none;
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-large);
  border-bottom: ${(props) => (props.active ? '2px solid var(--moss-green-80)' : '2px solid transparent ')};
  @media (min-width: 1300px) {
    display: none;
  }
`

const GroupLink = styled(Link)`
  display: flex;
  text-decoration: none;
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-xLarge);
  @media (min-width: 1300px) {
    padding: var(--space-small) var(--space-xLarge) var(--space-small) 0;
  }
`

const Group = styled.div`
  @media (min-width: 1300px) {
    height: 100%;
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
  if (!linkData) return 'something-wrong'
  const { isStatic, link, staticUrl } = linkData
  if (isStatic) {
    //  @TODO: Can we add a required validation for the conditional field
    return staticUrl || '/boom-static'
  } else {
    return (link && link.slug) || '/boom-reference'
  }
}

export const MenuGroup = (topLevelItem: SubMenuData) => {
  const { topLevelLink, group } = topLevelItem
  const topLevelHref = getLink(topLevelLink)

  return (
    <SubMenu>
      <SubMenuHeader> {topLevelLink?.label || 'Error'}</SubMenuHeader>
      {/* @TODO: Should we allow external links at top level? */}
      <SubMenuPanel>
        {/* @TODO: Can we reuse the same link across devices */}
        <NextLink href={topLevelHref} passHref>
          <TopLevelLink active={false} /* active={activeMenuItem === fetchTopLevel(topLevelHref)} */>
            {`${topLevelLink?.label} overview page` || 'Error'}
          </TopLevelLink>
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
        {group && group.length > 0 && (
          <SubMenuGroup>
            {group.map((groupItem: SubMenuGroupData) => {
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
          </SubMenuGroup>
        )}
      </SubMenuPanel>
    </SubMenu>
  )
}
