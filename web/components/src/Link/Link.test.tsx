/* eslint-disable no-undef */
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { Link } from './Link'

afterEach(cleanup)

describe('Link', () => {
  const href = 'https://equinor.com'
  const label = 'equinor.com'

  it('renders an anchor tag', () => {
    const { container } = render(<Link target="_blank">{label}</Link>)
    expect(container.querySelector('a')).toBeInTheDocument()
  })

  it('renders the correct href on the anchor tag', () => {
    const { container } = render(<Link href={href}>{label}</Link>)
    expect(container.querySelector('a')?.href).toMatch(href)
  })

  it('renders the correct label in the anchor tag', () => {
    const { queryByText } = render(<Link href={href}>{label}</Link>)
    expect(queryByText(label)).toBeInTheDocument()
  })

  it('may render an aria-label', () => {
    const ariaLabel = "I'm the aria label"
    const { getByLabelText } = render(
      <Link href={href} aria-label={ariaLabel}>
        {label}
      </Link>,
    )
    expect(getByLabelText(ariaLabel)).toBeInTheDocument()
  })

  it('renders the link with an icon if type is externalUrl = true', () => {
    const { container } = render(
      <Link href={href} type="externalUrl">
        {label}
      </Link>,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('has a css variable to control the underline', () => {
    const setProperty = jest.fn()
    document.documentElement.style.setProperty = setProperty
    const { getByText } = render(
      <Link href={href} underline={false}>
        Link
      </Link>,
    )
    expect(getByText('Link')).toBeInTheDocument()
    expect(getByText('Link')).toHaveStyleRule('text-decoration: var(--textDecoration')
    /*     expect(container.firstChild).toHaveStyle('text-decoration: none') */
    // expect(container.firstChild).toHaveBeenCalledWith('text-decoration: none')
  })
})
