import { render, cleanup } from '@testing-library/react'
import 'jest-styled-components'
import { BackgroundContainer } from './'

afterEach(cleanup)

describe(`The background container supports different colours from Sanity's colour selector`, () => {
  it('it can be the default color', () => {
    const { container } = render(<BackgroundContainer />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--ui-background-default)`)
  })
  it('it can be white (default)', () => {
    const { container } = render(<BackgroundContainer background="White" />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--ui-background-default)`)
  })
  it('it can be Moss green ', () => {
    const { container } = render(<BackgroundContainer background="Moss Green" />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--moss-green-70)`)
  })
  it('it can be light mint blue (default)', () => {
    const { container } = render(<BackgroundContainer background="Moss Green Light" />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--moss-green-50)`)
  })
  it('it can be spruce wood (default)', () => {
    const { container } = render(<BackgroundContainer background="Spruce Wood" />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--spruce-wood-90)`)
  })
  it('it can be mist blue (default)', () => {
    const { container } = render(<BackgroundContainer background="Mist Blue" />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--mist-blue-100)`)
  })
  it('it can be slate blue (default)', () => {
    const { container } = render(<BackgroundContainer background="Slate Blue" />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--slate-blue-100)`)
  })
  it('Add a class for inverted if the background is so dark that the text must be light for contrast', () => {
    const { container } = render(<BackgroundContainer background="Slate Blue" />)
    expect(container.firstChild).toHaveClass('inverted-background')
  })
})
