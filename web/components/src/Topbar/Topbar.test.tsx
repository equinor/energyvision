/* eslint-disable no-undef */
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { Topbar } from './Topbar'
import styled from 'styled-components'

afterEach(cleanup)

const StyledTopbar = styled(Topbar)`
  clip-path: unset;
`

describe('Topbar', () => {
  it('can extend the CSS for the Topbar component', () => {
    const { container } = render(<StyledTopbar />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })

  it('renders passed children', () => {
    const { getByTestId } = render(
      <Topbar>
        <h1 data-testid="child-element">hello world</h1>
      </Topbar>,
    )

    expect(getByTestId('child-element')).toBeInTheDocument()
  })
})
