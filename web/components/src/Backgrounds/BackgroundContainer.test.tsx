import { render, cleanup } from '@testing-library/react'
import 'jest-styled-components'
import { BackgroundContainer } from './'

afterEach(cleanup)

describe(`The background container supports different colours from Sanity's colour selector`, () => {
  it('it can be the default color', () => {
    const { container } = render(<BackgroundContainer />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--bg-default)`)
  })
  it('it can be white (default)', () => {
    const { container } = render(<BackgroundContainer background={{ backgroundColor: 'White' }} />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--bg-default)`)
  })
  it('it can be Moss green ', () => {
    const { container } = render(<BackgroundContainer background={{ backgroundColor: 'Moss Green' }} />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--bg-moss-green)`)
  })
  it('it can be light mint blue (default)', () => {
    const { container } = render(<BackgroundContainer background={{ backgroundColor: 'Moss Green Light' }} />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--bg-moss-green-light)`)
  })
  it('it can be spruce wood (default)', () => {
    const { container } = render(<BackgroundContainer background={{ backgroundColor: 'Spruce Wood' }} />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--bg-spruce-wood)`)
  })
  it('it can be mist blue (default)', () => {
    const { container } = render(<BackgroundContainer background={{ backgroundColor: 'Mist Blue' }} />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--bg-mist-blue)`)
  })
  it('it can be slate blue (default)', () => {
    const { container } = render(<BackgroundContainer background={{ backgroundColor: 'Mid Blue' }} />)
    expect(container.firstChild).toHaveStyle(`--background-color: var(--bg-mid-blue)`)
  })
})
