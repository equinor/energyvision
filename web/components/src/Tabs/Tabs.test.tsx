/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { render, cleanup, screen } from '@testing-library/react'
import 'jest-styled-components'
import styled from 'styled-components'
import { Tabs } from './index'

const { Tab, TabList, TabPanel, TabPanels } = Tabs

const StyledTabs = styled(Tabs)`
  clip-path: unset;
`

describe('Accordion', () => {
  it('Can extend the css for the component', () => {
    const { container } = render(
      <StyledTabs>
        <TabList>
          <Tab>Header 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
        </TabPanels>
      </StyledTabs>,
    )
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
  it('Can have a tab panel title', () => {
    const title = 'Tabs tab title'
    render(
      <Tabs>
        <TabList>
          <Tab>{title}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
        </TabPanels>
      </Tabs>,
    )
    const inputNode = screen.getByText(title)
    expect(inputNode).toBeDefined()
  })
  it('Can have text content', () => {
    const content = 'Tabs content'
    render(
      <Tabs>
        <TabList>
          <Tab>Header 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{content}</TabPanel>
        </TabPanels>
      </Tabs>,
    )
    const inputNode = screen.getByText(content)
    expect(inputNode).toBeDefined()
  })
})
