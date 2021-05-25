/**
 * @jest-environment jsdom
 */
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

  it('renders the link with an icon if type is externalUrl = true', () => {
    const { container } = render(
      <Link href={href} type="externalUrl">
        {label}
      </Link>,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
