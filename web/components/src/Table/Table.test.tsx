/* eslint-disable no-undef */
import { render, cleanup, screen } from '@testing-library/react'
import 'jest-styled-components'
import styled from 'styled-components'
import { Table } from './index'

const { Row, Head, Cell, Caption, Body } = Table

afterEach(cleanup)

const StyledTable = styled(Table)`
  clip-path: unset;
`

describe('Table', () => {
  it('Can extend the css for the component', () => {
    const { container } = render(<StyledTable />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
  it('Can have a caption', () => {
    const captionText = 'My test caption'
    render(
      <Table>
        <Caption>{captionText}</Caption>
      </Table>,
    )
    const caption = screen.getByText(captionText)
    expect(caption).toBeDefined()
    expect(caption?.tagName).toEqual('CAPTION')
  })
  it('Can have a header cell', () => {
    const header = 'My test header'
    render(
      <Table>
        <Head>
          <Row>
            <Cell>{header}</Cell>
          </Row>
        </Head>
      </Table>,
    )
    const text = screen.getByText(header)
    const headerNode = text?.parentElement
    expect(text).toBeDefined()
    expect(headerNode?.tagName).toEqual('TH')
  })
  it('Can have body content', () => {
    const text = 'My test title'
    render(
      <Table>
        <Body>
          <Row>
            <Cell>{text}</Cell>
          </Row>
        </Body>
      </Table>,
    )
    const inputNode = screen.getByText(text)
    expect(inputNode).toBeDefined()
  })
})
