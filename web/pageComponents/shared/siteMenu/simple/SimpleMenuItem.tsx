import styled from 'styled-components'
import NextLink from 'next/link'

import { Link, List, Menu } from '@components'
import { SimplePanel } from './SimplePanel'
import { SimpleHeader } from './SimpleHeader'
import type { SimpleGroupData } from '../../../../types/types'

const { SubMenu } = Menu
const { Item } = List

const SimpleSubMenu = styled(SubMenu)`
  @media (min-width: 1300px) {
    border-bottom: 1px solid var(--grey-20);
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
const PanelContentWrapper = styled.div`
  padding-bottom: var(--spacing-large);
`

type MenuGroupType = {
  item: SimpleGroupData
  index: number
}

export const SimpleMenuItem = ({ item, index }: MenuGroupType) => {
  const { label, links = [], readMoreLink } = item

  return (
    <SimpleSubMenu id={index}>
      {label && <SimpleHeader>{label}</SimpleHeader>}
      <SimplePanel>
        <PanelContentWrapper>
          {readMoreLink && (
            <NextLink href={readMoreLink.link?.slug} passHref legacyBehavior>
              <ReadMore variant="readMore">{readMoreLink.label}</ReadMore>
            </NextLink>
          )}
          <List aria-label={label} unstyled>
            {links?.map((link) => (
              <Item key={link.id}>
                <NextLink href={link?.link?.slug || '/'} passHref legacyBehavior>
                  <StyledSubMenuGroupLink underline={false}>{link.label}</StyledSubMenuGroupLink>
                </NextLink>
              </Item>
            ))}
          </List>
        </PanelContentWrapper>
      </SimplePanel>
    </SimpleSubMenu>
  )
}
