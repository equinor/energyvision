import styled from 'styled-components'
import NextLink from 'next/link'
import { Link, List, Heading, Menu } from '@components'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../../types/types'

const { SubMenu, SubMenuHeader, SubMenuPanel } = Menu
const { Item } = List

const SubMenuContent = styled.div`
  /*  display: flex; */

  @media (min-width: 1300px) {
    display: block;
    /*  height: 100%; */
  }
`

const StyledHeading = styled(Heading)`
  text-transform: uppercase;
  color: var(--grey-60);
  padding: var(--space-xLarge) var(--space-xLarge) calc(var(--space-small) + var(--space-xSmall)) var(--space-xLarge);
`

const WrappedList = styled(List)`
  @media (min-width: 1300px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
  }
`

type TopLevelLinkProps = {
  active: boolean
}

const TopLevelLink = styled(Link)<TopLevelLinkProps>`
  text-decoration: none;
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-large);
  border-bottom: ${(props) => (props.active ? '2px solid var(--moss-green-80)' : '2px solid transparent ')};
`

const GroupItem = styled(Item)`
  max-height: 100%;
`

const GroupLink = styled(Link)`
  display: flex;
  text-decoration: none;
  /* We don't actually have a value for 12px */
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-xLarge);
`

const Group = styled.div`
  @media (min-width: 1300px) {
    height: 100%;
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

/* const fetchTopLevel = (route: string) => {
  if (!route) return null
  const path = route.split('/')
  return path[1]
}
 */
/* const getInitialMenuItem = (router: any) => {
  return fetchTopLevel(router.asPath)
}
 */

export const MenuGroup = (topLevelItem: SubMenuData) => {
  const { topLevelLink, group } = topLevelItem
  const topLevelHref = getLink(topLevelLink)

  return (
    <SubMenu>
      <SubMenuHeader> {topLevelLink?.label || 'Error'}</SubMenuHeader>
      {/* @TODO: Should we allow external links at top level? */}
      <SubMenuPanel>
        <NextLink href={topLevelHref} passHref>
          <TopLevelLink active={false} /* active={activeMenuItem === fetchTopLevel(topLevelHref)} */>
            {`${topLevelLink?.label} overview page` || 'Error'}
          </TopLevelLink>
        </NextLink>
        {group && group.length > 0 && (
          <SubMenuContent>
            {group.map((groupItem: SubMenuGroupData) => {
              return (
                <Group key={groupItem.id}>
                  {groupItem.label && (
                    <StyledHeading level="h3" size="sm">
                      {groupItem.label}
                    </StyledHeading>
                  )}
                  <WrappedList unstyled>
                    {groupItem.links.map((link: MenuLinkData) => (
                      <GroupItem key={link.id}>
                        <NextLink href={getLink(link)} passHref>
                          <GroupLink>{link.label}</GroupLink>
                        </NextLink>
                      </GroupItem>
                    ))}
                  </WrappedList>
                </Group>
              )
            })}
          </SubMenuContent>
        )}
      </SubMenuPanel>
    </SubMenu>
  )
}
