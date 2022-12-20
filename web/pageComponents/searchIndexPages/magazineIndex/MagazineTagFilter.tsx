import { useEffect, useState, forwardRef } from 'react'
import { useMenu, UseMenuProps, useClearRefinements, useCurrentRefinements } from 'react-instantsearch-hooks-web'
import MagazineTagBar from '../../shared/MagazineTagBar'
import { useRouter } from 'next/compat/router'

export type RefinementListProps = { tags: string[] } & React.ComponentProps<'div'> & UseMenuProps

export const MagazineTagFilter = forwardRef<HTMLDivElement, RefinementListProps>(function MagazineTagFilter(
  props: RefinementListProps,
  ref,
) {
  const router = useRouter()
  const { refine } = useMenu(props)
  const { refine: clear } = useClearRefinements()
  const { items: currentItems } = useCurrentRefinements()
  const { tags } = props
  const [active, setActive] = useState(currentItems[0]?.refinements[0]?.label)

  const tagLinks = tags.map((e) => ({
    href: '#',
    label: e,
    active: active === e,
  }))

  // state to route
  useEffect(() => {
    if (!active) {
      clear()
      return
    }
    if ((active && active !== 'ALL') || active !== '') {
      refine(active)
    } else {
      clear()
    }
    router?.replace(
      {
        query: {
          ...router?.query,
          tag: active === 'ALL' ? '' : active,
        },
      },
      undefined,
      { shallow: true },
    )
  }, [active, clear, refine])

  //route to state
  useEffect(() => {
    if ((router?.query.tag as string) !== active) {
      setActive(router?.query.tag as string)
    }
  }, [router?.query?.tag])
  return (
    <MagazineTagBar
      href=""
      tags={tagLinks}
      defaultActive={currentItems.length === 0}
      onClick={(value: string) => {
        setActive(value)
      }}
      ref={ref}
    />
  )
})
