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
  const currentlyActive = items.find((it) => it.isRefined)?.value || (router?.query?.tag as string)
  const [active, setActive] = useState(currentlyActive)

  const tagLinks = tags.map((e) => ({
    href: '#',
    label: e,
    active: active === e,
  }))

  useEffect(() => {
    if (!active) {
      clear()
    }
    if (active && items.find((it) => it.isRefined)?.value !== active && active !== router?.query?.tag) {
      refine(active)
    }

    router.replace(
      {
        query: {
          ...router.query,
          tag: active,
        },
      },
      undefined,
      { shallow: true },
    )
  }, [active])
  return (
    <MagazineTagBar
      href="#"
      tags={tagLinks}
      defaultActive={(items.length > 0 && items.find((it) => it.isRefined) === undefined) || active === ''}
      onClick={(value: string) => {
        setActive(value === 'ALL' ? '' : value)
      }}
    />
  )
}
