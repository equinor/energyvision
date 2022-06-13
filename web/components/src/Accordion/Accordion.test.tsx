/* eslint-disable no-undef */
import { render, cleanup, screen } from '@testing-library/react'
import 'jest-styled-components'
import styled from 'styled-components'
import { Accordion } from './index'

const { Item, Header, Panel } = Accordion
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

jest.mock('./hooks/useDivHeight')
import { useDivHeight } from './hooks/useDivHeight'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: We have to mock this implementation because of ResizeObserver
useDivHeight.mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

afterEach(cleanup)

const StyledAccordion = styled(Accordion)`
  clip-path: unset;
`

describe('Accordion', () => {
  it('Can extend the css for the component', () => {
    const { container } = render(
      <StyledAccordion id="1">
        <Item id={0}>
          <Header>Header 1</Header>
          <Panel>Content 1</Panel>
        </Item>
      </StyledAccordion>,
    )
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
  it('Can have a title', () => {
    const title = 'Accordion item title'
    render(
      <Accordion id="1">
        <Item id={0}>
          <Header>{title}</Header>
          <Panel>Content 1</Panel>
        </Item>
      </Accordion>,
    )
    const inputNode = screen.getByText(title)
    expect(inputNode).toBeDefined()
  })
  it('Can have text content', () => {
    const content = 'Accordion content'
    render(
      <Accordion id="1">
        <Item id={0}>
          <Header>Header</Header>
          <Panel>{content}</Panel>
        </Item>
      </Accordion>,
    )
    const inputNode = screen.getByText(content)
    expect(inputNode).toBeDefined()
  })
  it('Uses h3 as the default header level', () => {
    const header = 'Accordion item title'

    render(
      <Accordion id="1">
        <Item id={0}>
          <Header>{header}</Header>
          <Panel>Panel content</Panel>
        </Item>
      </Accordion>,
    )
    const inputNode = screen.getByText(header)
    // Don't use implementation details :/
    const headerNode = inputNode?.parentElement?.parentElement
    expect(headerNode?.tagName).toEqual('H3')
  })
  it('Can change header level', () => {
    const header = 'Accordion item title'

    render(
      <Accordion id="1">
        <Item id={0}>
          <Header headingLevel="h2">{header}</Header>
          <Panel>Panel content</Panel>
        </Item>
      </Accordion>,
    )
    const inputNode = screen.getByText(header)
    // Don't use implementation details :/
    const headerNode = inputNode?.parentElement?.parentElement
    expect(headerNode?.tagName).toEqual('H2')
  })
})
