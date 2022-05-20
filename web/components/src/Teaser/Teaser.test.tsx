import { render, cleanup, screen } from '@testing-library/react'
import 'jest-styled-components'
import styled from 'styled-components'
import { Teaser } from './'

const { Content } = Teaser

afterEach(cleanup)

const StyledTeaser = styled(Teaser)`
  clip-path: unset;
`

describe('Teaser', () => {
  it('Can extend the CSS for the Teaser component', () => {
    const { container } = render(<StyledTeaser />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
  it('Can have a title', () => {
    const content = 'This is my content'
    render(
      <Teaser>
        <Content>{content}</Content>
      </Teaser>,
    )
    const inputNode = screen.getByText(content)
    expect(inputNode).toBeDefined()
  })

  /*  it('Supports different background colours', () => {
    // Update with real style variant names. This is a stupid test
    const { container } = render(<Teaser />)
    expect(container.firstChild).toHaveStyleRule('background-color', 'var(--background-color)')
  }) */
})
