/* eslint-disable no-undef */
import { render, cleanup, getByText } from '@testing-library/react'
import 'jest-styled-components'
import { MagazineTagBar } from './MagazineTagBar'

afterEach(cleanup)

describe('MagazineTagBar', () => {
  it('Has provided label', () => {
    const { queryByText } = render(
      <MagazineTagBar
        tags={[
          { label: 'All', link: '/all' },
          { label: 'Green Transition', link: '/all' },
          { label: 'Equinor at 50', link: '/all' },
          { label: 'Net zero', link: '/all' },
          { label: 'Innovation', link: '/all' },
          { label: 'Performance', link: '/all' },
        ]}
      ></MagazineTagBar>,
    )
    // WIP
  })
})
