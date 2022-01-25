import styled from 'styled-components'
import NextLink from 'next/link'

import { Link, List, Menu } from '@components'
import { SimplePanel } from './SimplePanel'
import { SimpleHeader } from './SimpleHeader'
import { SubMenuGroupList } from '../SubMenuGroup'
import { SimpleSubMenuGroups } from './SimpleSubMenuGroups'

import type { SimpleGroupData } from '../../../../types/types'

const { SubMenu } = Menu
const { Item } = List

const SimpleSubMenuGroupList = styled(SubMenuGroupList)`
  @media (min-width: 1300px) {
    max-width: 20rem;
  }
`

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

type MenuGroupType = {
  item: SimpleGroupData
  index: number
}

const StyledSimpleHeader = styled(SimpleHeader)`
  color: green;
`
export const SimpleMenuItem = ({ item, index }: MenuGroupType) => {
  const { label, links = [], readMoreLink } = item

  return (
    <SimpleSubMenu id={index}>
      {label && <StyledSimpleHeader>{label}</StyledSimpleHeader>}
      <SimplePanel>
        <div>
          <SimpleSubMenuGroups>
            {readMoreLink && (
              <NextLink href={readMoreLink.link?.slug} passHref>
                <ReadMore variant="readMore">{readMoreLink.label}</ReadMore>
              </NextLink>
            )}
            <SimpleSubMenuGroupList aria-label={label} unstyled>
              {links?.map((link) => (
                <Item key={link.id}>
                  <NextLink href={link?.link?.slug} passHref>
                    <StyledSubMenuGroupLink underline={false}>{link.label}</StyledSubMenuGroupLink>
                  </NextLink>
                </Item>
              ))}
            </SimpleSubMenuGroupList>
          </SimpleSubMenuGroups>
        </div>
      </SimplePanel>
    </SimpleSubMenu>
  )
}
