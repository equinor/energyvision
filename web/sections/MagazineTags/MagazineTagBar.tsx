'use client'
import { AnchorHTMLAttributes, forwardRef, useCallback, useMemo } from 'react'
import { Link } from '@/core/Link'
import { filter_alt } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useSearchParams } from 'next/navigation'
import { defaultLanguage } from '@/languages'

export type MagazineTagBarProps = {
  tags: { id: string; title: string; key: string }[]
}

export type TagLink = {
  id: string
  key: string
  label: string
  active: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

const MagazineTagBar = forwardRef<HTMLDivElement, MagazineTagBarProps>(function MagazineTagBar(
  { tags },
  ref,
) {
  const locale = useLocale()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const parentSlug = `${locale !== defaultLanguage.locale ? `/${locale}` : ''}${pathname}` //locale + pathname.substring(pathname.indexOf('/'), pathname.lastIndexOf('/'))
  const query = searchParams.get('tag')

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const formattedTags = useMemo(() => {
    return tags?.map((tag) => ({
      id: tag.id,
      label: tag.title,
      key: tag.key,
      active: query === tag.key,
    }))
  }, [tags, query])

  const intl = useTranslations()

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
            href={parentSlug + '?' + createQueryString('tag', 'all')}
            className={`active:font-bold ${linkClassNames}`}
          >
            {intl('magazine_tag_filter_all')}
          </Link>
        </li>
        {formattedTags.map((tag: TagLink) => {
          return (
            <li key={tag.id}>
              <Link
                className={`active:font-bold ${linkClassNames}`}
                href={parentSlug + '?' + createQueryString('tag', tag.key)}
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
