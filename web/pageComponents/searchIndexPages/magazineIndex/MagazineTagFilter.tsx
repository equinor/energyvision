import { forwardRef } from 'react'
import { useMenu, UseMenuProps, useClearRefinements, useCurrentRefinements } from 'react-instantsearch-hooks-web'
import MagazineTagBar from '../../shared/MagazineTagBar'

export type RefinementListProps = { tags: string[] } & React.ComponentProps<'div'> & UseMenuProps

export const MagazineTagFilter = forwardRef<HTMLDivElement, RefinementListProps>(function MagazineTagFilter(
  props: RefinementListProps,
  ref,
) {
  const { refine } = useMenu(props)
  const { refine: clear } = useClearRefinements()
  const { items: currentItems } = useCurrentRefinements()
  const { tags } = props

  const tagLinks = tags.map((e) => ({
    href: '#',
    label: e,
    active: currentItems[0]?.refinements[0]?.label === e,
  }))

  return (
    <MagazineTagBar
      href=""
      tags={tagLinks}
      defaultActive={currentItems.length === 0}
      onClick={(value: string) => {
        value === 'ALL' ? clear() : refine(value)
      }}
      ref={ref}
    />
  )
})
