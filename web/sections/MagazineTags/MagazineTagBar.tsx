'use client'
import { AnchorHTMLAttributes, forwardRef, useMemo } from 'react'
import { Link } from '@core/Link'
import { filter_alt } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

export type MagazineTagBarProps = {
  tags: { id: string; title: string; key: string }[]
  href: string
  onClick?: (value: string) => void
}

export type TagLink = {
  id: string
  key: string
  label: string
  active: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

const allTagLink = {
  href: '#',
  label: 'All',
  active: false,
}

const MagazineTagBar = forwardRef<HTMLDivElement, MagazineTagBarProps>(function MagazineTagBar(
  { tags, onClick, href },
  ref,
) {
  const searchParams = useSearchParams()
  const query = searchParams.get('tag')

  const formattedTags = useMemo(() => {
    return tags?.map((tag) => ({
      id: tag.id,
      label: tag.title,
      key: tag.key,
      active: query === tag.key,
    }))
  }, [tags, query])

  const intl = useTranslations()
  allTagLink.label = intl('magazine_tag_filter_all')
  allTagLink.active = !query
  const linkClassNames = `
  inline-block 
  text-base
  mx-5 
  lg:text-xs 
  relative 
  no-underline 
  hover:underline 
  hover:underline-offset-4
  whitespace-nowrap`

  return (
    <div
      ref={ref}
      className="flex gap-2 overflow-x-auto mx-auto lg:justify-center p-8 border-y 
      border-grey-3 items-center mb-8"
    >
      <h2 className="flex gap-1 font-medium text-sm items-center -mt-0.5">
        <TransformableIcon iconData={filter_alt} className="text-grey-50 size-5 -mt-1" />
        {intl('filter')}
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
            href={href}
            className={`${allTagLink.active ? 'font-bold' : 'font-normal'} ${linkClassNames}`}
            data-title={allTagLink.label}
            onClick={(event) => {
              if (onClick) {
                event.preventDefault()
                onClick('ALL')
                allTagLink.active = true
              }
            }}
          >
            {allTagLink.label}
          </Link>
        </li>
        {formattedTags.map((tag: TagLink) => {
          return (
            <li key={tag.id}>
              <Link
                className={`${tag.active ? 'font-bold' : 'font-normal'} ${linkClassNames}`}
                href={`${href}${`?tag=${tag.key}`}`}
                data-title={tag.label}
                onClick={(event) => {
                  if (onClick) {
                    event.preventDefault()
                    onClick(tag.key)
                    allTagLink.active = false
                  }
                }}
              >
                {tag.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
})

export default MagazineTagBar
