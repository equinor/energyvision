import { useState } from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import { Link, List, Heading } from '@components'
import type { MenuLinkData } from '../../../types/types'

const { Item } = List
const TopLevelItem = styled(Item)``
type SubMenuPanelProps = {
  isOpen: boolean
}

const SubMenuContent = styled.div`
  display: flex;
`

const WrappedList = styled(List)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 35rem;
`

type TopLevelLinkProps = {
  active: boolean
}

const TopLevelLink = styled(Link)<TopLevelLinkProps>`
  text-decoration: none;
  padding: var(--space-xSmall) var(--space-small);
  border-bottom: ${(props) => (props.active ? '2px solid var(--moss-green-80)' : '2px solid transparent ')};
`

const ListGroup = styled.div``

const SubMenuPanel = styled.div<SubMenuPanelProps>`
  /* Nevermind about a11y at this point */
  /*  For the sake of quick and dirty, let's do the stupid hover interaction */
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  transition: opacity 0.19s linear 0.2s, visibility 0ms 0.4s;

  height: 37rem;
  position: absolute;
  background-color: var(--ui-background-default);
  /* Temp. make it easier to see the menu */
  background-color: var(--grey-20);

  padding: var(--space-large);
  left: 0;
  right: 0;
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

// @TODO: No, we will not do it like this!
/*   const openMenuItem = (linkName: string) => {
    openMenu()
    setActive(linkName)
  }
  const closeMenuItem = (linkName: string) => {
    removeActive()

    closeMenu()
  } */

export const SubMenu = (topLevelItem: any) => {
  const [open, setOpen] = useState(false)
  const { topLevelLink, group } = topLevelItem
  const topLevelHref = getLink(topLevelLink)
  /* const activePanel = isOpen && getActiveMenuItem === topLevelLink.label */

  const openMenuItem = () => {
    setOpen(true)
  }
  const closeMenuItem = () => {
    setOpen(false)
  }

  return (
    <TopLevelItem onMouseEnter={openMenuItem} onMouseLeave={closeMenuItem}>
      <div>
        {/* @TODO: Should we allow external links at top level? */}
        <NextLink href={topLevelHref} passHref>
          <TopLevelLink active={false} /* active={activeMenuItem === fetchTopLevel(topLevelHref)} */>
            {topLevelLink?.label || 'Error'}
          </TopLevelLink>
        </NextLink>
        {group && group.length > 0 && (
          <SubMenuPanel isOpen={open}>
            <SubMenuContent>
              {group.map((groupItem: any) => {
                return (
                  <ListGroup key={groupItem.id}>
                    <Heading level="h3" size="sm" style={{ textTransform: 'uppercase' }}>
                      {groupItem.label}
                    </Heading>
                    <WrappedList unstyled>
                      {groupItem.links.map((link: any) => (
                        <Item key={link.id}>
                          <NextLink href={getLink(link)} passHref>
                            <Link>{link.label}</Link>
                          </NextLink>
                        </Item>
                      ))}
                    </WrappedList>
                  </ListGroup>
                )
              })}
            </SubMenuContent>
          </SubMenuPanel>
        )}
      </div>
    </TopLevelItem>
  )
}
