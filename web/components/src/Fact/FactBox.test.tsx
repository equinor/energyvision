/* eslint-disable no-undef */
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import styled from 'styled-components'
import { FactBox } from './'

afterEach(cleanup)

const { Text, Image, Content } = FactBox

const StyledFactBox = styled(FactBox)`
  clip-path: unset;
`
const StyledFactBoxContent = styled(Content)`
  clip-path: unset;
`
const StyledFactBoxText = styled(Text)`
  clip-path: unset;
`
const StyledFactBoxImage = styled(Image)`
  clip-path: unset;
`

describe('FactBox', () => {
  it('Can extend the css for the main FactBox component', () => {
    const { container } = render(<StyledFactBox />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })

  it('Can extend the css for the Content sub-component', () => {
    const { container } = render(<StyledFactBoxContent />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })

  it('Can extend the css for the Text sub-component', () => {
    const { container } = render(<StyledFactBoxText />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })

  it('Can extend the css for the Text sub-component', () => {
    const { container } = render(<StyledFactBoxImage />)
    expect(container.firstChild).toHaveStyleRule('clip-path', 'unset')
  })
})
