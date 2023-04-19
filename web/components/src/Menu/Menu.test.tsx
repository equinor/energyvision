/* eslint-disable no-undef */
import { render, cleanup } from '@testing-library/react'
import 'jest-styled-components'
import styled from 'styled-components'
import { Menu } from './index'

const { SubMenu, SubMenuHeader, SubMenuPanel, SubMenuGroups } = Menu

afterEach(cleanup)

const StyledMenu = styled(Menu)`
  clip-path: unset;
`

describe('Menu', () => {
  const header = 'Header'
  const content = 'Content'

  it('Can have a top level title', () => {
    const { getByText } = render(
      <StyledMenu>
        <SubMenu id={0}>
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
        <SubMenu id={0}>
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
})
