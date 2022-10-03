import { useState } from 'react'
import { useMenu, UseMenuProps, useClearRefinements } from 'react-instantsearch-hooks-web'
import MagazineTagBar from '../../shared/MagazineTagBar'

export type RefinementListProps = { tags: string[]; initiallyActive?: string } & React.ComponentProps<'div'> &
  UseMenuProps

export function MagazineTagFilter(props: RefinementListProps) {
  const { items, refine } = useMenu(props)
  const { refine: clear } = useClearRefinements()
  const [active, setActive] = useState('')
  const { tags, initiallyActive } = props
  const tagLinks = tags.map((e) => ({
    href: '#',
    label: e,
    active: e === items.find((it) => it.isRefined)?.value || initiallyActive === e || active === e,
  }))
  return (
    <MagazineTagBar
      href="#"
      tags={tagLinks}
      defaultActive={
        (items.length > 0 && items.find((it) => it.isRefined) === undefined && !initiallyActive) || active === 'ALL'
      }
      onClick={(value: string) => {
        setActive(value)
        if (value === 'ALL') {
          clear()
        } else if (value !== active) {
          refine(value)
        }
      }}
    />
  )
}
