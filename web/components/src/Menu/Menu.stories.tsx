import type { StoryFn, Meta } from '@storybook/react'
import { Menu, MenuProps, Heading, Link, List } from '@components'
import styled from 'styled-components'

const { Item } = List

export default {
  title: 'Components/Menu/Menu',
  component: Menu,
  subcomponents: {
    SubMenu: Menu.SubMenu,
    SubMenuHeader: Menu.SubMenuHeader,
    SubMenuPanel: Menu.SubMenuPanel,
    SubMenuGroups: Menu.SubMenuGroups,
  },
  parameters: {
    docs: {
      description: {
        component: `Main site navigation.
        `,
      },
    },
  },
} as Meta

const Wrapper = styled.div`
  height: 300px;
`

export const Default: StoryFn<MenuProps> = (args) => (
  <Wrapper>
    <Menu {...args}>
      <Menu.SubMenu id={1}>
        <Menu.SubMenuHeader>Menu item 1</Menu.SubMenuHeader>
        <Menu.SubMenuPanel>
          <Menu.SubMenuGroups>
            <div>
              <Heading level="h3" size="sm" uppercase>
                Some column title
              </Heading>
              <List unstyled>
                <Item>
                  <Link underline={false} href="/">
                    Some menu item
                  </Link>
                </Item>
                <Item>
                  <Link underline={false} href="/">
                    Some menu item
                  </Link>
                </Item>
              </List>
            </div>
          </Menu.SubMenuGroups>
        </Menu.SubMenuPanel>
      </Menu.SubMenu>
      <Menu.SubMenu id={2}>
        <Menu.SubMenuHeader>Menu item 2</Menu.SubMenuHeader>
        <Menu.SubMenuPanel>
          <Menu.SubMenuGroups>
            <div>
              <Heading level="h3" size="sm" uppercase>
                Some other column title
              </Heading>
              <List unstyled>
                <Item>
                  <Link underline={false} href="/">
                    Some other menu item
                  </Link>
                </Item>
                <Item>
                  <Link underline={false} href="/">
                    Some other menu item
                  </Link>
                </Item>
              </List>
            </div>
          </Menu.SubMenuGroups>
        </Menu.SubMenuPanel>
      </Menu.SubMenu>
    </Menu>
  </Wrapper>
)

Default.storyName = 'Default'
