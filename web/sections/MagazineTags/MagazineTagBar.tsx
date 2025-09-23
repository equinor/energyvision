'use client'
import { AnchorHTMLAttributes, forwardRef, useCallback, useMemo } from 'react'
import { Link } from '@/core/Link'
import { filter_alt } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { useTranslations } from 'next-intl'
import { usePathname, useSearchParams } from 'next/navigation'

export type MagazineTagBarProps = {
  tags: { id: string; title: string; key: string }[]
}

export type TagLink = {
  id: string
  key: string
  label: string
  active: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

const MagazineTagBar = forwardRef<HTMLDivElement, MagazineTagBarProps>(function MagazineTagBar({ tags = [] }, ref) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const parentSlug = pathname || ''
  const query = searchParams?.get('tag') ?? null
  const isAllActive = !query || query === 'all'

  // Modern query string creation
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() ?? '')
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  const formattedTags = useMemo(() => {
    return (tags || []).map((tag) => ({
      id: tag.id,
      label: tag.title,
      key: tag.key,
      active: query === tag.key,
    }))
  }, [tags, query])

  const intl = useTranslations()

  const linkClassNames =
    'inline-block text-base mx-5 lg:text-xs relative no-underline hover:underline hover:underline-offset-4 whitespace-nowrap'

  return (
    <div
      ref={ref}
      className="border-grey-3 mx-auto mb-8 flex items-center gap-2 overflow-x-auto border-y p-8 lg:justify-center"
    >
      <h2 className="-mt-0.5 flex items-center gap-1 text-sm font-medium">
        <TransformableIcon iconData={filter_alt} className="-mt-1 size-5 text-grey-50" />
        {intl('magazine_tag_filter')}
      </h2>
      <ul
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className="
        flex
        items-center 
        divide-x-2
        divide-energy-red-100"
      >
        <li>
          <Link
            href={parentSlug + '?' + createQueryString('tag', 'all')}
            className={`${linkClassNames} ${isAllActive ? 'font-bold underline underline-offset-4' : ''}`}
          >
            {intl('magazine_tag_filter_all')}
          </Link>
        </li>
        {formattedTags.map((tag: TagLink) => (
          <li key={tag.id}>
            <Link
              className={`${linkClassNames} ${tag.active ? 'font-bold underline underline-offset-4' : ''}`}
              href={parentSlug + '?' + createQueryString('tag', tag.key)}
            >
              {tag.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default MagazineTagBar
