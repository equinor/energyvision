import styled from 'styled-components'

import { Link, List, Menu } from '@components'
import { SimplePanel } from './SimplePanel'
import { SimpleHeader } from './SimpleHeader'
import type { SimpleGroupData } from '../../../../types/types'

const { SubMenu } = Menu
const { Item } = List

const SimpleSubMenu = styled(SubMenu)`
  @media (min-width: 1300px) {
    border-bottom: 0.5px solid var(--grey-40);
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
          {!!readMoreLink?.link?.slug && (
            <ReadMore href={readMoreLink.link?.slug} variant="readMore">
              {readMoreLink.label}
            </ReadMore>
          )}
          <List aria-label={label} unstyled>
            {links?.map((link) => (
              <Item key={link.id}>
                <StyledSubMenuGroupLink href={link?.link?.slug || '/'} underline={false}>
                  {link.label}
                </StyledSubMenuGroupLink>
              </Item>
            ))}
          </List>
        </PanelContentWrapper>
      </SimplePanel>
    </SimpleSubMenu>
  )
}
