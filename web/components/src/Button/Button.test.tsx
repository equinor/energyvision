/* eslint-disable no-undef */
import { render, cleanup } from '@testing-library/react'
import 'jest-styled-components'
import styled from 'styled-components'
import { Button } from './Button'

afterEach(cleanup)

const StyledButton = styled(Button)`
  clip-path: unset;
`

const href = 'https://equinor.com'

describe('Button', () => {
  it('Has provided label', () => {
    const labelText = 'The button label'
    const { queryByText } = render(<Button>{labelText}</Button>)
    expect(queryByText(labelText)).toBeInTheDocument()
  })

  it('Can extend the css for the component', () => {
    const { container } = render(<StyledButton></StyledButton>)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })

  it('renders an anchor tag as button if href is passed', () => {
    const { container } = render(<Button href={href}>click me</Button>)
    expect(container.querySelector('a')).toBeInTheDocument()
  })

  it('renders the correct href', () => {
    const { container } = render(<Button href={href}>click me</Button>)
    expect(container.querySelector('a')?.href).toMatch(href)
  })
})
