import { render, cleanup, screen } from '@testing-library/react'
import 'jest-styled-components'
import styled from 'styled-components'
import { Eyebrow } from '@components'

afterEach(cleanup)

const StyledEyebrow = styled(Eyebrow)`
  clip-path: unset;
`

describe('Eyebrow', () => {
  it('Can extend the CSS for the Teaser component', () => {
    const { container } = render(<StyledEyebrow />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
  it('Can render a text', () => {
    const eyebrow = 'My test title'
    render(<Eyebrow>{eyebrow}</Eyebrow>)
    const inputNode = screen.getByText(eyebrow)
    expect(inputNode).toBeDefined()
  })
})
