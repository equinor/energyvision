import styled from 'styled-components'
import NextLink from 'next/link'

import { Link, List, Menu } from '@components'
import { SimplePanel } from './SimplePanel'
import { SimpleHeader } from './SimpleHeader'
import { SubMenuGroupList } from './SubMenuGroup'
import { SimpleSubMenuGroups } from '../simpleSiteMenu/SimpleSubMenuGroups'

const { SubMenu } = Menu
const { Item } = List

const StyledItem = styled(Item)``

const SimpleSubMenuHeader = styled(SimpleHeader)``

const SimpleSubMenu = styled(SubMenu)`
  @media (min-width: 1300px) {
    border-bottom: 1px solid var(--grey-40);
  }
`

const StyledSubMenuGroupLink = styled(Link)`
  display: flex;
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-medium);

  :hover {
    background-color: var(--grey-10);
  }
`
const ReadMore = styled(Link)`
  padding: calc(var(--space-small) + var(--space-xSmall)) 0;
`

function getLink(linkData: any) {
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
  item: any
  index: number
}

export const SimpleMenuItem = ({ item, index }: MenuGroupType) => {
  const { label = '', links = [], readMoreLink } = item

  return (
    <SimpleSubMenu id={index}>
      {label && <SimpleSubMenuHeader> {label}</SimpleSubMenuHeader>}
      <SimplePanel>
        <div>
          <SimpleSubMenuGroups>
            {readMoreLink && (
              <NextLink href={getLink(readMoreLink)} passHref>
                <ReadMore variant="readMore">{readMoreLink.label}</ReadMore>
              </NextLink>
            )}
            <SubMenuGroupList aria-label={label} unstyled>
              {links?.map((link: any) => (
                <StyledItem key={link.id}>
                  <NextLink href={getLink(link)} passHref>
                    <StyledSubMenuGroupLink underline={false}>{link.label}</StyledSubMenuGroupLink>
                  </NextLink>
                </StyledItem>
              ))}
            </SubMenuGroupList>
          </SimpleSubMenuGroups>
        </div>
      </SimplePanel>
    </SimpleSubMenu>
  )
}
