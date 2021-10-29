/**
 * @jest-environment jsdom
 */
import { render, cleanup, screen } from '@testing-library/react'
import 'jest-styled-components'
import styled from 'styled-components'
import { FigureCaption } from '@components'

afterEach(cleanup)

const StyledFigureCaption = styled(FigureCaption)`
  clip-path: unset;
`

describe('FigureCaption', () => {
  it('Can extend the CSS for the Teaser component', () => {
    const { container } = render(<StyledFigureCaption />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
  it('Can render a text', () => {
    const text = 'My test title'
    render(<FigureCaption>{text}</FigureCaption>)
    const inputNode = screen.getByText(text)
    expect(inputNode).toBeDefined()
  })
})
