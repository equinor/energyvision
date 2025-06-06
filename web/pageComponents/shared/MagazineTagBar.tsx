import { AnchorHTMLAttributes, forwardRef } from 'react'
import { Link } from '@core/Link'
import { useIntl } from 'react-intl'

export type MagazineTagBarProps = {
  tags: TagLink[]
  href: string
  onClick?: (value: string) => void
  defaultActive: boolean
}

export type TagLink = {
  label: string
  active: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

const allTagLink: TagLink = {
  href: '#',
  label: 'All',
  active: false,
}

const MagazineTagBar = forwardRef<HTMLDivElement, MagazineTagBarProps>(function MagazineTagBar(
  { tags, onClick, href, defaultActive = false },
  ref,
) {
  const intl = useIntl()
  allTagLink.label = intl.formatMessage({ id: 'magazine_tag_filter_all', defaultMessage: 'ALL' })
  allTagLink.active = defaultActive
  const linkClassNames = `inline-block text-base lg:text-xs relative no-underline hover:font-bold before:block before:content-[attr(data-title)] before:font-bold before:h-0 before:overflow-hidden before:invisible after:content-[''] after:absolute after:border-l-2 after:border-energy-red-100 after:right-[calc(var(--space-xLarge)_*-0.5)] after:h-full last:after:hidden`
  return (
    <div ref={ref} className="mb-8 mx-auto flex content-center border-y-grey-30 border-y-[1px] border-y-solid">
      <div
        className="flex flex-nowrap m-auto overflow-x-scroll no-scrollbar whitespace-nowrap p-8 gap-10 
      lg:wrap lg:py-8 lg:px-16 lg:[overflow-overlay]"
      >
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
        {tags.map((it: TagLink) => (
          <Link
            className={`${it.active ? 'font-bold' : 'font-normal'} ${linkClassNames}`}
            href={`${href}${`?tag=${it.label}`}`}
            key={`key_${it.label}`}
            data-title={it.label}
            onClick={(event) => {
              if (onClick) {
                event.preventDefault()
                onClick(it.label)
                allTagLink.active = false
              }
            }}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  )
})

export default MagazineTagBar
