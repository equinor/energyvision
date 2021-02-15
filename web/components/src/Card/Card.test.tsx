/* eslint-disable no-undef */
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import styled from 'styled-components'
import { Card } from './index'

afterEach(cleanup)

const StyledCard = styled(Card)`
  clip-path: unset;
`

describe('Card', () => {
  it('Can extend the css for the component', () => {
    const { container } = render(<StyledCard />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
})
