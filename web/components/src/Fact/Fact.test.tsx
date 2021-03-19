/* eslint-disable no-undef */
import { render, cleanup } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import 'jest-styled-components'
import styled from 'styled-components'
import { Fact } from './index'

const { Title, Text } = Fact

afterEach(cleanup)

const StyledFact = styled(Fact)`
  clip-path: unset;
`

describe('Fact', () => {
  it('Can extend the css for the component', () => {
    const { container } = render(<StyledFact />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
  it('Can have a title', () => {
    const title = 'My test title'
    render(
      <Fact>
        <Title>{title}</Title>
      </Fact>,
    )
    const inputNode = screen.getByText(title)
    expect(inputNode).toBeDefined()
  })
  it('Can have a text', () => {
    const title = 'My test title'
    render(
      <Fact>
        <Text>{title}</Text>
      </Fact>,
    )
    const inputNode = screen.getByText(title)
    expect(inputNode).toBeDefined()
  })
})
