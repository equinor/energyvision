import { useState } from 'react'
import { useMenu, UseMenuProps, useClearRefinements } from 'react-instantsearch-hooks-web'
import MagazineTagBar from '../../shared/MagazineTagBar'

export type RefinementListProps = { tags: string[]; initiallyActive?: string } & React.ComponentProps<'div'> &
  UseMenuProps

export function MagazineTagFilter(props: RefinementListProps) {
  const { items, refine } = useMenu(props)
  const { refine: clear } = useClearRefinements()
  const { tags, initiallyActive } = props
  const tagLinks = tags.map((e) => ({
    href: '#',
    label: e,
    active: e === items.find((it) => it.isRefined)?.value || initiallyActive === e,
  }))
  return (
    <MagazineTagBar
      href="#"
      tags={tagLinks}
      defaultActive={items.find((it) => it.isRefined) === undefined && !initiallyActive}
      onClick={(value: string) => {
        if (value === 'ALL') {
          clear()
        } else {
          refine(value)
        }
      }}
    />
  )
}
