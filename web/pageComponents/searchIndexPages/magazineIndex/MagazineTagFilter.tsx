import { useEffect, useState } from 'react'
import { useMenu, UseMenuProps, useClearRefinements } from 'react-instantsearch-hooks-web'
import MagazineTagBar from '../../shared/MagazineTagBar'
import { useRouter } from 'next/router'

export type RefinementListProps = { tags: string[] } & React.ComponentProps<'div'> & UseMenuProps

export function MagazineTagFilter(props: RefinementListProps) {
  const router = useRouter()
  const { items, refine } = useMenu(props)
  const { refine: clear } = useClearRefinements()
  const { tags } = props
  const [active, setActive] = useState(items.find((it) => it.isRefined)?.value)

  const tagLinks = tags.map((e) => ({
    href: '#',
    label: e,
    active: active === e,
  }))

  // state to route
  useEffect(() => {
    if (active === 'ALL') {
      clear()
      return
    }
    if (active && items.find((it) => it.isRefined)?.value !== active) {
      refine(active)
    }
    router.replace(
      {
        query: {
          ...router.query,
          tag: active === 'ALL' ? '' : active,
        },
      },
      undefined,
      { shallow: true },
    )
  }, [active])

  //route to state
  useEffect(() => {
    setActive(router.query.tag as string)
  }, [router?.query?.tag])

  return (
    <MagazineTagBar
      href="#"
      tags={tagLinks}
      defaultActive={(items.length > 0 && items.find((it) => it.isRefined) === undefined) || active === ''}
      onClick={(value: string) => {
        setActive(value)
      }}
    />
  )
}
