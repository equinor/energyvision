/* eslint-disable no-undef */
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import styled from 'styled-components'
import { Button } from './Button'

afterEach(cleanup)

const StyledButton = styled(Button)`
  clip-path: unset;
`

describe('Button', () => {
  it('Has provided label', () => {
    const labelText = 'The button label'
    const { queryByText } = render(<Button>{labelText}</Button>)
    expect(queryByText(labelText)).toBeInTheDocument()
  })
  // This test doesn't work
  /*   it('Is not a primary button by default', () => {
    const { container } = render(<Button label="My button" />)
    expect(container.firstChild).toHaveStyleRule('background-color', '#ffe7d6')
  }) */
  it('Can extend the css for the component', () => {
    const { container } = render(<StyledButton></StyledButton>)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
})
