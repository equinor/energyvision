/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { render, cleanup } from '@testing-library/react'
import 'jest-styled-components'
import styled from 'styled-components'
import { Menu, MenuButton } from './index'

const { SubMenu, SubMenuHeader, SubMenuPanel, SubMenuGroups } = Menu

afterEach(cleanup)

const StyledMenu = styled(Menu)`
  clip-path: unset;
`

describe('Menu', () => {
  const header = 'Header'
  const content = 'Content'
  const title = 'Menu'

  it('Can extend the css for the component', () => {
    const { container } = render(
      <StyledMenu>
        <SubMenu>
          <SubMenuHeader>{header}</SubMenuHeader>
          <SubMenuPanel>
            <SubMenuGroups>{content}</SubMenuGroups>
          </SubMenuPanel>
        </SubMenu>
      </StyledMenu>,
    )
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
  it('Can have a top level title', () => {
    const { getByText } = render(
      <StyledMenu>
        <SubMenu>
          <SubMenuHeader>{header}</SubMenuHeader>
          <SubMenuPanel>
            <SubMenuGroups>{content}</SubMenuGroups>
          </SubMenuPanel>
        </SubMenu>
      </StyledMenu>,
    )
    const headerNode = getByText(header)
    expect(headerNode).toBeDefined()
  })
  it('Can have content for the sub menu panels', () => {
    const { getByText } = render(
      <StyledMenu>
        <SubMenu>
          <SubMenuHeader>{header}</SubMenuHeader>
          <SubMenuPanel>
            <SubMenuGroups>{content}</SubMenuGroups>
          </SubMenuPanel>
        </SubMenu>
      </StyledMenu>,
    )
    const contentNode = getByText(content)
    expect(contentNode).toBeDefined()
  })
  it('Can show the title on the menu button', () => {
    const { getByText } = render(
      <StyledMenu>
        <MenuButton title="Menu" />
      </StyledMenu>,
    )
    const contentNode = getByText(title)
    expect(contentNode).toBeDefined()
  })
  it('Can hide the title on the menu button', () => {
    const { queryByText } = render(
      <StyledMenu>
        <MenuButton title="Menu" showTitle={false} />
      </StyledMenu>,
    )
    const contentNode = queryByText(title)
    expect(contentNode).toBeNull()
  })
})
