/* eslint-disable no-undef */
import { render, cleanup, screen } from '@testing-library/react'
import 'jest-styled-components'
import styled from 'styled-components'
import { Card } from './index'

const { Header, Title, Text, Eyebrow } = Card

afterEach(cleanup)

const StyledCard = styled(Card)`
  clip-path: unset;
`

describe('Card', () => {
  it('Can extend the css for the component', () => {
    const { container } = render(<StyledCard />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
  it('Can have a title', () => {
    const title = 'My test title'
    render(
      <Card>
        <Header>
          <Title>{title}</Title>
        </Header>
      </Card>,
    )
    const inputNode = screen.getByText(title)
    expect(inputNode).toBeDefined()
  })
  it('Can have an eyebrow title', () => {
    const eyebrow = 'My test title'
    render(
      <Card>
        <Header>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Header>
      </Card>,
    )
    const inputNode = screen.getByText(eyebrow)
    expect(inputNode).toBeDefined()
  })
  it('Can have text content', () => {
    const text = 'My test title'
    render(
      <Card>
        <Text>{text}</Text>
      </Card>,
    )
    const inputNode = screen.getByText(text)
    expect(inputNode).toBeDefined()
  })
})
